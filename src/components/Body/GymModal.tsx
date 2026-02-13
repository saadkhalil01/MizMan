import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants/theme';

interface GymModalProps {
  isVisible: boolean;
  date: string;
  initialState: { workoutDone: boolean };
  onClose: () => void;
  onSave: (status: { workoutDone: boolean }) => void;
}

export default function GymModal({
  isVisible,
  date,
  initialState,
  onClose,
  onSave,
}: GymModalProps) {
  const [workoutDone, setWorkoutDone] = useState(false);

  useEffect(() => {
    setWorkoutDone(!!initialState.workoutDone);
  }, [isVisible, initialState]);

  const handleSave = () => {
    onSave({ workoutDone });
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
            <Text style={styles.title}>Workout tracking</Text>
            <Text style={styles.dateText}>{date}</Text>
          </View>

          <TouchableOpacity
            style={styles.checkItem}
            onPress={() => setWorkoutDone(!workoutDone)}
            activeOpacity={0.7}
          >
            <Text style={styles.checkText}>Did you hit the Gym?</Text>
            <View
              style={[
                styles.checkbox,
                workoutDone && styles.checkboxChecked,
              ]}
            >
              {workoutDone && (
                <Ionicons name="checkmark" size={16} color={COLORS.background} />
              )}
            </View>
          </TouchableOpacity>

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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
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
    color: COLORS.body,
  },
  checkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.xl,
  },
  checkText: {
    ...TYPOGRAPHY.bodySemiBold,
    color: COLORS.text,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.body,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.body,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    backgroundColor: COLORS.body,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.sm,
  },
  saveButtonText: {
    ...TYPOGRAPHY.bodySemiBold,
    color: COLORS.background,
  },
});
