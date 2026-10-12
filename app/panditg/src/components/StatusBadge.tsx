import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SanskritiColors, Radii } from '../constants/theme';

interface StatusBadgeProps {
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'pending':
        return {
          bg: '#FEF3C7',
          color: '#B45309',
          label: 'Pending Approval',
        };
      case 'confirmed':
        return {
          bg: '#DCFCE7',
          color: SanskritiColors.deepGreen,
          label: 'Confirmed',
        };
      case 'completed':
        return {
          bg: '#E0F2FE',
          color: '#0369A1',
          label: 'Completed',
        };
      case 'cancelled':
        return {
          bg: '#FEE2E2',
          color: '#B91C1C',
          label: 'Cancelled',
        };
      default:
        return {
          bg: SanskritiColors.border,
          color: SanskritiColors.secondaryText,
          label: status,
        };
    }
  };

  const { bg, color, label } = getBadgeStyle();

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.full,
    alignSelf: 'flex-start',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
