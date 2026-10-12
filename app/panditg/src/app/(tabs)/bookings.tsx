import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Calendar,
  MapPin,
  User,
  XCircle,
  Sparkles,
} from 'lucide-react-native';
import { SanskritiColors, Radii, Spacing, CommonStyles } from '../../constants/theme';
import { StatusBadge } from '../../components/StatusBadge';
import { LoadingState, ErrorState, EmptyState } from '../../components/StateFeedback';
import { fetchBookings, cancelBookingRequest } from '../../services/api';
import { Booking } from '../../types';

type BookingTab = 'all' | 'pending' | 'upcoming' | 'past';

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<BookingTab>('all');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const loadBookings = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchBookings();
      setBookings(data);
    } catch (err: any) {
      console.warn('Bookings API error:', err);
      setError('Could not fetch bookings from FastAPI backend.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const onRefresh = () => {
    setRefreshing(true);
    loadBookings();
  };

  const handleCancelBooking = (booking: Booking) => {
    Alert.alert(
      'Cancel Demo Request',
      `Are you sure you want to cancel the booking request for ${booking.service_name} with ${booking.practitioner_name}?`,
      [
        { text: 'Keep Booking', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              setCancellingId(booking.id);
              const res = await cancelBookingRequest(booking.id);
              // Update in state
              setBookings((prev) =>
                prev.map((b) => (b.id === booking.id ? res.booking : b))
              );
              Alert.alert('Booking Cancelled', res.message);
            } catch (err: any) {
              console.warn('Error cancelling booking:', err);
              Alert.alert('Error', 'Unable to cancel booking. Server may be unreachable.');
            } finally {
              setCancellingId(null);
            }
          },
        },
      ]
    );
  };

  const filteredBookings = useMemo(() => {
    switch (activeTab) {
      case 'pending':
        return bookings.filter((b) => b.status === 'pending');
      case 'upcoming':
        return bookings.filter((b) => b.status === 'confirmed');
      case 'past':
        return bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');
      case 'all':
      default:
        return bookings;
    }
  }, [bookings, activeTab]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Cultural Bookings</Text>
        <Text style={styles.subtitle}>
          Track temporary ceremony requests and schedules
        </Text>

        {/* Tab Selector */}
        <View style={styles.tabsRow}>
          <Pressable
            onPress={() => setActiveTab('all')}
            style={[styles.tabBtn, activeTab === 'all' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabBtnText, activeTab === 'all' && styles.tabBtnTextActive]}>
              All ({bookings.length})
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('pending')}
            style={[styles.tabBtn, activeTab === 'pending' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabBtnText, activeTab === 'pending' && styles.tabBtnTextActive]}>
              Pending ({bookings.filter((b) => b.status === 'pending').length})
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('upcoming')}
            style={[styles.tabBtn, activeTab === 'upcoming' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabBtnText, activeTab === 'upcoming' && styles.tabBtnTextActive]}>
              Confirmed ({bookings.filter((b) => b.status === 'confirmed').length})
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('past')}
            style={[styles.tabBtn, activeTab === 'past' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabBtnText, activeTab === 'past' && styles.tabBtnTextActive]}>
              Past / Cancelled
            </Text>
          </Pressable>
        </View>
      </View>

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
        {loading ? (
          <LoadingState message="Loading your cultural requests..." />
        ) : error ? (
          <ErrorState message={error} onRetry={loadBookings} />
        ) : filteredBookings.length === 0 ? (
          <EmptyState
            title="No bookings in this tab"
            message="You don't have any ceremony requests in this category yet. Explore services to request a ceremony."
            actionText="Explore Cultural Services"
            onAction={() => router.push('/(tabs)/search')}
          />
        ) : (
          filteredBookings.map((b) => (
            <View key={b.id} style={[styles.bookingCard, CommonStyles.cardShadow]}>
              {/* Card Header: Service name & status */}
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <Text style={styles.serviceName}>{b.service_name}</Text>
                  <Text style={styles.requestId}>{b.id}</Text>
                </View>
                <StatusBadge status={b.status} />
              </View>

              {/* Practitioner info */}
              <View style={styles.practitionerRow}>
                <View style={styles.avatarIconWrap}>
                  <User size={16} color={SanskritiColors.maroon} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.practitionerLabel}>Practitioner</Text>
                  <Text style={styles.practitionerName}>{b.practitioner_name}</Text>
                </View>
              </View>

              {/* Date & Time */}
              <View style={styles.detailRow}>
                <Calendar size={15} color={SanskritiColors.secondaryText} />
                <Text style={styles.detailText}>
                  {b.event_date} • {b.event_time}
                </Text>
              </View>

              {/* Location */}
              <View style={styles.detailRow}>
                <MapPin size={15} color={SanskritiColors.secondaryText} />
                <Text style={styles.detailText} numberOfLines={1}>
                  {b.location}
                </Text>
              </View>

              {/* Optional requirements */}
              {b.additional_requirements ? (
                <View style={styles.notesBox}>
                  <Text style={styles.notesLabel}>Notes:</Text>
                  <Text style={styles.notesText}>{b.additional_requirements}</Text>
                </View>
              ) : null}

              {/* Action row (Cancel if pending) */}
              <View style={styles.cardFooter}>
                <Text style={styles.demoPillText}>Prototype Demo Request</Text>

                {b.status === 'pending' && (
                  <Pressable
                    onPress={() => handleCancelBooking(b)}
                    disabled={cancellingId === b.id}
                    style={({ pressed }) => [
                      styles.cancelBookingBtn,
                      pressed && styles.pressed,
                    ]}
                  >
                    <XCircle size={14} color={SanskritiColors.redStatus} />
                    <Text style={styles.cancelBookingBtnText}>
                      {cancellingId === b.id ? 'Cancelling...' : 'Cancel Request'}
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          ))
        )}

        {/* Info Note */}
        <View style={styles.infoNote}>
          <Sparkles size={16} color={SanskritiColors.saffron} />
          <Text style={styles.infoNoteText}>
            Service requests update in-memory on the FastAPI server. You can create or cancel
            requests anytime during your demonstration.
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
  header: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.md,
    backgroundColor: SanskritiColors.cream,
    borderBottomWidth: 1,
    borderBottomColor: SanskritiColors.border,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: SanskritiColors.primaryText,
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 13,
    color: SanskritiColors.secondaryText,
    marginTop: 2,
    marginBottom: Spacing.md,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: Spacing.sm,
  },
  tabBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radii.button,
    backgroundColor: SanskritiColors.white,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
  },
  tabBtnActive: {
    backgroundColor: SanskritiColors.maroon,
    borderColor: SanskritiColors.maroon,
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: SanskritiColors.secondaryText,
  },
  tabBtnTextActive: {
    color: SanskritiColors.white,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  bookingCard: {
    backgroundColor: SanskritiColors.white,
    borderRadius: Radii.card,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
    marginBottom: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  cardHeaderLeft: {
    flex: 1,
  },
  serviceName: {
    fontSize: 17,
    fontWeight: '700',
    color: SanskritiColors.primaryText,
  },
  requestId: {
    fontSize: 12,
    color: SanskritiColors.mutedText,
    fontWeight: '600',
    marginTop: 2,
  },
  practitionerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: SanskritiColors.cream,
    padding: 10,
    borderRadius: Radii.input,
    marginBottom: Spacing.md,
  },
  avatarIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FAF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: SanskritiColors.border,
  },
  practitionerLabel: {
    fontSize: 10,
    color: SanskritiColors.mutedText,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  practitionerName: {
    fontSize: 14,
    fontWeight: '700',
    color: SanskritiColors.primaryText,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  detailText: {
    fontSize: 13,
    color: SanskritiColors.secondaryText,
  },
  notesBox: {
    backgroundColor: '#FAF5EE',
    padding: 8,
    borderRadius: Radii.button,
    marginTop: 6,
    marginBottom: 6,
  },
  notesLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: SanskritiColors.earthBrown,
  },
  notesText: {
    fontSize: 12,
    color: SanskritiColors.secondaryText,
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: SanskritiColors.border,
  },
  demoPillText: {
    fontSize: 11,
    color: SanskritiColors.mutedText,
    fontStyle: 'italic',
  },
  cancelBookingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.button,
    backgroundColor: '#FEE2E2',
  },
  cancelBookingBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: SanskritiColors.redStatus,
  },
  infoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FAF2E6',
    padding: Spacing.md,
    borderRadius: Radii.input,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
    marginTop: Spacing.md,
  },
  infoNoteText: {
    flex: 1,
    fontSize: 12,
    color: SanskritiColors.earthBrown,
    lineHeight: 17,
  },
  pressed: {
    opacity: 0.85,
  },
});
