import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateData } from 'react-native-calendars';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

import ScreenBackground from '../../components/common/ScreenBackground';
import TrackingCalendar from '../../components/common/TrackingCalendar';
import GymModal from '../../components/Body/GymModal';

const GYM_DATA_KEY = '@mizman_gym_data';

export default function BodyScreen() {
    const [gymData, setGymData] = useState<Record<string, { workoutDone: boolean }>>({});
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        loadGymData();
    }, []);

    const loadGymData = async () => {
        try {
            const storedData = await AsyncStorage.getItem(GYM_DATA_KEY);
            if (storedData) {
                setGymData(JSON.parse(storedData));
            }
        } catch (error) {
            console.error('Error loading gym data:', error);
        }
    };

    const saveGymData = async (newData: Record<string, { workoutDone: boolean }>) => {
        try {
            await AsyncStorage.setItem(GYM_DATA_KEY, JSON.stringify(newData));
        } catch (error) {
            console.error('Error saving gym data:', error);
        }
    };

    const handleDayPress = (day: DateData) => {
        setSelectedDate(day.dateString);
        setIsModalVisible(true);
    };

    const handleSaveGym = (status: { workoutDone: boolean }) => {
        if (!selectedDate) return;

        const newData = {
            ...gymData,
            [selectedDate]: status,
        };
        setGymData(newData);
        saveGymData(newData);
    };

    // Format marked dates for the calendar
    const markedDates = Object.keys(gymData).reduce((acc, date) => {
        if (gymData[date].workoutDone) {
            acc[date] = {
                marked: true,
                dotColor: COLORS.body,
            };
        }
        return acc;
    }, {} as Record<string, any>);

    return (
        <ScreenBackground style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Body Module</Text>
                    <Text style={styles.subtitle}>Fitness Tracker</Text>
                </View>

                <View style={styles.calendarContainer}>
                    <TrackingCalendar 
                        markedDates={markedDates} 
                        onDayPress={handleDayPress} 
                        accentColor={COLORS.body}
                    />
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.description}>
                        Maintain your workout consistency by marking your gym days.
                    </Text>
                    <View style={styles.legend}>
                        <View style={styles.legendItem}>
                            <View style={[styles.dot, { backgroundColor: COLORS.body }]} />
                            <Text style={styles.legendText}>Workout Completed</Text>
                        </View>
                    </View>
                </View>

                {selectedDate && (
                    <GymModal
                        isVisible={isModalVisible}
                        date={selectedDate}
                        initialState={gymData[selectedDate] || { workoutDone: false }}
                        onClose={() => setIsModalVisible(false)}
                        onSave={handleSaveGym}
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
    subtitle: { ...TYPOGRAPHY.h3, color: COLORS.body },
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
        alignItems: 'center',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    legendText: {
        ...TYPOGRAPHY.smallMedium,
        color: COLORS.text,
    },
});
