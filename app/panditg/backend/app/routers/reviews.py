from typing import List
from fastapi import APIRouter, HTTPException, status
from app.schemas import Review, ReviewCreate
from app.dummy_data import get_practitioner_by_id, add_review

router = APIRouter(prefix="/api/practitioners/{practitioner_id}/reviews", tags=["Reviews"])

@router.get("", response_model=List[Review])
def read_reviews(practitioner_id: str):
    """Retrieve sample customer reviews for a practitioner."""
    practitioner = get_practitioner_by_id(practitioner_id)
    if not practitioner:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Practitioner with ID '{practitioner_id}' not found."
        )
    return practitioner.get("reviews", [])

@router.post("", response_model=Review, status_code=status.HTTP_201_CREATED)
def create_review(practitioner_id: str, review_in: ReviewCreate):
    """Submit a demo customer review for a practitioner."""
    practitioner = get_practitioner_by_id(practitioner_id)
    if not practitioner:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Practitioner with ID '{practitioner_id}' not found."
        )
    created = add_review(practitioner_id, review_in.model_dump())
    if not created:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to submit review."
        )
    return created
