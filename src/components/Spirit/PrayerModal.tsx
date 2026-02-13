import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  SPACING,
  TYPOGRAPHY,
  BORDER_RADIUS,
} from "../../constants/theme";
import { useTheme } from "../../context/ThemeContext";

type Religion = 'Muslim' | 'Christian' | 'Hinduism';

interface PrayerModalProps {
  isVisible: boolean;
  date: string;
  initialState: Record<string, boolean>;
  onClose: () => void;
  onSave: (prayers: Record<string, boolean>, religion: Religion) => void;
  initialReligion?: Religion;
}

const RELIGION_DATA: Record<Religion, string[]> = {
  Muslim: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"],
  Christian: ["Morning Prayer", "Bible Reading", "Grace before Meals", "Evening Prayer", "Meditation"],
  Hinduism: ["Puja", "Meditation", "Shlokas", "Bhajan", "Aarti"],
};

export default function PrayerModal({
  isVisible,
  date,
  initialState,
  onClose,
  onSave,
  initialReligion = 'Muslim',
}: PrayerModalProps) {
  const { colors, isDark } = useTheme();
  const [selectedReligion, setSelectedReligion] = useState<Religion>(initialReligion);
  const [prayers, setPrayers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Initialize prayers state when modal becomes visible or religion changes
    const items = RELIGION_DATA[selectedReligion];
    const initial: Record<string, boolean> = {};
    items.forEach(item => {
      initial[item] = initialState[item] || false;
    });
    setPrayers(initial);
  }, [isVisible, selectedReligion, initialState]);

  const togglePrayer = (prayer: string) => {
    setPrayers((prev) => ({
      ...prev,
      [prayer]: !prev[prayer],
    }));
  };

  const handleSave = () => {
    onSave(prayers, selectedReligion);
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
        <View style={[styles.modalContainer, { backgroundColor: colors.surface, borderColor: colors.surfaceLight }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.textSecondary }]}>Spiritual Tracking for</Text>
            <Text style={[styles.dateText, { color: colors.spirit }]}>{date}</Text>
          </View>

          <View style={[styles.religionSelector, { backgroundColor: colors.surfaceLight }]}>
            {(Object.keys(RELIGION_DATA) as Religion[]).map((religion) => (
              <TouchableOpacity
                key={religion}
                style={[
                  styles.religionButton,
                  selectedReligion === religion && [styles.religionButtonActive, { backgroundColor: colors.surface }],
                ]}
                onPress={() => setSelectedReligion(religion)}
              >
                <Text
                  style={[
                    styles.religionButtonText,
                    { color: colors.textSecondary },
                    selectedReligion === religion && { color: colors.spirit, ...TYPOGRAPHY.smallBold },
                  ]}
                >
                  {religion}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.prayerList}>
            {RELIGION_DATA[selectedReligion].map((prayer) => (
              <TouchableOpacity
                key={prayer}
                style={[styles.prayerItem, { borderBottomColor: colors.surfaceLight }]}
                onPress={() => togglePrayer(prayer)}
                activeOpacity={0.7}
              >
                <Text style={[styles.prayerName, { color: colors.text }]}>{prayer}</Text>
                <View
                  style={[
                    styles.checkbox,
                    { borderColor: colors.spirit },
                    prayers[prayer] && { backgroundColor: colors.spirit },
                  ]}
                >
                  {prayers[prayer] && (
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color={colors.background}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.spirit }]} onPress={handleSave}>
              <Text style={[styles.saveButtonText, { color: colors.background }]}>Save Updates</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.xs,
  },
  dateText: {
    ...TYPOGRAPHY.h2,
  },
  religionSelector: {
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS.md,
    padding: 4,
    marginBottom: SPACING.lg,
  },
  religionButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.sm,
  },
  religionButtonActive: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  religionButtonText: {
    ...TYPOGRAPHY.smallMedium,
  },
  prayerList: {
    marginBottom: SPACING.xl,
  },
  prayerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  prayerName: {
    ...TYPOGRAPHY.body,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: SPACING.md,
  },
  cancelButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  cancelButtonText: {
    ...TYPOGRAPHY.bodyMedium,
  },
  saveButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.sm,
  },
  saveButtonText: {
    ...TYPOGRAPHY.bodySemiBold,
  },
});
