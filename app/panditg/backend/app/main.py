from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import services, practitioners, reviews, bookings
from app.schemas import HealthResponse

app = FastAPI(
    title="Sanskriti — Cultural Services API",
    description=(
        "Dummy MVP REST API for Sanskriti — A Digital Platform for Cultural Services and Practitioners. "
        "Operates strictly with in-memory Python structures for temporary demo interactions. No persistent database."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for Expo / React Native (Web, Simulator, Physical Devices)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API routers
app.include_router(services.router)
app.include_router(practitioners.router)
app.include_router(reviews.router)
app.include_router(bookings.router)

@app.get("/", tags=["General"])
def read_root():
    """Welcome endpoint for Sanskriti API."""
    return {
        "app": "Sanskriti — Cultural Services Platform",
        "tagline": "Connect • Celebrate • Preserve",
        "message": "Namaste! Welcome to the Sanskriti cultural services demo backend.",
        "docs": "/docs",
        "health": "/health",
        "is_demo": True
    }

@app.get("/health", response_model=HealthResponse, tags=["General"])
def health_check():
    """Health check endpoint to verify backend service status."""
    return {
        "status": "ok",
        "app": "Sanskriti API",
        "version": "1.0.0",
        "is_demo": True
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
