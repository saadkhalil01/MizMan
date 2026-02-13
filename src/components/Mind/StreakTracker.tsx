import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
  onRelapse: () => void;
}

export default function StreakTracker({
  currentStreak,
  longestStreak,
  onRelapse,
}: StreakTrackerProps) {
  const { colors, isDark } = useTheme();

  const handleRelapsePress = () => {
    Alert.alert(
      'Confirm Reset',
      'Are you sure you want to reset your streak? Be honest with yourself.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: onRelapse },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.surfaceLight }]}>
      <View style={styles.header}>
        <Ionicons name="flame" size={24} color={colors.error} />
        <Text style={[styles.title, { color: colors.text }]}>NoFap Streak</Text>
      </View>

      <View style={styles.streakContainer}>
        <View style={[styles.circle, { borderColor: colors.mind, backgroundColor: isDark ? 'rgba(94, 221, 212, 0.1)' : 'rgba(13, 148, 136, 0.1)' }]}>
          <Text style={[styles.streakNumber, { color: colors.mind }]}>{currentStreak}</Text>
          <Text style={[styles.streakLabel, { color: colors.textSecondary }]}>Days</Text>
        </View>
      </View>

      <View style={[styles.statsContainer, { borderColor: colors.surfaceLight }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Longest Streak</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>{longestStreak} days</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.relapseButton, { backgroundColor: isDark ? 'rgba(248, 113, 113, 0.1)' : 'rgba(239, 68, 68, 0.05)' }]} 
        onPress={handleRelapsePress}
      >
        <Text style={[styles.relapseButtonText, { color: colors.error }]}>I relapsed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h2,
  },
  streakContainer: {
    marginBottom: SPACING.xl,
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakNumber: {
    ...TYPOGRAPHY.h1,
    fontSize: 48,
  },
  streakLabel: {
    ...TYPOGRAPHY.smallMedium,
    marginTop: -SPACING.xs,
  },
  statsContainer: {
    width: '100%',
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: SPACING.xl,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    ...TYPOGRAPHY.body,
  },
  statValue: {
    ...TYPOGRAPHY.bodySemiBold,
  },
  relapseButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.md,
    width: '100%',
    alignItems: 'center',
  },
  relapseButtonText: {
    ...TYPOGRAPHY.bodyMedium,
  },
});
