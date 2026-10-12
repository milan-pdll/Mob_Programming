import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Star, MapPin, CheckCircle2, User, Clock, ChevronRight } from 'lucide-react-native';
import { SanskritiColors, Radii, Spacing, CommonStyles } from '../constants/theme';
import { PractitionerSummary } from '../types';

interface PractitionerCardProps {
  practitioner: PractitionerSummary;
  onPress: () => void;
  onRequestService?: () => void;
}

export const PractitionerCard: React.FC<PractitionerCardProps> = ({
  practitioner,
  onPress,
  onRequestService,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        CommonStyles.cardShadow,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.topSection}>
        {/* Profile Avatar / Image */}
        <View style={styles.avatarContainer}>
          {!imageError && practitioner.profile_image ? (
            <Image
              source={{ uri: practitioner.profile_image }}
              style={styles.avatar}
              onError={() => setImageError(true)}
            />
          ) : (
            <View style={[styles.avatar, styles.fallbackAvatar]}>
              <User size={28} color={SanskritiColors.maroon} />
            </View>
          )}

          {practitioner.demo_verified && (
            <View style={styles.verifiedIconWrap}>
              <CheckCircle2 size={16} color={SanskritiColors.deepGreen} />
            </View>
          )}
        </View>

        {/* Info Column */}
        <View style={styles.infoCol}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {practitioner.name}
            </Text>
          </View>

          <Text style={styles.tradition}>{practitioner.tradition}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <MapPin size={13} color={SanskritiColors.secondaryText} />
              <Text style={styles.metaText} numberOfLines={1}>
                {practitioner.location}
              </Text>
            </View>

            <View style={styles.metaItem}>
              <Clock size={13} color={SanskritiColors.secondaryText} />
              <Text style={styles.metaText}>
                {practitioner.years_of_experience} yrs exp
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Services Tags */}
      <View style={styles.servicesRow}>
        {practitioner.services.map((svc, idx) => (
          <View key={idx} style={styles.serviceChip}>
            <Text style={styles.serviceChipText}>{svc}</Text>
          </View>
        ))}
      </View>

      {/* Footer: Rating, Fee & Action */}
      <View style={styles.footer}>
        <View style={styles.ratingBox}>
          <Star size={16} color={SanskritiColors.gold} fill={SanskritiColors.gold} />
          <Text style={styles.ratingText}>{practitioner.rating.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({practitioner.review_count})</Text>
        </View>

        <View style={styles.actionRow}>
          <Text style={styles.priceText}>{practitioner.indicative_price}</Text>
          <View style={styles.viewButton}>
            <Text style={styles.viewButtonText}>Profile</Text>
            <ChevronRight size={14} color={SanskritiColors.maroon} />
          </View>
        </View>
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
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: SanskritiColors.border,
  },
  fallbackAvatar: {
    backgroundColor: '#FDEEE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedIconWrap: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: SanskritiColors.white,
    borderRadius: 9,
    padding: 1,
  },
  infoCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: SanskritiColors.primaryText,
    marginBottom: 2,
  },
  tradition: {
    fontSize: 13,
    color: SanskritiColors.earthBrown,
    fontWeight: '600',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: SanskritiColors.secondaryText,
  },
  servicesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: Spacing.md,
  },
  serviceChip: {
    backgroundColor: SanskritiColors.cream,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.sm,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
  },
  serviceChipText: {
    fontSize: 11,
    color: SanskritiColors.secondaryText,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: SanskritiColors.border,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: SanskritiColors.primaryText,
  },
  reviewCount: {
    fontSize: 12,
    color: SanskritiColors.mutedText,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '600',
    color: SanskritiColors.secondaryText,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBF2E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.button,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
  },
  viewButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: SanskritiColors.maroon,
    marginRight: 2,
  },
});
