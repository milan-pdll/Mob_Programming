import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Flame, Award, HeartHandshake, Compass, Music, Sparkles } from 'lucide-react-native';
import { SanskritiColors, Radii, Spacing, CommonStyles } from '../constants/theme';
import { ServiceCategory } from '../types';

interface ServiceCardProps {
  service: ServiceCategory;
  onPress: () => void;
  compact?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onPress, compact = false }) => {
  const renderIcon = () => {
    const size = compact ? 22 : 26;
    const color = SanskritiColors.maroon;

    switch (service.icon_name) {
      case 'Flame':
        return <Flame size={size} color={color} />;
      case 'Award':
        return <Award size={size} color={color} />;
      case 'HeartHandshake':
        return <HeartHandshake size={size} color={color} />;
      case 'Compass':
        return <Compass size={size} color={color} />;
      case 'Music':
        return <Music size={size} color={color} />;
      case 'Sparkles':
      default:
        return <Sparkles size={size} color={color} />;
    }
  };

  if (compact) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.compactCard,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.iconCircle}>
          {renderIcon()}
        </View>
        <Text style={styles.compactTitle} numberOfLines={1}>
          {service.name}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        CommonStyles.cardShadow,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconCircle}>
          {renderIcon()}
        </View>
        <View style={styles.pricePill}>
          <Text style={styles.pricePillText}>From {service.starting_price}</Text>
        </View>
      </View>

      <Text style={styles.title}>{service.name}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {service.description}
      </Text>

      <View style={styles.cardFooter}>
        <Text style={styles.practitionersCount}>
          {service.practitioner_count} Verified Practitioners
        </Text>
        <Text style={styles.exploreLink}>Explore →</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: SanskritiColors.white,
    borderRadius: Radii.card,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
    marginBottom: Spacing.md,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FDF0E6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FBE2D1',
  },
  pricePill: {
    backgroundColor: SanskritiColors.cream,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
  },
  pricePillText: {
    fontSize: 12,
    fontWeight: '600',
    color: SanskritiColors.earthBrown,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: SanskritiColors.primaryText,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    color: SanskritiColors.secondaryText,
    marginBottom: Spacing.md,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: SanskritiColors.border,
  },
  practitionersCount: {
    fontSize: 12,
    fontWeight: '500',
    color: SanskritiColors.mutedText,
  },
  exploreLink: {
    fontSize: 13,
    fontWeight: '700',
    color: SanskritiColors.maroon,
  },
  // Compact styles for horizontal carousel
  compactCard: {
    alignItems: 'center',
    width: 82,
    marginRight: Spacing.md,
  },
  compactTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: SanskritiColors.primaryText,
    textAlign: 'center',
    marginTop: 6,
  },
});
