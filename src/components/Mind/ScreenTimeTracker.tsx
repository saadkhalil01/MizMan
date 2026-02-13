import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

const CHART_WIDTH = Dimensions.get('window').width - 64;

interface ScreenTimeTrackerProps {
  data: number[];
  labels: string[];
  onSync: () => void;
  isSyncing: boolean;
}

export default function ScreenTimeTracker({
  data,
  labels,
  onSync,
  isSyncing,
}: ScreenTimeTrackerProps) {
  const { colors, isDark } = useTheme();
  const averageValue = data.length > 0 ? (data.reduce((a, b) => a + b, 0) / data.length).toFixed(1) : '0';

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data.length > 0 ? data : [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    decimalPlaces: 1,
    color: (opacity = 1) => isDark ? `rgba(52, 211, 153, ${opacity})` : `rgba(16, 185, 129, ${opacity})`,
    labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    barPercentage: 0.6,
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.surfaceLight }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Ionicons name="phone-portrait-outline" size={24} color={colors.mind} />
          <Text style={[styles.title, { color: colors.text }]}>Screen Time</Text>
        </View>
        <TouchableOpacity
          style={styles.syncButton}
          onPress={onSync}
          disabled={isSyncing}
        >
          <Ionicons
            name={isSyncing ? 'refresh-circle' : 'sync-outline'}
            size={20}
            color={colors.mind}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        <BarChart
          data={chartData}
          width={CHART_WIDTH}
          height={220}
          yAxisLabel=""
          yAxisSuffix="h"
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          fromZero
          showBarTops={false}
          withInnerLines={false}
          style={styles.chart}
        />
      </View>

      <View style={styles.footer}>
        <View style={[styles.statBox, { backgroundColor: isDark ? 'rgba(94, 221, 212, 0.1)' : 'rgba(13, 148, 136, 0.1)' }]}>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Daily Average</Text>
          <Text style={[styles.statValue, { color: colors.mind }]}>{averageValue}h</Text>
        </View>
        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
          Insights integrated from mobile wellbeing.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.h2,
  },
  syncButton: {
    padding: SPACING.xs,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  chart: {
    borderRadius: 16,
    paddingRight: 0,
  },
  footer: {
    alignItems: 'center',
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.full,
    marginBottom: SPACING.md,
  },
  statLabel: {
    ...TYPOGRAPHY.small,
  },
  statValue: {
    ...TYPOGRAPHY.bodySemiBold,
  },
  infoText: {
    ...TYPOGRAPHY.small,
    textAlign: 'center',
  },
});
