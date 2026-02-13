import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants/theme';

export const ASSET_CATEGORIES = [
  { id: 'stock', label: 'Stock', icon: 'trending-up', provider: 'MaterialIcons' },
  { id: 'crypto', label: 'Crypto', icon: 'currency-btc', provider: 'MaterialCommunityIcons' },
  { id: 'real_estate', label: 'Real Estate', icon: 'home-city', provider: 'MaterialCommunityIcons' },
  { id: 'gold', label: 'Gold', icon: 'gold', provider: 'MaterialCommunityIcons' },
  { id: 'silver', label: 'Silver', icon: 'diamond-stone', provider: 'MaterialCommunityIcons' },
  { id: 'bonds', label: 'Bonds', icon: 'file-document-outline', provider: 'MaterialCommunityIcons' },
  { id: 'money_market', label: 'Money Market Funds', icon: 'bank', provider: 'MaterialCommunityIcons' },
  { id: 'options', label: 'Options', icon: 'chart-bell-curve-cumulative', provider: 'MaterialCommunityIcons' },
] as const;

export interface Asset {
  id: string;
  typeId: string;
  amount: number;
}

interface AssetModalProps {
  isVisible: boolean;
  editingAsset: Asset | null;
  onClose: () => void;
  onSave: (asset: Asset) => void;
  onDelete?: (id: string) => void;
}

export default function AssetModal({
  isVisible,
  editingAsset,
  onClose,
  onSave,
  onDelete,
}: AssetModalProps) {
  const [selectedTypeId, setSelectedTypeId] = useState<string>(ASSET_CATEGORIES[0].id);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (editingAsset) {
      setSelectedTypeId(editingAsset.typeId);
      setAmount(editingAsset.amount.toString());
    } else {
      setSelectedTypeId(ASSET_CATEGORIES[0].id);
      setAmount('');
    }
  }, [isVisible, editingAsset]);

  const handleSave = () => {
    const numAmount = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
    onSave({
      id: editingAsset?.id || Date.now().toString(),
      typeId: selectedTypeId,
      amount: numAmount,
    });
    onClose();
  };

  const renderIcon = (category: typeof ASSET_CATEGORIES[number], size = 20, color = COLORS.text) => {
    if (category.provider === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons name={category.icon as any} size={size} color={color} />;
    }
    return <Ionicons name={category.icon as any} size={size} color={color} />;
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer} onStartShouldSetResponder={() => true}>
          <View style={styles.header}>
            <Text style={styles.title}>{editingAsset ? 'Edit Asset' : 'Add Asset'}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryGrid}>
              {ASSET_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryItem,
                    selectedTypeId === cat.id && styles.categoryItemActive,
                  ]}
                  onPress={() => setSelectedTypeId(cat.id)}
                >
                  {renderIcon(cat, 24, selectedTypeId === cat.id ? COLORS.background : COLORS.wealth)}
                  <Text
                    style={[
                      styles.categoryLabel,
                      selectedTypeId === cat.id && styles.categoryLabelActive,
                    ]}
                    numberOfLines={1}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Amount</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.currencyPrefix}>$</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="numeric"
                autoFocus={!editingAsset}
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            {editingAsset && onDelete && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  onDelete(editingAsset.id);
                  onClose();
                }}
              >
                <Ionicons name="trash-outline" size={20} color={COLORS.error} />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
  },
  scrollContent: {
    marginBottom: SPACING.lg,
  },
  label: {
    ...TYPOGRAPHY.smallMedium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  categoryItem: {
    width: '48%',
    backgroundColor: COLORS.surfaceLight,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryItemActive: {
    backgroundColor: COLORS.wealth,
    borderColor: COLORS.wealth,
  },
  categoryLabel: {
    ...TYPOGRAPHY.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  categoryLabelActive: {
    color: COLORS.background,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.xs,
  },
  currencyPrefix: {
    ...TYPOGRAPHY.h2,
    color: COLORS.wealth,
    marginRight: SPACING.xs,
  },
  input: {
    flex: 1,
    height: 56,
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
  },
  footer: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  deleteButton: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.wealth,
    height: 56,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    ...TYPOGRAPHY.bodySemiBold,
    color: COLORS.background,
  },
});
