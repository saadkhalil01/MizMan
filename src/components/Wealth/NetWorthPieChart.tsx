import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { COLORS, TYPOGRAPHY, CATEGORY_COLORS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { Asset, ASSET_CATEGORIES } from './AssetModal';

const CHART_WIDTH = Dimensions.get('window').width - 64;

interface NetWorthPieChartProps {
  assets: Asset[];
}

export default function NetWorthPieChart({ assets }: NetWorthPieChartProps) {
  const { colors } = useTheme();
  // Aggregate assets by type
  const aggregatedData = ASSET_CATEGORIES.map((cat) => {
    const total = assets
      .filter((a) => a.typeId === cat.id)
      .reduce((sum, a) => sum + a.amount, 0);

    return {
      name: cat.label,
      value: total,
      color: CATEGORY_COLORS[cat.id] || colors.spirit,
      legendFontColor: colors.textSecondary,
      legendFontSize: 12,
    };
  }).filter((d) => d.value > 0);

  if (aggregatedData.length === 0) {
    return null;
  }

  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        <PieChart
          data={aggregatedData}
          width={CHART_WIDTH}
          height={220}
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 0]}
          absolute
          hasLegend={false}
        />
      </View>
      <View style={styles.legendContainer}>
        {aggregatedData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
            <Text style={[styles.legendText, { color: colors.textSecondary }]}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    ...TYPOGRAPHY.smallMedium,
  },
});
