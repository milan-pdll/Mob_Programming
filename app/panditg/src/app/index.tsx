import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles, ArrowRight, Compass } from 'lucide-react-native';
import { SanskritiColors, Radii, Spacing, CommonStyles } from '../constants/theme';

export default function WelcomeScreen() {
  const handleProceed = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        {/* Cultural Hero Imagery */}
        <View style={styles.heroImageWrapper}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />

          {/* Central Lotus Emblem */}
          <View style={[styles.emblemCircle, CommonStyles.cardShadow]}>
            <Compass size={38} color={SanskritiColors.maroon} />
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <View style={styles.brandBadge}>
            <Sparkles size={13} color={SanskritiColors.saffron} />
            <Text style={styles.brandBadgeText}>Nepalese Cultural Platform</Text>
          </View>

          <Text style={styles.appName}>Sanskriti</Text>
          <Text style={styles.tagline}>Connect • Celebrate • Preserve</Text>

          <Text style={styles.description}>
            A digital sanctuary bringing trusted Vedic pandits, Buddhist lamas, and cultural
            practitioners to your auspicious ceremonies, family pujas, and milestone traditions.
          </Text>

          <View style={styles.featuresRow}>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Verified Practitioners</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Transparent Offerings</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Authentic Rituals</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <Pressable
            onPress={handleProceed}
            style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryPressed]}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
            <ArrowRight size={18} color={SanskritiColors.white} />
          </Pressable>

          <Pressable
            onPress={handleProceed}
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryPressed]}
          >
            <Text style={styles.secondaryButtonText}>Explore as Guest</Text>
          </Pressable>

          <Text style={styles.disclaimerText}>
            Prototype Demo MVP • In-Memory Temporary Data
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SanskritiColors.cream,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: Spacing.xl,
  },
  heroImageWrapper: {
    width: '100%',
    height: 300,
    position: 'relative',
    backgroundColor: '#EAD9C6',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(59, 36, 32, 0.35)',
  },
  emblemCircle: {
    position: 'absolute',
    bottom: -28,
    alignSelf: 'center',
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: SanskritiColors.white,
    borderWidth: 3,
    borderColor: SanskritiColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentSection: {
    paddingHorizontal: Spacing.xl,
    paddingTop: 42,
    alignItems: 'center',
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SanskritiColors.white,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
    marginBottom: Spacing.sm,
  },
  brandBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: SanskritiColors.earthBrown,
    letterSpacing: 0.3,
  },
  appName: {
    fontSize: 34,
    fontWeight: '800',
    color: SanskritiColors.maroon,
    fontFamily: 'serif',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '700',
    color: SanskritiColors.gold,
    letterSpacing: 1.2,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: SanskritiColors.secondaryText,
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: Spacing.lg,
  },
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
    marginTop: 4,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: SanskritiColors.deepGreen,
  },
  featureText: {
    fontSize: 12,
    color: SanskritiColors.secondaryText,
    fontWeight: '500',
  },
  actionSection: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    alignItems: 'center',
    gap: 10,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: SanskritiColors.maroon,
    width: '100%',
    paddingVertical: 14,
    borderRadius: Radii.button,
  },
  primaryPressed: {
    backgroundColor: SanskritiColors.darkMaroon,
    transform: [{ scale: 0.99 }],
  },
  primaryButtonText: {
    color: SanskritiColors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 13,
    borderRadius: Radii.button,
    backgroundColor: SanskritiColors.white,
    borderWidth: 1.5,
    borderColor: SanskritiColors.border,
  },
  secondaryPressed: {
    backgroundColor: '#F9F1E6',
    transform: [{ scale: 0.99 }],
  },
  secondaryButtonText: {
    color: SanskritiColors.primaryText,
    fontSize: 15,
    fontWeight: '600',
  },
  disclaimerText: {
    fontSize: 11,
    color: SanskritiColors.mutedText,
    marginTop: 6,
  },
});
