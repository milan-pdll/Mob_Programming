export interface Review {
  id: string;
  practitioner_id: string;
  reviewer_name: string;
  reviewer_avatar?: string;
  rating: number;
  comment: string;
  created_at: string;
  relative_time: string;
  is_demo?: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon_name: string;
  description: string;
  practitioner_count: number;
  starting_price: string;
  featured_image?: string;
}

export interface PractitionerSummary {
  id: string;
  name: string;
  tradition: string;
  location: string;
  years_of_experience: number;
  services: string[];
  indicative_price: string;
  rating: number;
  review_count: number;
  demo_verified: boolean;
  profile_image: string;
}

export interface Practitioner extends PractitionerSummary {
  cover_image: string;
  bio: string;
  availability: string;
  reviews: Review[];
}

export interface Booking {
  id: string;
  service_name: string;
  practitioner_id: string;
  practitioner_name: string;
  event_date: string;
  event_time: string;
  location: string;
  additional_requirements?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  is_demo: boolean;
}

export interface BookingCreatePayload {
  service_name: string;
  practitioner_id: string;
  event_date: string;
  event_time?: string;
  location: string;
  additional_requirements?: string;
}
