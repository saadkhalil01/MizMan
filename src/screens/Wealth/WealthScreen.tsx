import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants/theme';

import ScreenBackground from '../../components/common/ScreenBackground';
import AssetModal, { Asset, ASSET_CATEGORIES } from '../../components/Wealth/AssetModal';
import NetWorthPieChart from '../../components/Wealth/NetWorthPieChart';

const WEALTH_DATA_KEY = '@mizman_wealth_data';

export default function WealthScreen() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);

  useEffect(() => {
    loadWealthData();
  }, []);

  const loadWealthData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(WEALTH_DATA_KEY);
      if (storedData) {
        setAssets(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading wealth data:', error);
    }
  };

  const saveWealthData = async (newAssets: Asset[]) => {
    try {
      await AsyncStorage.setItem(WEALTH_DATA_KEY, JSON.stringify(newAssets));
    } catch (error) {
      console.error('Error saving wealth data:', error);
    }
  };

  const handleSaveAsset = (asset: Asset) => {
    const existingIndex = assets.findIndex((a) => a.id === asset.id);
    let newAssets;
    if (existingIndex > -1) {
      newAssets = [...assets];
      newAssets[existingIndex] = asset;
    } else {
      newAssets = [...assets, asset];
    }
    setAssets(newAssets);
    saveWealthData(newAssets);
  };

  const handleDeleteAsset = (id: string) => {
    const newAssets = assets.filter((a) => a.id !== id);
    setAssets(newAssets);
    saveWealthData(newAssets);
  };

  const totalNetWorth = assets.reduce((sum, a) => sum + a.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <ScreenBackground style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Wealth Module</Text>
          <Text style={styles.subtitle}>Net Worth Tracker</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setEditingAsset(null);
            setIsModalVisible(true);
          }}
        >
          <Ionicons name="add" size={28} color={COLORS.background} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Net Worth</Text>
          <Text style={styles.summaryValue}>{formatCurrency(totalNetWorth)}</Text>
        </View>

        {assets.length > 0 ? (
          <>
            <NetWorthPieChart assets={assets} />
            
            <View style={styles.assetList}>
              <Text style={styles.sectionTitle}>Your Assets</Text>
              {assets.map((asset) => {
                const category = ASSET_CATEGORIES.find((c) => c.id === asset.typeId);
                return (
                  <TouchableOpacity
                    key={asset.id}
                    style={styles.assetItem}
                    onPress={() => {
                      setEditingAsset(asset);
                      setIsModalVisible(true);
                    }}
                  >
                    <View style={styles.assetInfo}>
                      <View style={styles.assetIconContainer}>
                         <MaterialIcons name="attach-money" size={20} color={COLORS.wealth} />
                      </View>
                      <Text style={styles.assetLabel}>{category?.label}</Text>
                    </View>
                    <Text style={styles.assetAmount}>{formatCurrency(asset.amount)}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="account-balance-wallet" size={64} color={COLORS.surfaceLight} />
            <Text style={styles.emptyText}>No assets added yet</Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.emptyButtonText}>Add your first asset</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <AssetModal
        isVisible={isModalVisible}
        editingAsset={editingAsset}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveAsset}
        onDelete={handleDeleteAsset}
      />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  title: { ...TYPOGRAPHY.h2, color: COLORS.text },
  subtitle: { ...TYPOGRAPHY.smallMedium, color: COLORS.wealth },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.wealth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: { padding: SPACING.lg },
  summaryCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.xl,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  summaryLabel: {
    ...TYPOGRAPHY.smallMedium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  summaryValue: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
    fontSize: 28,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.md,
    marginTop: SPACING.md,
  },
  assetList: {
    marginTop: SPACING.md,
  },
  assetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 16,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  assetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  assetIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetLabel: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.text,
  },
  assetAmount: {
    ...TYPOGRAPHY.bodySemiBold,
    color: COLORS.wealth,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 64,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    marginBottom: SPACING.xl,
  },
  emptyButton: {
    backgroundColor: COLORS.surfaceLight,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.md,
  },
  emptyButtonText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.wealth,
  },
});
