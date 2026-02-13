import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useSettings, NATIONALITIES, Nationality } from '../../context/SettingsContext';

interface NationalityModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function NationalityModal({ isVisible, onClose }: NationalityModalProps) {
  const { colors, isDark } = useTheme();
  const { nationality, setNationality } = useSettings();

  const handleSelect = (value: Nationality) => {
    setNationality(value);
    onClose();
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={[styles.modalContainer, { backgroundColor: colors.surface }]} onStartShouldSetResponder={() => true}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Select Nationality</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.gridContainer}>
            {NATIONALITIES.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.flagButton,
                  { backgroundColor: colors.surfaceLight },
                  nationality === item.value && { 
                    borderColor: colors.primary, 
                    borderWidth: 2,
                    shadowColor: colors.primary,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.5,
                    shadowRadius: 8,
                    elevation: 4
                  }
                ]}
                onPress={() => handleSelect(item.value)}
              >
                <Text style={styles.flagEmoji}>{item.flag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    padding: SPACING.xl,
    alignItems: 'center',
  },
  modalContainer: {
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    width: '100%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h2,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: SPACING.lg,
    marginBottom: SPACING.md,
  },
  flagButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  flagEmoji: {
    fontSize: 32,
  },
});
