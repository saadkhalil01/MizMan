import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SPACING, TYPOGRAPHY, BORDER_RADIUS } from "../../constants/theme";
import { useTheme } from "../../context/ThemeContext";
import { useSettings, NATIONALITIES } from "../../context/SettingsContext";

import ScreenBackground from "../../components/common/ScreenBackground";
import AssetModal, {
  Asset,
  ASSET_CATEGORIES,
} from "../../components/Wealth/AssetModal";
import NetWorthPieChart from "../../components/Wealth/NetWorthPieChart";

const WEALTH_DATA_KEY = "@mizman_wealth_data";
const CURRENCY_KEY = "@mizman_currency_preference";

// Mock Exchange Rates (Base: USD)
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  PKR: 280,
  INR: 83,
  AED: 3.67,
};

export default function WealthScreen() {
  const { colors, isDark } = useTheme();
  const { nationality } = useSettings();
  const insets = useSafeAreaInsets();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);

  // Find current nationality details
  const currentNat =
    NATIONALITIES.find((n) => n.value === nationality) || NATIONALITIES[2]; // Default to USA
  const [selectedCurrency, setSelectedCurrency] = useState({
    code: currentNat.currency,
    symbol: currentNat.symbol,
    label: currentNat.currency,
    locale: "en-US",
  });

  useEffect(() => {
    // When nationality changes, update the selected currency to the nationality's base currency
    const nat =
      NATIONALITIES.find((n) => n.value === nationality) || NATIONALITIES[2];
    setSelectedCurrency({
      code: nat.currency,
      symbol: nat.symbol,
      label: nat.currency,
      locale: "en-US",
    });
  }, [nationality]);

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
      console.error("Error loading wealth data:", error);
    }
  };

  const saveWealthData = async (newAssets: Asset[]) => {
    try {
      await AsyncStorage.setItem(WEALTH_DATA_KEY, JSON.stringify(newAssets));
    } catch (error) {
      console.error("Error saving wealth data:", error);
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

  const formatCurrency = (amount: number, code: string, symbol: string) => {
    return `${symbol}${new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(amount)}`;
  };

  // Conversion Logic
  const getConvertedValues = () => {
    const baseCode = selectedCurrency.code;
    const amountInUSD = totalNetWorth / EXCHANGE_RATES[baseCode];

    return NATIONALITIES.filter((n) => n.currency !== baseCode).map((n) => ({
      code: n.currency,
      symbol: n.symbol,
      amount: amountInUSD * EXCHANGE_RATES[n.currency],
    }));
  };

  const conversions = getConvertedValues();

  return (
    <ScreenBackground style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + SPACING.xxl * 2 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>
              Wealth Module
            </Text>
            <Text style={[styles.subtitle, { color: colors.wealth }]}>
              Net Worth ({nationality})
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.wealth }]}
            onPress={() => {
              setEditingAsset(null);
              setIsModalVisible(true);
            }}
          >
            <Ionicons
              name="add"
              size={28}
              color={isDark ? colors.background : "#FFFFFF"}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.summaryCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.surfaceLight,
            },
          ]}
        >
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Total Net Worth
          </Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            {formatCurrency(
              totalNetWorth,
              selectedCurrency.code,
              selectedCurrency.symbol,
            )}
          </Text>

          <View style={styles.conversionsContainer}>
            {conversions.map((conv) => (
              <View key={conv.code} style={styles.conversionItem}>
                <Text
                  style={[styles.conversionCode, { color: colors.textMuted }]}
                >
                  {conv.code}:{" "}
                </Text>
                <Text
                  style={[
                    styles.conversionValue,
                    { color: colors.textSecondary },
                  ]}
                >
                  {formatCurrency(conv.amount, conv.code, conv.symbol)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {assets.length > 0 ? (
          <>
            <NetWorthPieChart assets={assets} />

            <View style={styles.assetList}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Your Assets
              </Text>

              {assets.map((asset) => {
                const category = ASSET_CATEGORIES.find(
                  (c) => c.id === asset.typeId,
                );

                const renderIcon = () => {
                  if (!category) return null;

                  const iconName = (category as any).icon;
                  const provider = (category as any).provider;
                  const iconColor =
                    colors.assetIcon[category.id] || colors.wealth;

                  if (provider === "MaterialCommunityIcons") {
                    return (
                      <MaterialCommunityIcons
                        name={iconName}
                        size={20}
                        color={iconColor}
                      />
                    );
                  }
                  if (provider === "MaterialIcons") {
                    return (
                      <MaterialIcons
                        name={iconName}
                        size={20}
                        color={iconColor}
                      />
                    );
                  }
                  return (
                    <Ionicons name={iconName} size={20} color={iconColor} />
                  );
                };

                const cardBgColor = category
                  ? colors.asset[category.id] || colors.wealth
                  : colors.wealth;

                return (
                  <TouchableOpacity
                    key={asset.id}
                    style={[
                      styles.assetItem,
                      {
                        backgroundColor: colors.surface,
                        borderColor: colors.surfaceLight,
                      },
                    ]}
                    onPress={() => {
                      setEditingAsset(asset);
                      setIsModalVisible(true);
                    }}
                  >
                    <View style={styles.assetInfo}>
                      <View
                        style={[
                          styles.assetIconContainer,
                          { backgroundColor: colors.surfaceLight },
                        ]}
                      >
                        {renderIcon()}
                      </View>
                      <Text style={[styles.assetLabel, { color: colors.text }]}>
                        {category?.label}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.assetAmount,
                        {
                          color:
                            colors.assetIcon[category?.id || ""] ||
                            colors.wealth,
                        },
                      ]}
                    >
                      {formatCurrency(
                        asset.amount,
                        selectedCurrency.code,
                        selectedCurrency.symbol,
                      )}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons
              name="account-balance-wallet"
              size={64}
              color={colors.surfaceLight}
            />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No assets added yet
            </Text>
            <TouchableOpacity
              style={[
                styles.emptyButton,
                { backgroundColor: colors.surfaceLight },
              ]}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={[styles.emptyButtonText, { color: colors.wealth }]}>
                Add your first asset
              </Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
    marginBottom: SPACING.md,
  },
  title: { ...TYPOGRAPHY.h2 },
  subtitle: { ...TYPOGRAPHY.smallMedium },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  content: { padding: SPACING.lg },
  summaryCard: {
    padding: SPACING.xl,
    borderRadius: 24,
    alignItems: "center",
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
  conversionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: SPACING.md,
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
  },
  conversionItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  conversionCode: {
    ...TYPOGRAPHY.smallBold,
  },
  conversionValue: {
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.md,
    borderRadius: 16,
    marginBottom: SPACING.sm,
    borderWidth: 1,
  },
  assetInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  assetIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  assetLabel: {
    ...TYPOGRAPHY.bodyMedium,
  },
  assetAmount: {
    ...TYPOGRAPHY.bodySemiBold,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
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
