import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateData } from 'react-native-calendars';
import { SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

import ScreenBackground from '../../components/common/ScreenBackground';
import TrackingCalendar from '../../components/common/TrackingCalendar';
import PrayerModal from '../../components/Spirit/PrayerModal';

const PRAYER_DATA_KEY = '@mizman_prayer_data';

export default function SpiritScreen() {
    const { colors, isDark } = useTheme();
    const [prayerData, setPrayerData] = useState<Record<string, Record<string, any>>>({});
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [preferredReligion, setPreferredReligion] = useState<'Muslim' | 'Christian' | 'Hinduism'>('Muslim');

    useEffect(() => {
        loadPrayerData();
        loadPreferredReligion();
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

    const loadPreferredReligion = async () => {
        try {
            const storedReligion = await AsyncStorage.getItem('@mizman_preferred_religion');
            if (storedReligion) {
                setPreferredReligion(storedReligion as any);
            }
        } catch (error) {
            console.error('Error loading preferred religion:', error);
        }
    };

    const savePrayerData = async (newData: Record<string, Record<string, any>>) => {
        try {
            await AsyncStorage.setItem(PRAYER_DATA_KEY, JSON.stringify(newData));
        } catch (error) {
            console.error('Error saving prayer data:', error);
        }
    };

    const savePreferredReligion = async (religion: string) => {
        try {
            await AsyncStorage.setItem('@mizman_preferred_religion', religion);
        } catch (error) {
            console.error('Error saving preferred religion:', error);
        }
    };

    const handleDayPress = (day: DateData) => {
        setSelectedDate(day.dateString);
        setIsModalVisible(true);
    };

    const handleSavePrayers = (prayers: Record<string, boolean>, religion: 'Muslim' | 'Christian' | 'Hinduism') => {
        if (!selectedDate) return;

        const newData = {
            ...prayerData,
            [selectedDate]: {
                ...prayers,
                religion, // Store which religion was used for this date
            },
        };
        setPrayerData(newData);
        savePrayerData(newData);
        
        if (religion !== preferredReligion) {
            setPreferredReligion(religion);
            savePreferredReligion(religion);
        }
    };

    // Format marked dates for the calendar
    const markedDates = Object.keys(prayerData).reduce((acc, date) => {
        const data = prayerData[date];
        const religion = data.religion || 'Muslim';
        const items = ['Muslim', 'Christian', 'Hinduism'].includes(religion) 
            ? (religion === 'Muslim' ? ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] : 
               religion === 'Christian' ? ["Morning Prayer", "Bible Reading", "Grace before Meals", "Evening Prayer", "Meditation"] :
               ["Puja", "Meditation", "Shlokas", "Bhajan", "Aarti"])
            : [];
        
        const doneCount = items.filter(item => data[item]).length;
        const allDone = doneCount === items.length && items.length > 0;
        const someDone = doneCount > 0;

        if (someDone) {
            acc[date] = {
                marked: true,
                dotColor: allDone ? colors.success : colors.spirit,
            };
        }
        return acc;
    }, {} as Record<string, any>);

    return (
        <ScreenBackground style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]}>Spirit Module</Text>
                    <Text style={[styles.subtitle, { color: colors.spirit }]}>{preferredReligion} Tracking</Text>
                </View>

                <View style={styles.calendarContainer}>
                    <TrackingCalendar 
                        markedDates={markedDates} 
                        onDayPress={handleDayPress} 
                    />
                </View>

                <View style={[styles.infoSection, { backgroundColor: colors.surface, borderColor: colors.surfaceLight }]}>
                    <Text style={[styles.description, { color: colors.textSecondary }]}>
                        Track your daily spiritual activities by selecting a date.
                    </Text>
                    <View style={styles.legend}>
                        <View style={styles.legendItem}>
                            <View style={[styles.dot, { backgroundColor: colors.spirit }]} />
                            <Text style={[styles.legendText, { color: colors.textSecondary }]}>Some activities marked</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.dot, { backgroundColor: colors.success }]} />
                            <Text style={[styles.legendText, { color: colors.textSecondary }]}>All activities completed</Text>
                        </View>
                    </View>
                </View>

                {selectedDate && (
                    <PrayerModal
                        isVisible={isModalVisible}
                        date={selectedDate}
                        initialState={prayerData[selectedDate] || {}}
                        initialReligion={prayerData[selectedDate]?.religion || preferredReligion}
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
    title: { ...TYPOGRAPHY.h1, marginBottom: SPACING.xs },
    subtitle: { ...TYPOGRAPHY.h3 },
    calendarContainer: { marginBottom: SPACING.xl },
    infoSection: {
        padding: SPACING.lg,
        borderRadius: 16,
        borderWidth: 1,
    },
    description: { 
        ...TYPOGRAPHY.caption, 
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
    },
});
