import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

import ScreenBackground from '../../components/common/ScreenBackground';

export default function AnalyticsScreen() {
    return (
        <ScreenBackground style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons name="stats-chart" size={64} color={COLORS.primary} />
                </View>
                <Text style={styles.title}>Analytics</Text>
                <Text style={styles.subtitle}>Your Progress Overview</Text>
                <Text style={styles.description}>
                    Weekly and monthly reports showing your life balance
                </Text>
            </ScrollView>
        </ScreenBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.xl },
    iconContainer: { marginBottom: SPACING.xl },
    title: { ...TYPOGRAPHY.h1, color: COLORS.text, marginBottom: SPACING.sm },
    subtitle: { ...TYPOGRAPHY.h3, color: COLORS.primary, marginBottom: SPACING.md },
    description: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, textAlign: 'center' },
});
