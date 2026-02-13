import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';

interface TrackingCalendarProps {
  markedDates: Record<string, any>;
  onDayPress: (day: DateData) => void;
  accentColor?: string;
}

export default function TrackingCalendar({
  markedDates,
  onDayPress,
  accentColor = COLORS.spirit,
}: TrackingCalendarProps) {
  return (
    <View style={styles.container}>
      <Calendar
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textSectionTitleColor: COLORS.textSecondary,
          selectedDayBackgroundColor: accentColor,
          selectedDayTextColor: COLORS.background,
          todayTextColor: accentColor,
          dayTextColor: COLORS.text,
          textDisabledColor: COLORS.surfaceLight,
          dotColor: accentColor,
          selectedDotColor: COLORS.background,
          arrowColor: accentColor,
          disabledArrowColor: COLORS.surfaceLight,
          monthTextColor: COLORS.text,
          indicatorColor: accentColor,
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
    backgroundColor: COLORS.surface,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
});
