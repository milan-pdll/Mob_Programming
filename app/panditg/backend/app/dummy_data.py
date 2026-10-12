"""
Centralized in-memory dummy data store for Sanskriti Cultural Services API.
All data is stored in memory and resets when the backend server restarts.
All practitioners, reviews, and bookings are strictly fictional for demonstration purposes.
"""

from typing import List, Dict, Any
from datetime import datetime
import uuid

# Initial Service Categories
INITIAL_SERVICES: List[Dict[str, Any]] = [
    {
        "id": "srv-puja",
        "name": "Puja",
        "icon_name": "Flame",
        "description": "Daily family pujas, Satyanarayan, Rudri, Vastu Shanti, and house blessing Vedic rituals.",
        "practitioner_count": 4,
        "starting_price": "NPR 2,500",
        "featured_image": "https://images.unsplash.com/photo-1609137144822-79946487e492?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "srv-bratabandha",
        "name": "Bratabandha",
        "icon_name": "Award",
        "description": "Sacred thread investiture ceremony (Upanayana/Bratabandha) conducted with traditional Vedic mantras.",
        "practitioner_count": 3,
        "starting_price": "NPR 6,000",
        "featured_image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "srv-wedding",
        "name": "Wedding Ceremony",
        "icon_name": "HeartHandshake",
        "description": "Complete traditional Vivaha Sanskar rites, Kanyadaan, Saptapadi, and sacred fire ceremonies.",
        "practitioner_count": 3,
        "starting_price": "NPR 12,000",
        "featured_image": "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "srv-buddhist",
        "name": "Buddhist Ceremony",
        "icon_name": "Compass",
        "description": "Monastic prayer chantings, Tsok offerings, memorial pujas, and home blessing consecrations.",
        "practitioner_count": 2,
        "starting_price": "NPR 4,000",
        "featured_image": "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "srv-performers",
        "name": "Traditional Performers",
        "icon_name": "Music",
        "description": "Authentic Panche Baja bands, Newari Dhime ensembles, and devotional Bhajan singers for festivities.",
        "practitioner_count": 2,
        "starting_price": "NPR 8,000",
        "featured_image": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "srv-other",
        "name": "Other Cultural Services",
        "icon_name": "Sparkles",
        "description": "Kundali (birth chart) reading, Muhurat calculation, Name-giving (Nwaran), and Pitri Shraddha rituals.",
        "practitioner_count": 4,
        "starting_price": "NPR 2,000",
        "featured_image": "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80"
    }
]

# Initial Practitioners
INITIAL_PRACTITIONERS: List[Dict[str, Any]] = [
    {
        "id": "prac-1",
        "name": "Pandit Ramesh Sharma",
        "tradition": "Hindu tradition",
        "location": "Kathmandu (Pashupati area)",
        "years_of_experience": 18,
        "services": ["Puja", "Bratabandha", "Other Cultural Services"],
        "indicative_price": "NPR 3,500 – 8,000",
        "rating": 4.9,
        "review_count": 42,
        "demo_verified": True,
        "availability": "Available on weekdays and auspicious tithis (Booking recommended 2 days prior)",
        "profile_image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
        "cover_image": "https://images.unsplash.com/photo-1609137144822-79946487e492?auto=format&fit=crop&w=1200&q=80",
        "bio": "Pandit Ramesh Sharma has been performing traditional Vedic rituals, Satyanarayan pujas, and Bratabandha ceremonies across Kathmandu Valley for over 18 years. Educated in Varanasi in classical Sanskrit scriptures, he is respected for his clear recitation, patient explanations of rituals, and devotion to cultural preservation.",
        "reviews": [
            {
                "id": "rev-101",
                "practitioner_id": "prac-1",
                "reviewer_name": "Bikash Shrestha",
                "reviewer_avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
                "rating": 5.0,
                "comment": "Pandit Ji conducted our family Griha Pravesh with utter elegance and punctuality. He explained the spiritual significance of each mantra to our children.",
                "created_at": "2026-09-15T10:30:00",
                "relative_time": "3 weeks ago",
                "is_demo": True
            },
            {
                "id": "rev-102",
                "practitioner_id": "prac-1",
                "reviewer_name": "Sushila Karki",
                "reviewer_avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
                "rating": 4.8,
                "comment": "Very peaceful demeanor and well-prepared with samagri lists beforehand. Highly recommended for bratabandha rituals.",
                "created_at": "2026-09-28T14:15:00",
                "relative_time": "1 week ago",
                "is_demo": True
            }
        ]
    },
    {
        "id": "prac-2",
        "name": "Acharya Suman Adhikari",
        "tradition": "Hindu tradition",
        "location": "Lalitpur (Patan)",
        "years_of_experience": 15,
        "services": ["Wedding Ceremony", "Bratabandha", "Puja"],
        "indicative_price": "NPR 5,000 – 15,000",
        "rating": 4.8,
        "review_count": 38,
        "demo_verified": True,
        "availability": "Available on weekends and auspicious Vivaha sahit dates",
        "profile_image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
        "cover_image": "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
        "bio": "Acharya Suman Adhikari specializes in elaborate Vedic marriage rites, Saptapadi ceremonies, and Yajnas. Known for solemnity and ceremonial dignity, he assists families in organizing auspicious rituals tailored to regional customs while honoring authentic Vedic tenets.",
        "reviews": [
            {
                "id": "rev-201",
                "practitioner_id": "prac-2",
                "reviewer_name": "Pradeep Rijal",
                "reviewer_avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
                "rating": 5.0,
                "comment": "Acharya Ji officiated our wedding mandap ceremony flawlessly. Everyone was impressed by how beautifully he conducted the Saptapadi vows.",
                "created_at": "2026-08-10T11:00:00",
                "relative_time": "2 months ago",
                "is_demo": True
            }
        ]
    },
    {
        "id": "prac-3",
        "name": "Lama Tenzin Dorje",
        "tradition": "Buddhist tradition",
        "location": "Kathmandu (Boudha)",
        "years_of_experience": 22,
        "services": ["Buddhist Ceremony", "Other Cultural Services"],
        "indicative_price": "NPR 4,000 – 10,000",
        "rating": 4.95,
        "review_count": 51,
        "demo_verified": True,
        "availability": "Available Tuesday to Sunday (Advance appointment required)",
        "profile_image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
        "cover_image": "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80",
        "bio": "Lama Tenzin Dorje received monastic training in Himalayan Buddhist monasteries and has dedicated 22 years to serving spiritual communities. He conducts house blessings (Rabney), Tara pujas, prayer chantings for wellbeing, and mindfulness blessing sessions.",
        "reviews": [
            {
                "id": "rev-301",
                "practitioner_id": "prac-3",
                "reviewer_name": "Doma Lama",
                "reviewer_avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
                "rating": 5.0,
                "comment": "The chanting brought an overwhelming sense of tranquility and joy to our home blessing ceremony in Boudha. Highly venerable Lama.",
                "created_at": "2026-09-02T16:20:00",
                "relative_time": "1 month ago",
                "is_demo": True
            }
        ]
    },
    {
        "id": "prac-4",
        "name": "Pujari Anisha Joshi",
        "tradition": "Hindu tradition",
        "location": "Bhaktapur (Durbar Square)",
        "years_of_experience": 10,
        "services": ["Puja", "Other Cultural Services"],
        "indicative_price": "NPR 2,500 – 6,000",
        "rating": 4.75,
        "review_count": 29,
        "demo_verified": True,
        "availability": "Available 7 days a week for morning and dusk ceremonies",
        "profile_image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
        "cover_image": "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
        "bio": "Pujari Anisha Joshi comes from a family line of dedicated temple practitioners in historic Bhaktapur. She conducts Navaratri pujas, Lakshmi pujas, Kuldevata rituals, and festive community celebrations with deep artistic sensitivity and devotion.",
        "reviews": [
            {
                "id": "rev-401",
                "practitioner_id": "prac-4",
                "reviewer_name": "Manish Prajapati",
                "reviewer_avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80",
                "rating": 5.0,
                "comment": "Anisha did our family Tihar and Lakshmi Puja with utmost respect for Newari traditions and rituals. Wonderful experience.",
                "created_at": "2026-08-25T18:00:00",
                "relative_time": "1 month ago",
                "is_demo": True
            }
        ]
    },
    {
        "id": "prac-5",
        "name": "Karma Sherpa",
        "tradition": "Buddhist tradition",
        "location": "Kathmandu (Swayambhu)",
        "years_of_experience": 14,
        "services": ["Buddhist Ceremony", "Traditional Performers"],
        "indicative_price": "NPR 3,500 – 9,000",
        "rating": 4.85,
        "review_count": 34,
        "demo_verified": True,
        "availability": "Available on lunar calendar sacred dates and weekends",
        "profile_image": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=500&q=80",
        "cover_image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
        "bio": "Karma Sherpa leads traditional Buddhist ceremonial chantings, ritual cymbal and horn accompaniments, and mountain cultural blessings. He provides guidance on auspicious astrological alignments according to the Tibetan Phugpa calendar.",
        "reviews": [
            {
                "id": "rev-501",
                "practitioner_id": "prac-5",
                "reviewer_name": "Pasang Sherpa",
                "reviewer_avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
                "rating": 5.0,
                "comment": "Deeply resonant chanting and very humble attitude. Guided our family through the memorial rituals with great care.",
                "created_at": "2026-07-19T09:40:00",
                "relative_time": "2 months ago",
                "is_demo": True
            }
        ]
    },
    {
        "id": "prac-6",
        "name": "Nima Tamang",
        "tradition": "Indigenous cultural services",
        "location": "Lalitpur (Godawari)",
        "years_of_experience": 12,
        "services": ["Traditional Performers", "Other Cultural Services"],
        "indicative_price": "NPR 3,000 – 7,500",
        "rating": 4.8,
        "review_count": 26,
        "demo_verified": True,
        "availability": "Available Friday through Monday",
        "profile_image": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80",
        "cover_image": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
        "bio": "Nima Tamang is an indigenous cultural practitioner safeguarding ancestral Tamang ritual ceremonies, Bon blessings, Damphu music, and life-cycle rituals in the Kathmandu Valley rims. He is passionate about preserving traditional songs and living folklore.",
        "reviews": [
            {
                "id": "rev-601",
                "practitioner_id": "prac-6",
                "reviewer_name": "Sabin Tamang",
                "reviewer_avatar": "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=120&q=80",
                "rating": 5.0,
                "comment": "Authentic Damphu rhythms and sincere ancestral songs. Created an indelible cultural memory for our festival gathering.",
                "created_at": "2026-06-12T15:00:00",
                "relative_time": "3 months ago",
                "is_demo": True
            }
        ]
    }
]

# Initial Demo Bookings (in-memory)
INITIAL_BOOKINGS: List[Dict[str, Any]] = [
    {
        "id": "REQ-2026-001",
        "service_name": "Puja",
        "practitioner_id": "prac-1",
        "practitioner_name": "Pandit Ramesh Sharma",
        "event_date": "2026-10-25",
        "event_time": "Morning (08:30 AM)",
        "location": "Baluwatar, Kathmandu",
        "additional_requirements": "Satyanarayan Katha and Havan. Please advise on list of dry fruits and ghee needed.",
        "status": "confirmed",
        "created_at": "2026-10-08T11:20:00",
        "is_demo": True
    },
    {
        "id": "REQ-2026-002",
        "service_name": "Buddhist Ceremony",
        "practitioner_id": "prac-3",
        "practitioner_name": "Lama Tenzin Dorje",
        "event_date": "2026-09-20",
        "event_time": "Morning (10:00 AM)",
        "location": "Boudha Stupa area, Kathmandu",
        "additional_requirements": "Rabney (house cleansing) blessing.",
        "status": "completed",
        "created_at": "2026-09-10T09:15:00",
        "is_demo": True
    }
]

# Runtime in-memory state containers
services_db: List[Dict[str, Any]] = [dict(s) for s in INITIAL_SERVICES]
practitioners_db: List[Dict[str, Any]] = [dict(p) for p in INITIAL_PRACTITIONERS]
bookings_db: List[Dict[str, Any]] = [dict(b) for b in INITIAL_BOOKINGS]

def get_services() -> List[Dict[str, Any]]:
    return services_db

def get_practitioners(
    search: str = None,
    tradition: str = None,
    location: str = None,
    min_rating: float = None
) -> List[Dict[str, Any]]:
    results = practitioners_db
    if search:
        s_lower = search.lower().strip()
        results = [
            p for p in results
            if s_lower in p["name"].lower()
            or any(s_lower in s.lower() for s in p["services"])
            or s_lower in p["tradition"].lower()
            or s_lower in p["location"].lower()
        ]
    if tradition and tradition != "All Traditions":
        results = [p for p in results if tradition.lower() in p["tradition"].lower()]
    if location and location != "All Locations":
        results = [p for p in results if location.lower() in p["location"].lower()]
    if min_rating is not None and min_rating > 0:
        results = [p for p in results if p["rating"] >= min_rating]
    return results

def get_practitioner_by_id(practitioner_id: str) -> Dict[str, Any] | None:
    for p in practitioners_db:
        if p["id"] == practitioner_id:
            return p
    return None

def add_review(practitioner_id: str, review_data: Dict[str, Any]) -> Dict[str, Any] | None:
    p = get_practitioner_by_id(practitioner_id)
    if not p:
        return None
    new_rev = {
        "id": f"rev-{uuid.uuid4().hex[:6]}",
        "practitioner_id": practitioner_id,
        "reviewer_name": review_data["reviewer_name"],
        "reviewer_avatar": review_data.get("reviewer_avatar") or "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
        "rating": float(review_data["rating"]),
        "comment": review_data["comment"],
        "created_at": datetime.now().isoformat(),
        "relative_time": "Just now",
        "is_demo": True
    }
    p["reviews"].insert(0, new_rev)
    # Recalculate average rating and count
    total_rating = sum(r["rating"] for r in p["reviews"])
    p["review_count"] = len(p["reviews"])
    p["rating"] = round(total_rating / p["review_count"], 2)
    return new_rev

def get_bookings() -> List[Dict[str, Any]]:
    return bookings_db

def get_booking_by_id(booking_id: str) -> Dict[str, Any] | None:
    for b in bookings_db:
        if b["id"] == booking_id:
            return b
    return None

def create_booking(booking_in: Dict[str, Any]) -> Dict[str, Any]:
    practitioner = get_practitioner_by_id(booking_in["practitioner_id"])
    practitioner_name = practitioner["name"] if practitioner else "Fictional Practitioner"
    
    booking_id = f"REQ-2026-{len(bookings_db) + 80:03d}"
    new_booking = {
        "id": booking_id,
        "service_name": booking_in["service_name"],
        "practitioner_id": booking_in["practitioner_id"],
        "practitioner_name": practitioner_name,
        "event_date": booking_in["event_date"],
        "event_time": booking_in.get("event_time") or "Morning (09:00 AM)",
        "location": booking_in["location"],
        "additional_requirements": booking_in.get("additional_requirements"),
        "status": "pending",
        "created_at": datetime.now().isoformat(),
        "is_demo": True
    }
    bookings_db.insert(0, new_booking)
    return new_booking

def cancel_booking(booking_id: str) -> Dict[str, Any] | None:
    b = get_booking_by_id(booking_id)
    if not b:
        return None
    b["status"] = "cancelled"
    return b
