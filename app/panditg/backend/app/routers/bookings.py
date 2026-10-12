from typing import List
from fastapi import APIRouter, HTTPException, status
from app.schemas import Booking, BookingCreate, CancelBookingResponse
from app.dummy_data import get_bookings, get_booking_by_id, create_booking, cancel_booking, get_practitioner_by_id

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])

@router.get("", response_model=List[Booking])
def read_bookings():
    """Retrieve all demo service requests / bookings."""
    return get_bookings()

@router.get("/{booking_id}", response_model=Booking)
def read_booking(booking_id: str):
    """Retrieve a specific booking by ID."""
    booking = get_booking_by_id(booking_id)
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking with ID '{booking_id}' not found."
        )
    return booking

@router.post("", response_model=Booking, status_code=status.HTTP_201_CREATED)
def submit_booking(booking_in: BookingCreate):
    """Validate and submit a demo cultural service booking request."""
    # Verify practitioner exists
    practitioner = get_practitioner_by_id(booking_in.practitioner_id)
    if not practitioner:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Practitioner with ID '{booking_in.practitioner_id}' does not exist."
        )
    
    new_booking = create_booking(booking_in.model_dump())
    return new_booking

@router.patch("/{booking_id}/cancel", response_model=CancelBookingResponse)
def cancel_demo_booking(booking_id: str):
    """Cancel an eligible demo service request."""
    booking = get_booking_by_id(booking_id)
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking with ID '{booking_id}' not found."
        )
    
    if booking["status"] == "cancelled":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This booking request is already cancelled."
        )
    
    updated = cancel_booking(booking_id)
    return {
        "message": f"Demo booking {booking_id} has been cancelled successfully.",
        "booking": updated
    }
