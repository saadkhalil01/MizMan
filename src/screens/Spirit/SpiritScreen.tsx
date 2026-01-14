import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

import ScreenBackground from '../../components/common/ScreenBackground';

export default function SpiritScreen() {
    return (
        <ScreenBackground style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons name="moon" size={64} color={COLORS.spirit} />
                </View>
                <Text style={styles.title}>Spirit Module</Text>
                <Text style={styles.subtitle}>Namaz & Quran Tracking</Text>
                <Text style={styles.description}>
                    Track your daily prayers and Quran reading progress
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
    subtitle: { ...TYPOGRAPHY.h3, color: COLORS.spirit, marginBottom: SPACING.md },
    description: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, textAlign: 'center' },
});
