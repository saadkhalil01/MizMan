import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

import ScreenBackground from '../../components/common/ScreenBackground';
import AssetModal, { Asset, ASSET_CATEGORIES } from '../../components/Wealth/AssetModal';
import NetWorthPieChart from '../../components/Wealth/NetWorthPieChart';

const WEALTH_DATA_KEY = '@mizman_wealth_data';
const CURRENCY_KEY = '@mizman_currency_preference';

const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'USD', locale: 'en-US' },
  { code: 'PKR', symbol: 'PKR', label: 'PKR', locale: 'en-PK' },
  { code: 'INR', symbol: '₹', label: 'INR', locale: 'en-IN' },
  { code: 'AED', symbol: 'د.إ', label: 'AED', locale: 'ar-AE' },
];

export default function WealthScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);

  useEffect(() => {
    loadWealthData();
    loadCurrencyPreference();
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

  const loadCurrencyPreference = async () => {
    try {
      const storedCurrency = await AsyncStorage.getItem(CURRENCY_KEY);
      if (storedCurrency) {
        const found = CURRENCIES.find(c => c.code === storedCurrency);
        if (found) setSelectedCurrency(found);
      }
    } catch (error) {
      console.error('Error loading currency preference:', error);
    }
  };

  const saveWealthData = async (newAssets: Asset[]) => {
    try {
      await AsyncStorage.setItem(WEALTH_DATA_KEY, JSON.stringify(newAssets));
    } catch (error) {
      console.error('Error saving wealth data:', error);
    }
  };

  const saveCurrencyPreference = async (currencyCode: string) => {
    try {
      await AsyncStorage.setItem(CURRENCY_KEY, currencyCode);
    } catch (error) {
      console.error('Error saving currency preference:', error);
    }
  };

  const handleCurrencyChange = (currency: typeof CURRENCIES[0]) => {
    setSelectedCurrency(currency);
    saveCurrencyPreference(currency.code);
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
    return new Intl.NumberFormat(selectedCurrency.locale, {
      style: 'currency',
      currency: selectedCurrency.code,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <ScreenBackground style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + SPACING.xxl * 2 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>Wealth Module</Text>
            <Text style={[styles.subtitle, { color: colors.wealth }]}>Net Worth Tracker</Text>
          </View>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.wealth }]}
            onPress={() => {
              setEditingAsset(null);
              setIsModalVisible(true);
            }}
          >
            <Ionicons name="add" size={28} color={isDark ? colors.background : '#FFFFFF'} />
          </TouchableOpacity>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.surfaceLight }]}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Total Net Worth</Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>{formatCurrency(totalNetWorth)}</Text>
          
          <View style={[styles.currencyPicker, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }]}>
            {CURRENCIES.map((curr) => (
              <TouchableOpacity
                key={curr.code}
                style={[
                  styles.currencyButton,
                  selectedCurrency.code === curr.code && { backgroundColor: colors.wealth }
                ]}
                onPress={() => handleCurrencyChange(curr)}
              >
                <Text 
                  style={[
                    styles.currencyButtonText, 
                    { 
                      color: selectedCurrency.code === curr.code 
                        ? (isDark ? colors.background : '#FFFFFF') 
                        : colors.textSecondary 
                    }
                  ]}
                >
                  {curr.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {assets.length > 0 ? (
          <>
            <NetWorthPieChart assets={assets} />
            
            <View style={styles.assetList}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Assets</Text>
              {assets.map((asset) => {
                const category = ASSET_CATEGORIES.find((c) => c.id === asset.typeId);
                return (
                  <TouchableOpacity
                    key={asset.id}
                    style={[styles.assetItem, { backgroundColor: colors.surface, borderColor: colors.surfaceLight }]}
                    onPress={() => {
                      setEditingAsset(asset);
                      setIsModalVisible(true);
                    }}
                  >
                    <View style={styles.assetInfo}>
                      <View style={[styles.assetIconContainer, { backgroundColor: colors.surfaceLight }]}>
                         <Text style={{ color: colors.wealth, ...TYPOGRAPHY.bodySemiBold, fontSize: 14 }}>
                           {selectedCurrency.symbol}
                         </Text>
                      </View>
                      <Text style={[styles.assetLabel, { color: colors.text }]}>{category?.label}</Text>
                    </View>
                    <Text style={[styles.assetAmount, { color: colors.wealth }]}>{formatCurrency(asset.amount)}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="account-balance-wallet" size={64} color={colors.surfaceLight} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No assets added yet</Text>
            <TouchableOpacity 
              style={[styles.emptyButton, { backgroundColor: colors.surfaceLight }]}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={[styles.emptyButtonText, { color: colors.wealth }]}>Add your first asset</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <AssetModal
        isVisible={isModalVisible}
        editingAsset={editingAsset}
        selectedCurrency={selectedCurrency}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveAsset}
        onDelete={handleDeleteAsset}
      />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    marginBottom: SPACING.md,
  },
  title: { ...TYPOGRAPHY.h2 },
  subtitle: { ...TYPOGRAPHY.smallMedium },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: { padding: SPACING.lg },
  summaryCard: {
    padding: SPACING.xl,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1,
  },
  summaryLabel: {
    ...TYPOGRAPHY.smallMedium,
    marginBottom: SPACING.xs,
  },
  summaryValue: {
    ...TYPOGRAPHY.h1,
    fontSize: 28,
  },
  currencyPicker: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    gap: SPACING.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 4,
    borderRadius: BORDER_RADIUS.md,
  },
  currencyButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  currencyButtonText: {
    ...TYPOGRAPHY.smallMedium,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
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
    padding: SPACING.md,
    borderRadius: 16,
    marginBottom: SPACING.sm,
    borderWidth: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetLabel: {
    ...TYPOGRAPHY.bodyMedium,
  },
  assetAmount: {
    ...TYPOGRAPHY.bodySemiBold,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 64,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    marginTop: SPACING.md,
    marginBottom: SPACING.xl,
  },
  emptyButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.md,
  },
  emptyButtonText: {
    ...TYPOGRAPHY.bodyMedium,
  },
});
