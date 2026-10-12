import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldAlert,
} from 'lucide-react-native';
import { SanskritiColors, Radii, Spacing, CommonStyles } from '../constants/theme';
import { createBookingRequest, fetchPractitioners } from '../services/api';
import { PractitionerSummary, Booking } from '../types';

const POPULAR_SERVICES = [
  'Puja',
  'Bratabandha',
  'Wedding Ceremony',
  'Buddhist Ceremony',
  'Traditional Performers',
  'Other Cultural Services',
];

const TIME_SLOTS = [
  'Morning (07:00 AM – 11:00 AM)',
  'Afternoon (12:00 PM – 03:00 PM)',
  'Evening / Sandhya (04:00 PM – 07:00 PM)',
];

export default function RequestServiceScreen() {
  const params = useLocalSearchParams<{
    practitionerId?: string;
    practitionerName?: string;
    initialService?: string;
  }>();

  const [practitioners, setPractitioners] = useState<PractitionerSummary[]>([]);
  const [selectedPractitionerId, setSelectedPractitionerId] = useState(
    params.practitionerId || ''
  );
  const [selectedService, setSelectedService] = useState(params.initialService || 'Puja');
  const [eventDate, setEventDate] = useState('2026-11-15');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[0]);
  const [location, setLocation] = useState('Kathmandu Valley (e.g. Baluwatar)');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    fetchPractitioners()
      .then((data) => {
        setPractitioners(data);
        if (!selectedPractitionerId && data.length > 0) {
          setSelectedPractitionerId(data[0].id);
        }
      })
      .catch((err) => console.warn('Could not fetch practitioners for dropdown:', err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    // Validation
    if (!selectedService.trim()) {
      Alert.alert('Validation Error', 'Please select a cultural ceremony or service.');
      return;
    }
    if (!selectedPractitionerId) {
      Alert.alert('Validation Error', 'Please choose a cultural practitioner.');
      return;
    }
    if (!eventDate.trim()) {
      Alert.alert('Validation Error', 'Please specify a preferred date for the ceremony.');
      return;
    }
    if (!location.trim()) {
      Alert.alert('Validation Error', 'Please specify the event location.');
      return;
    }

    try {
      setSubmitting(true);
      const newBooking = await createBookingRequest({
        service_name: selectedService,
        practitioner_id: selectedPractitionerId,
        event_date: eventDate.trim(),
        event_time: selectedTimeSlot,
        location: location.trim(),
        additional_requirements: additionalNotes.trim() || undefined,
      });

      setConfirmedBooking(newBooking);
      setShowSuccessModal(true);
    } catch (err: any) {
      console.warn('Booking error:', err);
      Alert.alert(
        'Submission Failed',
        'Could not submit the booking request to the FastAPI backend. Check that the server is reachable.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleFinish = () => {
    setShowSuccessModal(false);
    router.replace('/(tabs)/bookings');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
        >
          <ArrowLeft size={20} color={SanskritiColors.primaryText} />
        </Pressable>
        <Text style={styles.topHeaderTitle}>Request Cultural Service</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Cultural Banner Notice */}
        <View style={styles.bannerNotice}>
          <Sparkles size={18} color={SanskritiColors.saffron} />
          <Text style={styles.bannerNoticeText}>
            Fill out the ceremony details below. Your request will be recorded temporarily in
            memory on the backend.
          </Text>
        </View>

        {/* 1. Select Cultural Ceremony */}
        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>1. Select Ceremony / Service *</Text>
          <View style={styles.chipsWrap}>
            {POPULAR_SERVICES.map((svc) => {
              const isSelected = selectedService === svc;
              return (
                <Pressable
                  key={svc}
                  onPress={() => setSelectedService(svc)}
                  style={[styles.serviceChip, isSelected && styles.serviceChipSelected]}
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
          </View>
        </View>

        {/* 2. Select Practitioner */}
        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>2. Select Cultural Practitioner *</Text>
          <View style={styles.practitionersList}>
            {practitioners.map((p) => {
              const isSelected = selectedPractitionerId === p.id;
              return (
                <Pressable
                  key={p.id}
                  onPress={() => setSelectedPractitionerId(p.id)}
                  style={[styles.practitionerOption, isSelected && styles.practitionerSelected]}
                >
                  <View style={styles.practitionerRadio}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                  <View style={styles.practitionerInfo}>
                    <Text style={styles.practitionerNameText}>{p.name}</Text>
                    <Text style={styles.practitionerTraditionText}>
                      {p.tradition} • {p.indicative_price}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* 3. Preferred Date */}
        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>3. Preferred Event Date (YYYY-MM-DD) *</Text>
          <View style={styles.inputWithIcon}>
            <Calendar size={18} color={SanskritiColors.earthBrown} />
            <TextInput
              style={styles.textInput}
              value={eventDate}
              onChangeText={setEventDate}
              placeholder="e.g. 2026-11-20"
              placeholderTextColor={SanskritiColors.mutedText}
            />
          </View>
        </View>

        {/* Preferred Time Slot */}
        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>Preferred Ceremony Time Slot</Text>
          {TIME_SLOTS.map((slot) => {
            const isSelected = selectedTimeSlot === slot;
            return (
              <Pressable
                key={slot}
                onPress={() => setSelectedTimeSlot(slot)}
                style={[styles.slotItem, isSelected && styles.slotItemSelected]}
              >
                <Clock
                  size={15}
                  color={isSelected ? SanskritiColors.maroon : SanskritiColors.mutedText}
                />
                <Text style={[styles.slotText, isSelected && styles.slotTextSelected]}>
                  {slot}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* 4. Event Location */}
        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>4. Ceremony Location / Address *</Text>
          <View style={styles.inputWithIcon}>
            <MapPin size={18} color={SanskritiColors.maroon} />
            <TextInput
              style={styles.textInput}
              value={location}
              onChangeText={setLocation}
              placeholder="e.g. Sanepa, Lalitpur (Near Ekantakuna)"
              placeholderTextColor={SanskritiColors.mutedText}
            />
          </View>
        </View>

        {/* 5. Additional Notes */}
        <View style={styles.formGroup}>
          <Text style={styles.fieldLabel}>5. Additional Ritual Requirements (Optional)</Text>
          <View style={[styles.inputWithIcon, styles.textAreaWrap]}>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={additionalNotes}
              onChangeText={setAdditionalNotes}
              placeholder="Mention samagri queries, family Gotra, or specific ceremonial requests..."
              placeholderTextColor={SanskritiColors.mutedText}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Demo Disclaimer */}
        <View style={styles.disclaimerBox}>
          <ShieldAlert size={16} color={SanskritiColors.earthBrown} />
          <Text style={styles.disclaimerText}>
            Prototype Demo Notice: Submitting this form creates a simulated service request in
            FastAPI memory. No payment or real binding booking is processed.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.cancelBtn, pressed && styles.pressed]}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </Pressable>

          <Pressable
            onPress={handleSubmit}
            disabled={submitting}
            style={({ pressed }) => [styles.submitBtn, pressed && styles.pressed]}
          >
            {submitting ? (
              <ActivityIndicator size="small" color={SanskritiColors.white} />
            ) : (
              <Text style={styles.submitBtnText}>Submit Demo Request</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>

      {/* Success Confirmation Modal */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, CommonStyles.modalShadow]}>
            <View style={styles.successIconCircle}>
              <CheckCircle2 size={44} color={SanskritiColors.deepGreen} />
            </View>

            <Text style={styles.modalHeading}>Request Received!</Text>
            <Text style={styles.modalSub}>
              Your cultural ceremony request has been submitted to the Sanskriti demo backend.
            </Text>

            {confirmedBooking && (
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Request ID</Text>
                  <Text style={styles.summaryValueBold}>{confirmedBooking.id}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Ceremony</Text>
                  <Text style={styles.summaryValue}>{confirmedBooking.service_name}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Practitioner</Text>
                  <Text style={styles.summaryValue}>{confirmedBooking.practitioner_name}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Event Date</Text>
                  <Text style={styles.summaryValue}>{confirmedBooking.event_date}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Status</Text>
                  <Text style={[styles.summaryValue, { color: SanskritiColors.saffron, fontWeight: '700' }]}>
                    Pending Approval
                  </Text>
                </View>
              </View>
            )}

            <Pressable
              onPress={handleFinish}
              style={({ pressed }) => [styles.confirmBtn, pressed && styles.pressed]}
            >
              <Text style={styles.confirmBtnText}>View in Bookings</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SanskritiColors.cream,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: SanskritiColors.border,
    backgroundColor: SanskritiColors.cream,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SanskritiColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: SanskritiColors.border,
  },
  topHeaderTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: SanskritiColors.primaryText,
    fontFamily: 'serif',
  },
  scrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  bannerNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FDF6E9',
    padding: Spacing.md,
    borderRadius: Radii.card,
    borderWidth: 1,
    borderColor: '#F8E5C4',
    marginBottom: Spacing.lg,
  },
  bannerNoticeText: {
    flex: 1,
    fontSize: 12,
    color: SanskritiColors.earthBrown,
    lineHeight: 17,
  },
  formGroup: {
    marginBottom: Spacing.lg,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: SanskritiColors.primaryText,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radii.button,
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
  practitionersList: {
    backgroundColor: SanskritiColors.white,
    borderRadius: Radii.card,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
    overflow: 'hidden',
  },
  practitionerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: SanskritiColors.border,
    gap: 12,
  },
  practitionerSelected: {
    backgroundColor: '#FAF1E8',
  },
  practitionerRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: SanskritiColors.maroon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: SanskritiColors.maroon,
  },
  practitionerInfo: {
    flex: 1,
  },
  practitionerNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: SanskritiColors.primaryText,
  },
  practitionerTraditionText: {
    fontSize: 12,
    color: SanskritiColors.secondaryText,
    marginTop: 2,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SanskritiColors.white,
    borderRadius: Radii.input,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
    paddingHorizontal: 12,
    height: 48,
    gap: 10,
  },
  textAreaWrap: {
    height: 90,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: SanskritiColors.primaryText,
  },
  textArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  slotItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SanskritiColors.white,
    padding: 12,
    borderRadius: Radii.button,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
    gap: 8,
    marginBottom: 6,
  },
  slotItemSelected: {
    borderColor: SanskritiColors.maroon,
    backgroundColor: '#FAF1E8',
  },
  slotText: {
    fontSize: 13,
    color: SanskritiColors.secondaryText,
  },
  slotTextSelected: {
    color: SanskritiColors.maroon,
    fontWeight: '700',
  },
  disclaimerBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#F9EFE6',
    padding: Spacing.md,
    borderRadius: Radii.button,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
    marginBottom: Spacing.xl,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    color: SanskritiColors.earthBrown,
    lineHeight: 16,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: Radii.button,
    backgroundColor: SanskritiColors.white,
    borderWidth: 1.5,
    borderColor: SanskritiColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: SanskritiColors.secondaryText,
  },
  submitBtn: {
    flex: 2,
    paddingVertical: 13,
    borderRadius: Radii.button,
    backgroundColor: SanskritiColors.maroon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: SanskritiColors.white,
  },
  pressed: {
    opacity: 0.85,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    padding: Spacing.screenPadding,
  },
  modalCard: {
    backgroundColor: SanskritiColors.white,
    borderRadius: Radii.card,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  successIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  modalHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: SanskritiColors.primaryText,
    fontFamily: 'serif',
    marginBottom: 6,
  },
  modalSub: {
    fontSize: 13,
    color: SanskritiColors.secondaryText,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: SanskritiColors.cream,
    borderRadius: Radii.input,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: SanskritiColors.border,
    marginBottom: Spacing.xl,
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: SanskritiColors.mutedText,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: SanskritiColors.primaryText,
  },
  summaryValueBold: {
    fontSize: 14,
    fontWeight: '800',
    color: SanskritiColors.maroon,
  },
  confirmBtn: {
    backgroundColor: SanskritiColors.maroon,
    width: '100%',
    paddingVertical: 13,
    borderRadius: Radii.button,
    alignItems: 'center',
  },
  confirmBtnText: {
    color: SanskritiColors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
