from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, status
from app.schemas import Practitioner, PractitionerSummary
from app.dummy_data import get_practitioners, get_practitioner_by_id

router = APIRouter(prefix="/api/practitioners", tags=["Practitioners"])

@router.get("", response_model=List[PractitionerSummary])
def read_practitioners(
    search: Optional[str] = Query(None, description="Search by name, tradition, location or service"),
    tradition: Optional[str] = Query(None, description="Filter by tradition"),
    location: Optional[str] = Query(None, description="Filter by location"),
    min_rating: Optional[float] = Query(None, ge=0.0, le=5.0, description="Minimum star rating")
):
    """List practitioners with optional search query and filters."""
    return get_practitioners(
        search=search,
        tradition=tradition,
        location=location,
        min_rating=min_rating
    )

@router.get("/{practitioner_id}", response_model=Practitioner)
def read_practitioner(practitioner_id: str):
    """Retrieve detailed profile of a specific practitioner."""
    practitioner = get_practitioner_by_id(practitioner_id)
    if not practitioner:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Practitioner with ID '{practitioner_id}' not found."
        )
    return practitioner
