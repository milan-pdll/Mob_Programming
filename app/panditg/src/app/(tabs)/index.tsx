import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Search, SlidersHorizontal, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react-native';
import { SanskritiColors, Radii, Spacing, CommonStyles } from '../../constants/theme';
import { Header } from '../../components/Header';
import { ServiceCard } from '../../components/ServiceCard';
import { PractitionerCard } from '../../components/PractitionerCard';
import { LoadingState, ErrorState } from '../../components/StateFeedback';
import { fetchServices, fetchPractitioners } from '../../services/api';
import { ServiceCategory, PractitionerSummary } from '../../types';

export default function HomeScreen() {
  const [services, setServices] = useState<ServiceCategory[]>([]);
  const [practitioners, setPractitioners] = useState<PractitionerSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const [servicesData, practitionersData] = await Promise.all([
        fetchServices(),
        fetchPractitioners(),
      ]);
      setServices(servicesData);
      setPractitioners(practitionersData);
    } catch (err: any) {
      console.warn('API error:', err?.message || err);
      setError('Could not connect to Sanskriti FastAPI backend.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleSearchSubmit = () => {
    router.push({
      pathname: '/(tabs)/search',
      params: { q: searchQuery },
    });
  };

  const handleServiceSelect = (serviceName: string) => {
    router.push({
      pathname: '/(tabs)/search',
      params: { category: serviceName },
    });
  };

  const handlePractitionerPress = (id: string) => {
    router.push(`/practitioner/${id}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        greeting="Namaste! 🙏"
        subtitle="Discover trusted cultural practitioners"
        location="Kathmandu, Nepal"
        onProfilePress={() => router.push('/(tabs)/profile')}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[SanskritiColors.maroon]}
            tintColor={SanskritiColors.maroon}
          />
        }
      >
        {/* Search Bar Input */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={18} color={SanskritiColors.mutedText} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search services or practitioners..."
              placeholderTextColor={SanskritiColors.mutedText}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
            />
          </View>
          <Pressable
            onPress={handleSearchSubmit}
            style={({ pressed }) => [styles.filterBtn, pressed && styles.btnPressed]}
          >
            <SlidersHorizontal size={18} color={SanskritiColors.white} />
          </Pressable>
        </View>

        {/* Hero Cultural Banner */}
        <View style={[styles.heroCard, CommonStyles.cardShadow]}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1609137144822-79946487e492?auto=format&fit=crop&w=1000&q=80',
            }}
            style={styles.heroBackground}
          />
          <View style={styles.heroOverlay} />

          <View style={styles.heroContent}>
            <View style={styles.heroPill}>
              <ShieldCheck size={13} color={SanskritiColors.gold} />
              <Text style={styles.heroPillText}>Authentic Vedic & Buddhist Rites</Text>
            </View>

            <Text style={styles.heroTitle}>Celebrate your traditions with confidence.</Text>
            <Text style={styles.heroSubtitle}>
              Connect with experienced, respectful pandits, pujaris, and lamas across Kathmandu
              Valley for all sacred milestones.
            </Text>

            <Pressable
              onPress={() => router.push('/(tabs)/search')}
              style={({ pressed }) => [styles.heroCta, pressed && styles.btnPressed]}
            >
              <Text style={styles.heroCtaText}>Explore Services</Text>
              <ArrowRight size={15} color={SanskritiColors.maroon} />
            </Pressable>
          </View>
        </View>

        {loading ? (
          <LoadingState message="Loading cultural services & practitioners..." />
        ) : error ? (
          <ErrorState message={error} onRetry={loadData} />
        ) : (
          <>
            {/* Popular Services Section */}
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Popular Cultural Services</Text>
                <Text style={styles.sectionSubtitle}>Select a ceremony to view verified specialists</Text>
              </View>
              <Pressable onPress={() => router.push('/(tabs)/search')}>
                <Text style={styles.viewAllText}>View All</Text>
              </Pressable>
            </View>

            {/* Quick Service Categories Carousel */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {services.map((svc) => (
                <ServiceCard
                  key={svc.id}
                  service={svc}
                  compact
                  onPress={() => handleServiceSelect(svc.name)}
                />
              ))}
            </ScrollView>

            {/* Detailed Service Cards Grid */}
            <View style={styles.servicesGrid}>
              {services.slice(0, 3).map((svc) => (
                <ServiceCard
                  key={svc.id}
                  service={svc}
                  onPress={() => handleServiceSelect(svc.name)}
                />
              ))}
            </View>

            {/* Recommended Practitioners Section */}
            <View style={[styles.sectionHeader, { marginTop: Spacing.lg }]}>
              <View>
                <Text style={styles.sectionTitle}>Recommended Practitioners</Text>
                <Text style={styles.sectionSubtitle}>Highly-rated across Hindu & Buddhist traditions</Text>
              </View>
              <Pressable onPress={() => router.push('/(tabs)/search')}>
                <Text style={styles.viewAllText}>View All ({practitioners.length})</Text>
              </Pressable>
            </View>

            {practitioners.map((practitioner) => (
              <PractitionerCard
                key={practitioner.id}
                practitioner={practitioner}
                onPress={() => handlePractitionerPress(practitioner.id)}
              />
            ))}

            {/* Bottom Demo Notice */}
            <View style={styles.demoNoticeCard}>
              <Sparkles size={16} color={SanskritiColors.saffron} />
              <Text style={styles.demoNoticeText}>
                Demo Prototype: Fictional practitioners and sample reviews are served dynamically
                from the FastAPI server.
              </Text>
            </View>
          </>
        )}
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
    paddingBottom: Spacing.xxl,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: Spacing.md,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SanskritiColors.white,
    borderRadius: Radii.input,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: SanskritiColors.primaryText,
  },
  filterBtn: {
    width: 46,
    height: 46,
    borderRadius: Radii.button,
    backgroundColor: SanskritiColors.maroon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  heroCard: {
    borderRadius: Radii.card,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: Spacing.xl,
    backgroundColor: SanskritiColors.primaryText,
  },
  heroBackground: {
    width: '100%',
    height: 220,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(59, 36, 32, 0.72)',
  },
  heroContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.full,
    alignSelf: 'flex-start',
  },
  heroPillText: {
    color: SanskritiColors.white,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: SanskritiColors.white,
    fontFamily: 'serif',
    marginTop: 6,
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#E5D5C5',
    lineHeight: 17,
  },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SanskritiColors.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radii.button,
    alignSelf: 'flex-start',
  },
  heroCtaText: {
    fontSize: 13,
    fontWeight: '700',
    color: SanskritiColors.maroon,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: SanskritiColors.primaryText,
    fontFamily: 'serif',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: SanskritiColors.secondaryText,
    marginTop: 2,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: SanskritiColors.maroon,
  },
  horizontalScroll: {
    paddingVertical: 4,
    paddingBottom: Spacing.md,
  },
  servicesGrid: {
    gap: 2,
  },
  demoNoticeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FDF7EB',
    padding: Spacing.md,
    borderRadius: Radii.input,
    borderWidth: 1,
    borderColor: '#FBE8BF',
    marginTop: Spacing.lg,
  },
  demoNoticeText: {
    flex: 1,
    fontSize: 12,
    color: SanskritiColors.earthBrown,
    lineHeight: 16,
  },
});
