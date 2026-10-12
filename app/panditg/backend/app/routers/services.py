from typing import List
from fastapi import APIRouter
from app.schemas import ServiceCategory
from app.dummy_data import get_services

router = APIRouter(prefix="/api/services", tags=["Services"])

@router.get("", response_model=List[ServiceCategory])
def read_services():
    """Retrieve all available cultural service categories."""
    return get_services()
