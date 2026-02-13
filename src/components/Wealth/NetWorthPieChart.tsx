import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';
import { Asset, ASSET_CATEGORIES } from './AssetModal';

const CHART_WIDTH = Dimensions.get('window').width - 64;

interface NetWorthPieChartProps {
  assets: Asset[];
}

const CATEGORY_COLORS: Record<string, string> = {
  stock: '#86EFAC', // Light Green
  crypto: '#FACC15', // Yellow
  real_estate: '#9CA3AF', // Grey
  gold: '#D4A017', // Gold
  silver: '#E5E7EB', // Slate
  bonds: '#8B5CF6', // Violet
  money_market: '#93C5FD', // Light Blue
  options: '#F9A8D4', // Pink
  pension_fund: '#C4B5FD', // Light Purple
  equity_funds: '#EF4444', // Red
};

export default function NetWorthPieChart({ assets }: NetWorthPieChartProps) {
  // Aggregate assets by type
  const aggregatedData = ASSET_CATEGORIES.map((cat) => {
    const total = assets
      .filter((a) => a.typeId === cat.id)
      .reduce((sum, a) => sum + a.amount, 0);

    return {
      name: cat.label,
      value: total,
      color: CATEGORY_COLORS[cat.id] || COLORS.spirit,
      legendFontColor: COLORS.textSecondary,
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
});
