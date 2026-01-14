import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

import ScreenBackground from '../../components/common/ScreenBackground';

export default function WealthScreen() {
    return (
        <ScreenBackground style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons name="trending-up" size={64} color={COLORS.wealth} />
                </View>
                <Text style={styles.title}>Wealth Module</Text>
                <Text style={styles.subtitle}>Investment Tracking</Text>
                <Text style={styles.description}>
                    Manual weekly updates for mindful wealth management
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
    subtitle: { ...TYPOGRAPHY.h3, color: COLORS.wealth, marginBottom: SPACING.md },
    description: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, textAlign: 'center' },
});
