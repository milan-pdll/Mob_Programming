"""
Utility helpers for Sanskriti Backend.
"""

from datetime import datetime

def format_nepal_date(dt: datetime) -> str:
    """Format datetime to standard readable string."""
    return dt.strftime("%Y-%m-%d %I:%M %p")
