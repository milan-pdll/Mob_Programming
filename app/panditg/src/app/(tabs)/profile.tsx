import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  User,
  MapPin,
  Mail,
  CalendarCheck,
  Heart,
  HelpCircle,
  ShieldCheck,
  Activity,
  ChevronRight,
  Info,
  Sparkles,
} from 'lucide-react-native';
import { SanskritiColors, Radii, Spacing, CommonStyles } from '../../constants/theme';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Header Card */}
        <View style={[styles.profileHeaderCard, CommonStyles.cardShadow]}>
          <View style={styles.avatarCircle}>
            <User size={40} color={SanskritiColors.maroon} />
          </View>

          <Text style={styles.userName}>Demo User</Text>
          <Text style={styles.userRole}>Cultural Community Member</Text>

          <View style={styles.metaBadgeRow}>
            <View style={styles.metaBadge}>
              <Mail size={12} color={SanskritiColors.earthBrown} />
              <Text style={styles.metaBadgeText}>demo@sanskriti.example</Text>
            </View>

            <View style={styles.metaBadge}>
              <MapPin size={12} color={SanskritiColors.maroon} />
              <Text style={styles.metaBadgeText}>Kathmandu, Nepal</Text>
            </View>
          </View>

          <View style={styles.guestDisclaimer}>
            <Text style={styles.guestDisclaimerText}>
              Guest Demonstration Mode • No personal registration required
            </Text>
          </View>
        </View>

        {/* Navigation Actions Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>My Activity</Text>

          <Pressable
            onPress={() => router.push('/(tabs)/bookings')}
            style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}
          >
            <View style={styles.menuIconWrap}>
              <CalendarCheck size={18} color={SanskritiColors.maroon} />
            </View>
            <Text style={styles.menuItemText}>My Service Requests & Bookings</Text>
            <ChevronRight size={18} color={SanskritiColors.mutedText} />
          </Pressable>

          <Pressable
            onPress={() => router.push('/(tabs)/search')}
            style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}
          >
            <View style={styles.menuIconWrap}>
              <Heart size={18} color={SanskritiColors.earthBrown} />
            </View>
            <Text style={styles.menuItemText}>Favorite Cultural Practitioners</Text>
            <ChevronRight size={18} color={SanskritiColors.mutedText} />
          </Pressable>
        </View>

        {/* Preferences & Cultural Info */}
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Preferences & Support</Text>

          <View style={styles.menuItem}>
            <View style={styles.menuIconWrap}>
              <Activity size={18} color={SanskritiColors.gold} />
            </View>
            <Text style={[styles.menuItemText, { flex: 1 }]}>Ceremony Reminder Alerts</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: SanskritiColors.border, true: SanskritiColors.maroon }}
              thumbColor={SanskritiColors.white}
            />
          </View>

          <Pressable
            onPress={() =>
              Alert.alert(
                'About Sanskriti',
                'Sanskriti is a dedicated digital platform designed to preserve and celebrate Nepalese cultural traditions by connecting households with verified Vedic pandits, Buddhist lamas, and traditional ceremonial practitioners across Kathmandu Valley.'
              )
            }
            style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}
          >
            <View style={styles.menuIconWrap}>
              <Info size={18} color={SanskritiColors.secondaryText} />
            </View>
            <Text style={styles.menuItemText}>About Sanskriti Platform</Text>
            <ChevronRight size={18} color={SanskritiColors.mutedText} />
          </Pressable>

          <Pressable
            onPress={() =>
              Alert.alert(
                'Cultural Integrity Guidelines',
                '1. Respect all traditions and sacred spiritual customs.\n2. Honor scheduled Muhurats and auspicious tithis.\n3. Transparent honorarium and ethical conduct.'
              )
            }
            style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}
          >
            <View style={styles.menuIconWrap}>
              <ShieldCheck size={18} color={SanskritiColors.deepGreen} />
            </View>
            <Text style={styles.menuItemText}>Cultural Guidelines & Traditions</Text>
            <ChevronRight size={18} color={SanskritiColors.mutedText} />
          </Pressable>

          <Pressable
            onPress={() =>
              Alert.alert(
                'Help & Support',
                'For inquiries, ritual guidance, or demo support, please contact namaste@sanskriti.example.'
              )
            }
            style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}
          >
            <View style={styles.menuIconWrap}>
              <HelpCircle size={18} color={SanskritiColors.secondaryText} />
            </View>
            <Text style={styles.menuItemText}>Help & Demo FAQ</Text>
            <ChevronRight size={18} color={SanskritiColors.mutedText} />
          </Pressable>
        </View>

        {/* Demo Disclaimer Footer */}
        <View style={styles.footerDisclaimer}>
          <Sparkles size={16} color={SanskritiColors.saffron} />
          <Text style={styles.footerVersion}>Sanskriti Mobile Platform • Version 1.0.0</Text>
          <Text style={styles.footerText}>
            Connect • Celebrate • Preserve. A digital platform for cultural ceremonies and heritage
            preservation.
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
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  profileHeaderCard: {
    backgroundColor: SanskritiColors.white,
    borderRadius: Radii.card,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: SanskritiColors.border,
    marginBottom: Spacing.lg,
  },
  avatarCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FAF0E6',
    borderWidth: 2,
    borderColor: SanskritiColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: SanskritiColors.primaryText,
    fontFamily: 'serif',
  },
  userRole: {
    fontSize: 13,
    color: SanskritiColors.earthBrown,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: Spacing.md,
  },
  metaBadgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: Spacing.md,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: SanskritiColors.cream,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
  },
  metaBadgeText: {
    fontSize: 12,
    color: SanskritiColors.secondaryText,
    fontWeight: '500',
  },
  guestDisclaimer: {
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: SanskritiColors.border,
    width: '100%',
    alignItems: 'center',
  },
  guestDisclaimerText: {
    fontSize: 11,
    color: SanskritiColors.mutedText,
    fontStyle: 'italic',
  },
  menuSection: {
    marginBottom: Spacing.lg,
  },
  menuSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: SanskritiColors.secondaryText,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SanskritiColors.white,
    padding: Spacing.md,
    borderRadius: Radii.input,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
    marginBottom: 8,
  },
  menuIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: SanskritiColors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: SanskritiColors.primaryText,
  },
  footerDisclaimer: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    gap: 4,
  },
  footerVersion: {
    fontSize: 12,
    fontWeight: '700',
    color: SanskritiColors.earthBrown,
  },
  footerText: {
    fontSize: 11,
    color: SanskritiColors.mutedText,
    textAlign: 'center',
    maxWidth: 290,
    lineHeight: 16,
  },
  pressed: {
    opacity: 0.85,
  },
});
