import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants/theme';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="flame" size={24} color={COLORS.error} />
        <Text style={styles.title}>NoFap Streak</Text>
      </View>

      <View style={styles.streakContainer}>
        <View style={styles.circle}>
          <Text style={styles.streakNumber}>{currentStreak}</Text>
          <Text style={styles.streakLabel}>Days</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Longest Streak</Text>
          <Text style={styles.statValue}>{longestStreak} days</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.relapseButton} onPress={handleRelapsePress}>
        <Text style={styles.relapseButtonText}>I relapsed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
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
    color: COLORS.text,
  },
  streakContainer: {
    marginBottom: SPACING.xl,
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: COLORS.mind,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(94, 221, 212, 0.1)',
  },
  streakNumber: {
    ...TYPOGRAPHY.h1,
    fontSize: 48,
    color: COLORS.mind,
  },
  streakLabel: {
    ...TYPOGRAPHY.smallMedium,
    color: COLORS.textSecondary,
    marginTop: -SPACING.xs,
  },
  statsContainer: {
    width: '100%',
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.surfaceLight,
    marginBottom: SPACING.xl,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  statValue: {
    ...TYPOGRAPHY.bodySemiBold,
    color: COLORS.text,
  },
  relapseButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    width: '100%',
    alignItems: 'center',
  },
  relapseButtonText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.error,
  },
});
