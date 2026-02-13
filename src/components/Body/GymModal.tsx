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
import { SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

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
  const { colors } = useTheme();
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
        <View style={[styles.modalContainer, { backgroundColor: colors.surface, borderColor: colors.surfaceLight }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.textSecondary }]}>Workout tracking</Text>
            <Text style={[styles.dateText, { color: colors.body }]}>{date}</Text>
          </View>

          <TouchableOpacity
            style={[styles.checkItem, { backgroundColor: colors.surfaceLight }]}
            onPress={() => setWorkoutDone(!workoutDone)}
            activeOpacity={0.7}
          >
            <Text style={[styles.checkText, { color: colors.text }]}>Did you hit the Gym?</Text>
            <View
              style={[
                styles.checkbox,
                { borderColor: colors.body },
                workoutDone && { backgroundColor: colors.body },
              ]}
            >
              {workoutDone && (
                <Ionicons name="checkmark" size={16} color={colors.background} />
              )}
            </View>
          </TouchableOpacity>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.body }]} onPress={handleSave}>
              <Text style={[styles.saveButtonText, { color: colors.background }]}>Save</Text>
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
  checkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.xl,
  },
  checkText: {
    ...TYPOGRAPHY.bodySemiBold,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
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
