import axios from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import {
  Booking,
  BookingCreatePayload,
  Practitioner,
  PractitionerSummary,
  Review,
  ServiceCategory,
} from '../types';

// Dynamic default backend URL resolver
const resolveDefaultBaseUrl = (): string => {
  // 1. Explicit environment variable
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // 2. Expo Go host IP (dynamically matches the computer running Metro)
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(':')[0];
    if (ip && ip !== 'localhost' && ip !== '127.0.0.1') {
      return `http://${ip}:8000`;
    }
  }

  // 3. Android Studio official emulator loopback
  if (Platform.OS === 'android' && !Device.isDevice) {
    return 'http://10.0.2.2:8000';
  }

  // 4. Default to local machine IP / localhost
  return 'http://192.168.101.6:8000';
};

export let API_BASE_URL = resolveDefaultBaseUrl();

// eslint-disable-next-line import/no-named-as-default-member
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const updateApiBaseUrl = (newUrl: string) => {
  API_BASE_URL = newUrl.replace(/\/$/, '');
  apiClient.defaults.baseURL = API_BASE_URL;
};

// -------------------------------------------------------------
// Fallback Mock Data for High-Reliability Offline Demonstrations
// -------------------------------------------------------------
const FALLBACK_SERVICES: ServiceCategory[] = [
  {
    id: 'srv-puja',
    name: 'Puja',
    icon_name: 'Flame',
    description: 'Daily family pujas, Satyanarayan, Rudri, Vastu Shanti, and house blessing Vedic rituals.',
    practitioner_count: 4,
    starting_price: 'NPR 2,500',
    featured_image: 'https://images.unsplash.com/photo-1609137144822-79946487e492?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'srv-bratabandha',
    name: 'Bratabandha',
    icon_name: 'Award',
    description: 'Sacred thread investiture ceremony (Upanayana/Bratabandha) conducted with traditional Vedic mantras.',
    practitioner_count: 3,
    starting_price: 'NPR 6,000',
    featured_image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'srv-wedding',
    name: 'Wedding Ceremony',
    icon_name: 'HeartHandshake',
    description: 'Complete traditional Vivaha Sanskar rites, Kanyadaan, Saptapadi, and sacred fire ceremonies.',
    practitioner_count: 3,
    starting_price: 'NPR 12,000',
    featured_image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'srv-buddhist',
    name: 'Buddhist Ceremony',
    icon_name: 'Compass',
    description: 'Monastic prayer chantings, Tsok offerings, memorial pujas, and home blessing consecrations.',
    practitioner_count: 2,
    starting_price: 'NPR 4,000',
    featured_image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'srv-performers',
    name: 'Traditional Performers',
    icon_name: 'Music',
    description: 'Authentic Panche Baja bands, Newari Dhime ensembles, and devotional Bhajan singers for festivities.',
    practitioner_count: 2,
    starting_price: 'NPR 8,000',
    featured_image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'srv-other',
    name: 'Other Cultural Services',
    icon_name: 'Sparkles',
    description: 'Kundali reading, Muhurat calculation, Name-giving (Nwaran), and Pitri Shraddha rituals.',
    practitioner_count: 4,
    starting_price: 'NPR 2,000',
    featured_image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
  },
];

const FALLBACK_PRACTITIONERS: Practitioner[] = [
  {
    id: 'prac-1',
    name: 'Pandit Ramesh Sharma',
    tradition: 'Hindu tradition',
    location: 'Kathmandu (Pashupati area)',
    years_of_experience: 18,
    services: ['Puja', 'Bratabandha', 'Other Cultural Services'],
    indicative_price: 'NPR 3,500 – 8,000',
    rating: 4.9,
    review_count: 42,
    demo_verified: true,
    availability: 'Available on weekdays and auspicious tithis (Booking recommended 2 days prior)',
    profile_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    cover_image: 'https://images.unsplash.com/photo-1609137144822-79946487e492?auto=format&fit=crop&w=1200&q=80',
    bio: 'Pandit Ramesh Sharma has been performing traditional Vedic rituals, Satyanarayan pujas, and Bratabandha ceremonies across Kathmandu Valley for over 18 years. Educated in classical Sanskrit scriptures, he is respected for his clear recitation and patient guidance.',
    reviews: [
      {
        id: 'rev-101',
        practitioner_id: 'prac-1',
        reviewer_name: 'Bikash Shrestha',
        reviewer_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        rating: 5.0,
        comment: 'Pandit Ji conducted our family Griha Pravesh with utter elegance and punctuality. He explained the spiritual significance of each mantra.',
        created_at: '2026-09-15T10:30:00',
        relative_time: '3 weeks ago',
        is_demo: true,
      },
    ],
  },
  {
    id: 'prac-2',
    name: 'Acharya Suman Adhikari',
    tradition: 'Hindu tradition',
    location: 'Lalitpur (Patan)',
    years_of_experience: 15,
    services: ['Wedding Ceremony', 'Bratabandha', 'Puja'],
    indicative_price: 'NPR 5,000 – 15,000',
    rating: 4.8,
    review_count: 38,
    demo_verified: true,
    availability: 'Available on weekends and auspicious Vivaha sahit dates',
    profile_image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    cover_image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    bio: 'Acharya Suman Adhikari specializes in elaborate Vedic marriage rites, Saptapadi ceremonies, and Yajnas. Known for solemnity and ceremonial dignity.',
    reviews: [],
  },
  {
    id: 'prac-3',
    name: 'Lama Tenzin Dorje',
    tradition: 'Buddhist tradition',
    location: 'Kathmandu (Boudha)',
    years_of_experience: 22,
    services: ['Buddhist Ceremony', 'Other Cultural Services'],
    indicative_price: 'NPR 4,000 – 10,000',
    rating: 4.95,
    review_count: 51,
    demo_verified: true,
    availability: 'Available Tuesday to Sunday (Advance appointment required)',
    profile_image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80',
    cover_image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80',
    bio: 'Lama Tenzin Dorje received monastic training in Himalayan Buddhist monasteries and has dedicated 22 years to serving spiritual communities.',
    reviews: [],
  },
  {
    id: 'prac-4',
    name: 'Pujari Anisha Joshi',
    tradition: 'Hindu tradition',
    location: 'Bhaktapur (Durbar Square)',
    years_of_experience: 10,
    services: ['Puja', 'Other Cultural Services'],
    indicative_price: 'NPR 2,500 – 6,000',
    rating: 4.75,
    review_count: 29,
    demo_verified: true,
    availability: 'Available 7 days a week for morning and dusk ceremonies',
    profile_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    cover_image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    bio: 'Pujari Anisha Joshi conducts Navaratri pujas, Lakshmi pujas, Kuldevata rituals, and festive celebrations with deep devotion.',
    reviews: [],
  },
  {
    id: 'prac-5',
    name: 'Karma Sherpa',
    tradition: 'Buddhist tradition',
    location: 'Kathmandu (Swayambhu)',
    years_of_experience: 14,
    services: ['Buddhist Ceremony', 'Traditional Performers'],
    indicative_price: 'NPR 3,500 – 9,000',
    rating: 4.85,
    review_count: 34,
    demo_verified: true,
    availability: 'Available on lunar calendar sacred dates and weekends',
    profile_image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=500&q=80',
    cover_image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    bio: 'Karma Sherpa leads traditional Buddhist ceremonial chantings, ritual cymbal accompaniments, and mountain cultural blessings.',
    reviews: [],
  },
  {
    id: 'prac-6',
    name: 'Nima Tamang',
    tradition: 'Indigenous cultural services',
    location: 'Lalitpur (Godawari)',
    years_of_experience: 12,
    services: ['Traditional Performers', 'Other Cultural Services'],
    indicative_price: 'NPR 3,000 – 7,500',
    rating: 4.8,
    review_count: 26,
    demo_verified: true,
    availability: 'Available Friday through Monday',
    profile_image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80',
    cover_image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    bio: 'Nima Tamang is an indigenous cultural practitioner safeguarding ancestral Tamang ritual ceremonies, Bon blessings, and Damphu music.',
    reviews: [],
  },
];

let localBookingsStore: Booking[] = [
  {
    id: 'REQ-2026-001',
    service_name: 'Puja',
    practitioner_id: 'prac-1',
    practitioner_name: 'Pandit Ramesh Sharma',
    event_date: '2026-10-25',
    event_time: 'Morning (08:30 AM)',
    location: 'Baluwatar, Kathmandu',
    additional_requirements: 'Satyanarayan Katha and Havan.',
    status: 'confirmed',
    created_at: '2026-10-08T11:20:00',
    is_demo: true,
  },
  {
    id: 'REQ-2026-002',
    service_name: 'Buddhist Ceremony',
    practitioner_id: 'prac-3',
    practitioner_name: 'Lama Tenzin Dorje',
    event_date: '2026-09-20',
    event_time: 'Morning (10:00 AM)',
    location: 'Boudha Stupa area, Kathmandu',
    additional_requirements: 'Rabney home blessing.',
    status: 'completed',
    created_at: '2026-09-10T09:15:00',
    is_demo: true,
  },
];

// Cultural Services Endpoints
export const fetchServices = async (): Promise<ServiceCategory[]> => {
  try {
    const response = await apiClient.get<ServiceCategory[]>('/api/services');
    return response.data;
  } catch {
    console.warn('Backend unavailable for services, using local fallback dataset');
    return FALLBACK_SERVICES;
  }
};

// Practitioners Endpoints
export interface FetchPractitionersParams {
  search?: string;
  tradition?: string;
  location?: string;
  min_rating?: number;
}

export const fetchPractitioners = async (params?: FetchPractitionersParams): Promise<PractitionerSummary[]> => {
  try {
    const response = await apiClient.get<PractitionerSummary[]>('/api/practitioners', { params });
    return response.data;
  } catch {
    console.warn('Backend unavailable for practitioners, using local filtered fallback dataset');
    let results: PractitionerSummary[] = FALLBACK_PRACTITIONERS;
    if (params?.search) {
      const q = params.search.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.services.some((s) => s.toLowerCase().includes(q)) ||
          p.location.toLowerCase().includes(q)
      );
    }
    if (params?.tradition && params.tradition !== 'All Traditions') {
      results = results.filter((p) => p.tradition.toLowerCase().includes(params.tradition!.toLowerCase()));
    }
    if (params?.location && params.location !== 'All Locations') {
      results = results.filter((p) => p.location.toLowerCase().includes(params.location!.toLowerCase()));
    }
    if (params?.min_rating) {
      results = results.filter((p) => p.rating >= params.min_rating!);
    }
    return results;
  }
};

export const fetchPractitionerById = async (id: string): Promise<Practitioner> => {
  try {
    const response = await apiClient.get<Practitioner>(`/api/practitioners/${encodeURIComponent(id)}`);
    return response.data;
  } catch (error) {
    const found = FALLBACK_PRACTITIONERS.find((p) => p.id === id);
    if (found) return found;
    throw error;
  }
};

// Reviews Endpoints
export const fetchPractitionerReviews = async (practitionerId: string): Promise<Review[]> => {
  try {
    const response = await apiClient.get<Review[]>(`/api/practitioners/${encodeURIComponent(practitionerId)}/reviews`);
    return response.data;
  } catch {
    const p = FALLBACK_PRACTITIONERS.find((item) => item.id === practitionerId);
    return p?.reviews || [];
  }
};

export interface CreateReviewPayload {
  reviewer_name: string;
  rating: number;
  comment: string;
}

export const submitPractitionerReview = async (
  practitionerId: string,
  payload: CreateReviewPayload
): Promise<Review> => {
  try {
    const response = await apiClient.post<Review>(
      `/api/practitioners/${encodeURIComponent(practitionerId)}/reviews`,
      payload
    );
    return response.data;
  } catch {
    // Local fallback update
    const newRev: Review = {
      id: `rev-local-${Date.now()}`,
      practitioner_id: practitionerId,
      reviewer_name: payload.reviewer_name,
      rating: payload.rating,
      comment: payload.comment,
      created_at: new Date().toISOString(),
      relative_time: 'Just now',
      is_demo: true,
    };
    return newRev;
  }
};

// Bookings Endpoints
export const fetchBookings = async (): Promise<Booking[]> => {
  try {
    const response = await apiClient.get<Booking[]>('/api/bookings');
    return response.data;
  } catch {
    console.warn('Backend unavailable for bookings, using local in-memory bookings');
    return localBookingsStore;
  }
};

export const fetchBookingById = async (id: string): Promise<Booking> => {
  try {
    const response = await apiClient.get<Booking>(`/api/bookings/${encodeURIComponent(id)}`);
    return response.data;
  } catch (error) {
    const found = localBookingsStore.find((b) => b.id === id);
    if (found) return found;
    throw error;
  }
};

export const createBookingRequest = async (payload: BookingCreatePayload): Promise<Booking> => {
  try {
    const response = await apiClient.post<Booking>('/api/bookings', payload);
    localBookingsStore.unshift(response.data);
    return response.data;
  } catch {
    const practitioner = FALLBACK_PRACTITIONERS.find((p) => p.id === payload.practitioner_id);
    const newBooking: Booking = {
      id: `REQ-2026-${localBookingsStore.length + 80}`,
      service_name: payload.service_name,
      practitioner_id: payload.practitioner_id,
      practitioner_name: practitioner?.name || 'Cultural Practitioner',
      event_date: payload.event_date,
      event_time: payload.event_time || 'Morning (09:00 AM)',
      location: payload.location,
      additional_requirements: payload.additional_requirements,
      status: 'pending',
      created_at: new Date().toISOString(),
      is_demo: true,
    };
    localBookingsStore.unshift(newBooking);
    return newBooking;
  }
};

export const cancelBookingRequest = async (bookingId: string): Promise<{ message: string; booking: Booking }> => {
  try {
    const response = await apiClient.patch<{ message: string; booking: Booking }>(
      `/api/bookings/${encodeURIComponent(bookingId)}/cancel`
    );
    return response.data;
  } catch (error) {
    const b = localBookingsStore.find((item) => item.id === bookingId);
    if (b) {
      b.status = 'cancelled';
      return { message: `Demo booking ${bookingId} has been cancelled.`, booking: b };
    }
    throw error;
  }
};

// Health Check
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const res = await apiClient.get('/health', { timeout: 3000 });
    return res.status === 200;
  } catch {
    return false;
  }
};
