import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateData } from 'react-native-calendars';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

import ScreenBackground from '../../components/common/ScreenBackground';
import TrackingCalendar from '../../components/common/TrackingCalendar';
import PrayerModal from '../../components/Spirit/PrayerModal';

const PRAYER_DATA_KEY = '@mizman_prayer_data';

export default function SpiritScreen() {
    const [prayerData, setPrayerData] = useState<Record<string, Record<string, boolean>>>({});
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        loadPrayerData();
    }, []);

    const loadPrayerData = async () => {
        try {
            const storedData = await AsyncStorage.getItem(PRAYER_DATA_KEY);
            if (storedData) {
                setPrayerData(JSON.parse(storedData));
            }
        } catch (error) {
            console.error('Error loading prayer data:', error);
        }
    };

    const savePrayerData = async (newData: Record<string, Record<string, boolean>>) => {
        try {
            await AsyncStorage.setItem(PRAYER_DATA_KEY, JSON.stringify(newData));
        } catch (error) {
            console.error('Error saving prayer data:', error);
        }
    };

    const handleDayPress = (day: DateData) => {
        setSelectedDate(day.dateString);
        setIsModalVisible(true);
    };

    const handleSavePrayers = (prayers: Record<string, boolean>) => {
        if (!selectedDate) return;

        const newData = {
            ...prayerData,
            [selectedDate]: prayers,
        };
        setPrayerData(newData);
        savePrayerData(newData);
    };

    // Format marked dates for the calendar
    const markedDates = Object.keys(prayerData).reduce((acc, date) => {
        const prayers = prayerData[date];
        const allDone = Object.values(prayers).filter(Boolean).length === 5;
        const someDone = Object.values(prayers).some(Boolean);

        if (someDone) {
            acc[date] = {
                marked: true,
                dotColor: allDone ? COLORS.success : COLORS.spirit,
            };
        }
        return acc;
    }, {} as Record<string, any>);

    return (
        <ScreenBackground style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Spirit Module</Text>
                    <Text style={styles.subtitle}>Prayer Tracker</Text>
                </View>

                <View style={styles.calendarContainer}>
                    <TrackingCalendar 
                        markedDates={markedDates} 
                        onDayPress={handleDayPress} 
                    />
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.description}>
                        Track your daily prayers by selecting a date on the calendar.
                    </Text>
                    <View style={styles.legend}>
                        <View style={styles.legendItem}>
                            <View style={[styles.dot, { backgroundColor: COLORS.spirit }]} />
                            <Text style={styles.legendText}>Some prayers marked</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.dot, { backgroundColor: COLORS.success }]} />
                            <Text style={styles.legendText}>All prayers completed</Text>
                        </View>
                    </View>
                </View>

                {selectedDate && (
                    <PrayerModal
                        isVisible={isModalVisible}
                        date={selectedDate}
                        initialState={prayerData[selectedDate] || {}}
                        onClose={() => setIsModalVisible(false)}
                        onSave={handleSavePrayers}
                    />
                )}
            </ScrollView>
        </ScreenBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: SPACING.lg },
    header: { marginBottom: SPACING.xl, alignItems: 'center' },
    title: { ...TYPOGRAPHY.h1, color: COLORS.text, marginBottom: SPACING.xs },
    subtitle: { ...TYPOGRAPHY.h3, color: COLORS.spirit },
    calendarContainer: { marginBottom: SPACING.xl },
    infoSection: {
        backgroundColor: COLORS.surface,
        padding: SPACING.lg,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.surfaceLight,
    },
    description: { 
        ...TYPOGRAPHY.caption, 
        color: COLORS.textSecondary, 
        textAlign: 'center',
        marginBottom: SPACING.md,
    },
    legend: {
        flexDirection: 'column',
        gap: SPACING.xs,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    legendText: {
        ...TYPOGRAPHY.small,
        color: COLORS.textSecondary,
    },
});
