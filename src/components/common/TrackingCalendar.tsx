import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { TYPOGRAPHY } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface TrackingCalendarProps {
  markedDates: Record<string, any>;
  onDayPress: (day: DateData) => void;
  accentColor?: string;
}

export default function TrackingCalendar({
  markedDates,
  onDayPress,
  accentColor,
}: TrackingCalendarProps) {
  const { colors } = useTheme();
  const effectiveAccentColor = accentColor || colors.spirit;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.surfaceLight }]}>
      <Calendar
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textSectionTitleColor: colors.textSecondary,
          selectedDayBackgroundColor: effectiveAccentColor,
          selectedDayTextColor: colors.background,
          todayTextColor: effectiveAccentColor,
          dayTextColor: colors.text,
          textDisabledColor: colors.surfaceLight,
          dotColor: effectiveAccentColor,
          selectedDotColor: colors.background,
          arrowColor: effectiveAccentColor,
          disabledArrowColor: colors.surfaceLight,
          monthTextColor: colors.text,
          indicatorColor: effectiveAccentColor,
          textDayFontFamily: TYPOGRAPHY.body.fontFamily,
          textMonthFontFamily: TYPOGRAPHY.h2.fontFamily,
          textDayHeaderFontFamily: TYPOGRAPHY.caption.fontFamily,
          textDayFontWeight: '400',
          textMonthFontWeight: '400',
          textDayHeaderFontWeight: '400',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 12,
        }}
        markedDates={markedDates}
        onDayPress={onDayPress}
        enableSwipeMonths={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 8,
    borderWidth: 1,
  },
});
