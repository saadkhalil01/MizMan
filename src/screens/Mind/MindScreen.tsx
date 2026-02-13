import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

import ScreenBackground from '../../components/common/ScreenBackground';
import StreakTracker from '../../components/Mind/StreakTracker';
import ScreenTimeTracker from '../../components/Mind/ScreenTimeTracker';

const STREAK_START_KEY = '@mizman_streak_start_date';
const LONGEST_STREAK_KEY = '@mizman_longest_streak';
const SCREEN_TIME_DATA_KEY = '@mizman_screen_time_data';

export default function MindScreen() {
    const { colors, isDark } = useTheme();
    const [streakStartDate, setStreakStartDate] = useState<number | null>(null);
    const [longestStreak, setLongestStreak] = useState(0);
    const [screenTimeData, setScreenTimeData] = useState<number[]>([]);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const storedStartDate = await AsyncStorage.getItem(STREAK_START_KEY);
            const storedLongest = await AsyncStorage.getItem(LONGEST_STREAK_KEY);
            const storedScreenTime = await AsyncStorage.getItem(SCREEN_TIME_DATA_KEY);

            if (storedStartDate) {
                setStreakStartDate(parseInt(storedStartDate));
            } else {
                // Initialize today as start date if none exists
                const now = Date.now();
                setStreakStartDate(now);
                await AsyncStorage.setItem(STREAK_START_KEY, now.toString());
            }

            if (storedLongest) setLongestStreak(parseInt(storedLongest));
            if (storedScreenTime) setScreenTimeData(JSON.parse(storedScreenTime));
            else generateMockScreenTime(); // Initial mock data
        } catch (error) {
            console.error('Error loading Mind data:', error);
        }
    };

    const generateMockScreenTime = () => {
        const mockData = Array.from({ length: 7 }, () => Math.random() * 6 + 1);
        setScreenTimeData(mockData);
        AsyncStorage.setItem(SCREEN_TIME_DATA_KEY, JSON.stringify(mockData));
    };

    const handleRelapse = async () => {
        const now = Date.now();
        setStreakStartDate(now);
        await AsyncStorage.setItem(STREAK_START_KEY, now.toString());
    };

    const handleSync = () => {
        setIsSyncing(true);
        // Simulate network/system delay
        setTimeout(() => {
            generateMockScreenTime();
            setIsSyncing(false);
        }, 1500);
    };

    const currentStreak = streakStartDate 
        ? Math.floor((Date.now() - streakStartDate) / (1000 * 60 * 60 * 24)) 
        : 0;

    // Update longest streak if current is higher
    useEffect(() => {
        if (currentStreak > longestStreak) {
            setLongestStreak(currentStreak);
            AsyncStorage.setItem(LONGEST_STREAK_KEY, currentStreak.toString());
        }
    }, [currentStreak]);

    const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <ScreenBackground style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]}>Mind Module</Text>
                    <Text style={[styles.subtitle, { color: colors.mind }]}>Digital Wellbeing</Text>
                </View>

                <StreakTracker 
                    currentStreak={currentStreak}
                    longestStreak={longestStreak}
                    onRelapse={handleRelapse}
                />

                <ScreenTimeTracker 
                    data={screenTimeData}
                    labels={weekLabels}
                    onSync={handleSync}
                    isSyncing={isSyncing}
                />

                <View style={[styles.infoBox, { backgroundColor: colors.surface, borderColor: colors.surfaceLight }]}>
                    <Text style={[styles.infoTitle, { color: colors.mind }]}>Why this matters?</Text>
                    <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                        Consistency in your habits and mindful digital usage are key to a healthy mind. 
                        Track your progress and stay focused on what truly matters.
                    </Text>
                </View>
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
    infoBox: {
        padding: SPACING.lg,
        borderRadius: 24,
        borderWidth: 1,
        marginTop: SPACING.md,
    },
    infoTitle: {
        ...TYPOGRAPHY.bodySemiBold,
        marginBottom: SPACING.xs,
    },
    infoText: {
        ...TYPOGRAPHY.small,
        lineHeight: 20,
    },
});
