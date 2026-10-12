import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MapPin, Bell, User } from 'lucide-react-native';
import { SanskritiColors, Radii, Spacing } from '../constants/theme';

interface HeaderProps {
  greeting?: string;
  subtitle?: string;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  location?: string;
}

export const Header: React.FC<HeaderProps> = ({
  greeting = 'Namaste! 🙏',
  subtitle = 'Discover trusted cultural practitioners',
  onNotificationPress,
  onProfilePress,
  location = 'Kathmandu, Nepal',
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <View style={styles.locationPill}>
          <MapPin size={13} color={SanskritiColors.maroon} />
          <Text style={styles.locationText}>{location}</Text>
        </View>

        <View style={styles.actionIcons}>
          <Pressable
            onPress={onNotificationPress}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <Bell size={18} color={SanskritiColors.primaryText} />
            <View style={styles.notificationDot} />
          </Pressable>

          <Pressable
            onPress={onProfilePress}
            style={({ pressed }) => [styles.avatarButton, pressed && styles.pressed]}
          >
            <User size={18} color={SanskritiColors.maroon} />
          </Pressable>
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    backgroundColor: SanskritiColors.cream,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SanskritiColors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
    gap: 5,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    color: SanskritiColors.primaryText,
  },
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: SanskritiColors.white,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: SanskritiColors.saffron,
  },
  avatarButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FDF0E6',
    borderWidth: 1,
    borderColor: SanskritiColors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  textContainer: {
    marginBottom: 4,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: SanskritiColors.primaryText,
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 13,
    color: SanskritiColors.secondaryText,
    marginTop: 2,
  },
});
