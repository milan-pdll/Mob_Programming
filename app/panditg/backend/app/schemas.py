from typing import List, Optional
from pydantic import BaseModel, Field

# Review Schemas
class ReviewBase(BaseModel):
    reviewer_name: str = Field(..., min_length=2, max_length=100)
    rating: float = Field(..., ge=1.0, le=5.0)
    comment: str = Field(..., min_length=5, max_length=1000)

class ReviewCreate(ReviewBase):
    pass

class Review(ReviewBase):
    id: str
    practitioner_id: str
    created_at: str
    relative_time: str
    reviewer_avatar: Optional[str] = None
    is_demo: bool = True

# Service Category Schemas
class ServiceCategory(BaseModel):
    id: str
    name: str
    icon_name: str
    description: str
    practitioner_count: int = 0
    starting_price: str
    featured_image: Optional[str] = None

# Practitioner Schemas
class PractitionerBase(BaseModel):
    name: str
    tradition: str
    location: str
    bio: str
    years_of_experience: int
    services: List[str]
    indicative_price: str
    availability: str

class Practitioner(PractitionerBase):
    id: str
    profile_image: str
    cover_image: str
    rating: float
    review_count: int
    demo_verified: bool = True
    reviews: List[Review] = []

class PractitionerSummary(BaseModel):
    id: str
    name: str
    tradition: str
    location: str
    years_of_experience: int
    services: List[str]
    indicative_price: str
    rating: float
    review_count: int
    demo_verified: bool = True
    profile_image: str

# Booking Request Schemas
class BookingCreate(BaseModel):
    service_name: str = Field(..., min_length=2)
    practitioner_id: str = Field(..., min_length=1)
    event_date: str = Field(..., min_length=4)
    event_time: Optional[str] = "Morning (09:00 AM)"
    location: str = Field(..., min_length=3)
    additional_requirements: Optional[str] = None

class Booking(BaseModel):
    id: str
    service_name: str
    practitioner_id: str
    practitioner_name: str
    event_date: str
    event_time: str
    location: str
    additional_requirements: Optional[str] = None
    status: str = "pending"  # pending, confirmed, completed, cancelled
    created_at: str
    is_demo: bool = True

class CancelBookingResponse(BaseModel):
    message: str
    booking: Booking

class HealthResponse(BaseModel):
    status: str
    app: str
    version: str
    is_demo: bool
