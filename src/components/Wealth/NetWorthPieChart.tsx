import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';
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
      color: colors.asset[cat.id] || colors.spirit,
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
      <View style={styles.contentContainer}>
        <View style={styles.chartWrapper}>
          <PieChart
            data={aggregatedData}
            width={CHART_WIDTH}
            height={200}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="0"
            center={[0, 0]}
            // absolute
            hasLegend={true}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    borderRadius: 24,
    // padding: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
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
    marginRight: 8,
  },
  legendText: {
    ...TYPOGRAPHY.smallMedium,
    flex: 1,
  },
});
