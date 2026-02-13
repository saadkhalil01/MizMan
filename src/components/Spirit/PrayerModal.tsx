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
  COLORS,
  SPACING,
  TYPOGRAPHY,
  BORDER_RADIUS,
} from "../../constants/theme";

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
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Spiritual Tracking for</Text>
            <Text style={styles.dateText}>{date}</Text>
          </View>

          <View style={styles.religionSelector}>
            {(Object.keys(RELIGION_DATA) as Religion[]).map((religion) => (
              <TouchableOpacity
                key={religion}
                style={[
                  styles.religionButton,
                  selectedReligion === religion && styles.religionButtonActive,
                ]}
                onPress={() => setSelectedReligion(religion)}
              >
                <Text
                  style={[
                    styles.religionButtonText,
                    selectedReligion === religion && styles.religionButtonTextActive,
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
                style={styles.prayerItem}
                onPress={() => togglePrayer(prayer)}
                activeOpacity={0.7}
              >
                <Text style={styles.prayerName}>{prayer}</Text>
                <View
                  style={[
                    styles.checkbox,
                    prayers[prayer] && styles.checkboxChecked,
                  ]}
                >
                  {prayers[prayer] && (
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color={COLORS.background}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Updates</Text>
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
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  dateText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.spirit,
  },
  religionSelector: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceLight,
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
    backgroundColor: COLORS.surface,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  religionButtonText: {
    ...TYPOGRAPHY.smallMedium,
    color: COLORS.textSecondary,
  },
  religionButtonTextActive: {
    color: COLORS.spirit,
    ...TYPOGRAPHY.smallBold,
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
    borderBottomColor: COLORS.surfaceLight,
  },
  prayerName: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.spirit,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: COLORS.spirit,
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
    color: COLORS.textSecondary,
  },
  saveButton: {
    backgroundColor: COLORS.spirit,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.sm,
  },
  saveButtonText: {
    ...TYPOGRAPHY.bodySemiBold,
    color: COLORS.background,
  },
});
