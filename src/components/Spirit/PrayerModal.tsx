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

interface PrayerModalProps {
  isVisible: boolean;
  date: string;
  initialState: Record<string, boolean>;
  onClose: () => void;
  onSave: (prayers: Record<string, boolean>) => void;
}

const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

export default function PrayerModal({
  isVisible,
  date,
  initialState,
  onClose,
  onSave,
}: PrayerModalProps) {
  const [prayers, setPrayers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Initialize prayers state when modal becomes visible or initialState changes
    const initial = {
      Fajr: false,
      Dhuhr: false,
      Asr: false,
      Maghrib: false,
      Isha: false,
      ...initialState,
    };
    setPrayers(initial);
  }, [isVisible, initialState]);

  const togglePrayer = (prayer: string) => {
    setPrayers((prev) => ({
      ...prev,
      [prayer]: !prev[prayer],
    }));
  };

  const handleSave = () => {
    onSave(prayers);
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
            <Text style={styles.title}>Prayers for</Text>
            <Text style={styles.dateText}>{date}</Text>
          </View>

          <View style={styles.prayerList}>
            {PRAYERS.map((prayer) => (
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
              <Text style={styles.saveButtonText}>Save</Text>
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
