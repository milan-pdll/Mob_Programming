import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Search, X, SlidersHorizontal, Star } from 'lucide-react-native';
import { SanskritiColors, Radii, Spacing } from '../../constants/theme';
import { PractitionerCard } from '../../components/PractitionerCard';
import { LoadingState, ErrorState, EmptyState } from '../../components/StateFeedback';
import { fetchPractitioners } from '../../services/api';
import { PractitionerSummary } from '../../types';

const TRADITIONS = ['All Traditions', 'Hindu tradition', 'Buddhist tradition', 'Indigenous cultural services'];
const LOCATIONS = ['All Locations', 'Kathmandu', 'Lalitpur', 'Bhaktapur'];
const RATINGS = [
  { label: 'All Ratings', value: 0 },
  { label: '4.8+ Stars', value: 4.8 },
  { label: '4.9+ Stars', value: 4.9 },
];
const SERVICES_FILTERS = [
  'All Services',
  'Puja',
  'Bratabandha',
  'Wedding Ceremony',
  'Buddhist Ceremony',
  'Traditional Performers',
  'Other Cultural Services',
];

export default function SearchScreen() {
  const params = useLocalSearchParams<{ q?: string; category?: string }>();

  const [query, setQuery] = useState(params.q || '');
  const [selectedService, setSelectedService] = useState(params.category || 'All Services');
  const [selectedTradition, setSelectedTradition] = useState('All Traditions');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [minRating, setMinRating] = useState(0);

  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [practitioners, setPractitioners] = useState<PractitionerSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync route params when navigated from home
  useEffect(() => {
    if (params.q) setQuery(params.q);
    if (params.category) setSelectedService(params.category);
  }, [params.q, params.category]);

  const loadPractitioners = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchPractitioners({
        search: query.trim() || undefined,
        tradition: selectedTradition !== 'All Traditions' ? selectedTradition : undefined,
        location: selectedLocation !== 'All Locations' ? selectedLocation : undefined,
        min_rating: minRating > 0 ? minRating : undefined,
      });
      setPractitioners(data);
    } catch (err: any) {
      console.warn('Search API error:', err);
      setError('Could not connect to Sanskriti backend search.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [query, selectedTradition, selectedLocation, minRating]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadPractitioners();
    }, 250);
    return () => clearTimeout(timer);
  }, [loadPractitioners]);

  const onRefresh = () => {
    setRefreshing(true);
    loadPractitioners();
  };

  const handleClearFilters = () => {
    setQuery('');
    setSelectedService('All Services');
    setSelectedTradition('All Traditions');
    setSelectedLocation('All Locations');
    setMinRating(0);
  };

  // Additional client-side service filter for instant responsiveness
  const filteredList = useMemo(() => {
    if (selectedService === 'All Services') return practitioners;
    return practitioners.filter((p) =>
      p.services.some((s) => s.toLowerCase().includes(selectedService.toLowerCase()))
    );
  }, [practitioners, selectedService]);

  const activeFilterCount =
    (selectedService !== 'All Services' ? 1 : 0) +
    (selectedTradition !== 'All Traditions' ? 1 : 0) +
    (selectedLocation !== 'All Locations' ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Cultural Practitioners</Text>
        <Text style={styles.headerSubtitle}>
          Vedic priests, Buddhist lamas, and ceremonial artists
        </Text>

        {/* Search input bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputWrap}>
            <Search size={18} color={SanskritiColors.mutedText} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, ceremony, or ritual..."
              placeholderTextColor={SanskritiColors.mutedText}
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery('')}>
                <X size={16} color={SanskritiColors.mutedText} />
              </Pressable>
            )}
          </View>

          <Pressable
            onPress={() => setShowFiltersModal(!showFiltersModal)}
            style={({ pressed }) => [
              styles.filterToggleBtn,
              activeFilterCount > 0 && styles.filterToggleActive,
              pressed && styles.pressed,
            ]}
          >
            <SlidersHorizontal
              size={18}
              color={activeFilterCount > 0 ? SanskritiColors.white : SanskritiColors.primaryText}
            />
            {activeFilterCount > 0 && (
              <View style={styles.badgeCount}>
                <Text style={styles.badgeCountText}>{activeFilterCount}</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Quick Service Category Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsScroll}
        >
          {SERVICES_FILTERS.map((svc) => {
            const isSelected = selectedService === svc;
            return (
              <Pressable
                key={svc}
                onPress={() => setSelectedService(svc)}
                style={({ pressed }) => [
                  styles.serviceChip,
                  isSelected && styles.serviceChipSelected,
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={[
                    styles.serviceChipText,
                    isSelected && styles.serviceChipTextSelected,
                  ]}
                >
                  {svc}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Expandable Advanced Filters Panel */}
      {showFiltersModal && (
        <View style={styles.filterDrawer}>
          <View style={styles.filterDrawerHeader}>
            <Text style={styles.drawerTitle}>Advanced Filters</Text>
            {activeFilterCount > 0 && (
              <Pressable onPress={handleClearFilters}>
                <Text style={styles.clearAllText}>Reset All</Text>
              </Pressable>
            )}
          </View>

          {/* Tradition Filter */}
          <Text style={styles.filterSectionLabel}>Cultural Tradition</Text>
          <View style={styles.pillWrap}>
            {TRADITIONS.map((trad) => {
              const active = selectedTradition === trad;
              return (
                <Pressable
                  key={trad}
                  onPress={() => setSelectedTradition(trad)}
                  style={[styles.filterPill, active && styles.filterPillActive]}
                >
                  <Text style={[styles.filterPillText, active && styles.filterPillTextActive]}>
                    {trad}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Location Filter */}
          <Text style={styles.filterSectionLabel}>Location / Valley District</Text>
          <View style={styles.pillWrap}>
            {LOCATIONS.map((loc) => {
              const active = selectedLocation === loc;
              return (
                <Pressable
                  key={loc}
                  onPress={() => setSelectedLocation(loc)}
                  style={[styles.filterPill, active && styles.filterPillActive]}
                >
                  <Text style={[styles.filterPillText, active && styles.filterPillTextActive]}>
                    {loc}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Rating Filter */}
          <Text style={styles.filterSectionLabel}>Minimum Rating</Text>
          <View style={styles.pillWrap}>
            {RATINGS.map((r) => {
              const active = minRating === r.value;
              return (
                <Pressable
                  key={r.label}
                  onPress={() => setMinRating(r.value)}
                  style={[styles.filterPill, active && styles.filterPillActive]}
                >
                  {r.value > 0 && (
                    <Star
                      size={12}
                      color={active ? SanskritiColors.white : SanskritiColors.gold}
                      fill={active ? SanskritiColors.white : SanskritiColors.gold}
                      style={{ marginRight: 4 }}
                    />
                  )}
                  <Text style={[styles.filterPillText, active && styles.filterPillTextActive]}>
                    {r.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}

      {/* Practitioners List */}
      <ScrollView
        contentContainerStyle={styles.listContent}
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
        <View style={styles.resultMeta}>
          <Text style={styles.resultCount}>
            Showing {filteredList.length} verified practitioners
          </Text>
          {activeFilterCount > 0 && (
            <Pressable onPress={handleClearFilters}>
              <Text style={styles.clearFilterSmall}>Clear filters</Text>
            </Pressable>
          )}
        </View>

        {loading ? (
          <LoadingState message="Discovering cultural practitioners..." />
        ) : error ? (
          <ErrorState message={error} onRetry={loadPractitioners} />
        ) : filteredList.length === 0 ? (
          <EmptyState
            title="No practitioners found"
            message="No cultural practitioners matched your current search criteria. Try removing filters or searching for 'Puja' or 'Sharma'."
            actionText="Reset All Filters"
            onAction={handleClearFilters}
          />
        ) : (
          filteredList.map((practitioner) => (
            <PractitionerCard
              key={practitioner.id}
              practitioner={practitioner}
              onPress={() => router.push(`/practitioner/${practitioner.id}`)}
              onRequestService={() =>
                router.push({
                  pathname: '/request-service',
                  params: {
                    practitionerId: practitioner.id,
                    practitionerName: practitioner.name,
                    initialService: practitioner.services[0] || 'Puja',
                  },
                })
              }
            />
          ))
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
  header: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.md,
    backgroundColor: SanskritiColors.cream,
    borderBottomWidth: 1,
    borderBottomColor: SanskritiColors.border,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: SanskritiColors.primaryText,
    fontFamily: 'serif',
  },
  headerSubtitle: {
    fontSize: 13,
    color: SanskritiColors.secondaryText,
    marginTop: 2,
    marginBottom: Spacing.md,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: Spacing.md,
  },
  searchInputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SanskritiColors.white,
    borderRadius: Radii.input,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: SanskritiColors.primaryText,
  },
  filterToggleBtn: {
    width: 44,
    height: 44,
    borderRadius: Radii.button,
    backgroundColor: SanskritiColors.white,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  filterToggleActive: {
    backgroundColor: SanskritiColors.maroon,
    borderColor: SanskritiColors.maroon,
  },
  badgeCount: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: SanskritiColors.saffron,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCountText: {
    fontSize: 10,
    fontWeight: '800',
    color: SanskritiColors.white,
  },
  chipsScroll: {
    gap: 8,
    paddingBottom: Spacing.md,
  },
  serviceChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Radii.full,
    backgroundColor: SanskritiColors.white,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
  },
  serviceChipSelected: {
    backgroundColor: SanskritiColors.maroon,
    borderColor: SanskritiColors.maroon,
  },
  serviceChipText: {
    fontSize: 13,
    color: SanskritiColors.secondaryText,
    fontWeight: '600',
  },
  serviceChipTextSelected: {
    color: SanskritiColors.white,
  },
  filterDrawer: {
    backgroundColor: SanskritiColors.white,
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: SanskritiColors.border,
  },
  filterDrawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  drawerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: SanskritiColors.primaryText,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  clearAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: SanskritiColors.maroon,
  },
  filterSectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: SanskritiColors.secondaryText,
    marginTop: 8,
    marginBottom: 6,
  },
  pillWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.button,
    backgroundColor: SanskritiColors.cream,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
  },
  filterPillActive: {
    backgroundColor: SanskritiColors.earthBrown,
    borderColor: SanskritiColors.earthBrown,
  },
  filterPillText: {
    fontSize: 12,
    color: SanskritiColors.primaryText,
    fontWeight: '500',
  },
  filterPillTextActive: {
    color: SanskritiColors.white,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  resultMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  resultCount: {
    fontSize: 13,
    color: SanskritiColors.secondaryText,
    fontWeight: '500',
  },
  clearFilterSmall: {
    fontSize: 12,
    color: SanskritiColors.maroon,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.85,
  },
});
