# Sanskriti — A Digital Platform for Cultural Services and Practitioners
> **Connect • Celebrate • Preserve**  
> *A prototype mobile application rooted in Nepalese heritage, built with React Native (Expo SDK 57) and Python FastAPI.*

---

## 1. Project Overview

**Sanskriti** is a mobile-first digital platform designed to bridge households with verified, respectful cultural practitioners (Vedic pandits, Buddhist lamas, and traditional cultural performers) across the Kathmandu Valley. 

This repository contains a **fully functional, interactive demonstration prototype (Dummy MVP)**. It showcases the complete mobile discovery and reservation workflow:
- Browsing cultural service categories (Puja, Bratabandha, Wedding, Buddhist rites, etc.)
- Searching & filtering practitioners by tradition, location, and rating
- Exploring detailed practitioner biographies, service honorariums, and reviews
- Submitting live demo ceremony requests
- Managing and cancelling temporary bookings in real-time
- Submitting customer reviews with instant score updates

> **Demo Constraints & Integrity Note:**  
> - **Zero External Persistence:** No external database, ORM, SQLite, Firebase, or cloud storage is used.  
> - **In-Memory Backend:** All sample practitioners, reviews, and bookings are maintained strictly in Python memory on the FastAPI server and reset when the server restarts.  
> - **Fictional Content:** Practitioner identities, profile imagery, and customer reviews are curated fictional representations. No real financial transactions or legally binding contracts are processed.

---

## 2. Visual Design System

The application strictly implements the warm, serene, and spiritually grounded Sanskriti color palette:

| Token | Hex | Usage | Cultural Philosophy |
| :--- | :--- | :--- | :--- |
| **Maroon** | `#7B1E23` | Primary buttons, active tabs, brand headers | Represents heritage, dignity, tradition, and sacred trust. |
| **Dark Maroon** | `#5E171B` | Pressed states, active focus | Deeper emphasis for tactile interaction. |
| **Saffron** | `#F59E0B` | Spiritual accents, highlights, pending badges | Reflects spirituality, devotion, and sacred fire offerings. |
| **Deep Green** | `#166534` | Demo verified badges, confirmed status | Communicates harmony, balance, nature, and renewal. |
| **Gold** | `#D4AF37` | Star ratings, ceremonial highlights | Symbolizes wisdom, prosperity, and auspicious occasions. |
| **Earth Brown** | `#8B5E3C` | Cultural tags, subtitles | Connects with traditional Kathmandu Valley architecture. |
| **Cream** | `#FFF8ED` | Main application background | Warm, peaceful, hand-crafted paper parchment texture. |
| **White** | `#FFFFFF` | Cards, forms, sheet backgrounds | Clean, uncluttered contrast. |
| **Primary Text** | `#3B2420` | Titles and primary headings | Deep natural earth tone for high readability. |
| **Secondary Text** | `#6B5B53` | Descriptions, details | Balanced contrast for extended reading. |
| **Muted Text** | `#96877D` | Placeholders, captions, timestamps | Subtle metadata hints. |
| **Border** | `#EFE5DA` | Card outlines, dividers | Gentle, natural card framing. |

- **Card Radius:** 16 px  
- **Button Radius:** 10 px  
- **Input Radius:** 12 px  
- **Horizontal Screen Padding:** 18 px  
- **Typography:** Serif headings (Georgia / system serif) paired with clean sans-serif body typography.

---

## 3. Technology Stack

### Mobile Frontend
- **Framework:** React Native with Expo (SDK 57)
- **Language:** TypeScript 5.9+
- **Navigation:** Expo Router (File-based routing with Stack & Native Tabs)
- **HTTP Client:** Axios with centralized base URL configuration
- **Icons:** `lucide-react-native` (feather-style rounded vector icons)
- **Styling:** React Native `StyleSheet` with centralized token theme (`src/constants/theme.ts`)

### Backend REST API
- **Language:** Python 3.12+ (tested on Python 3.14)
- **Framework:** FastAPI with automatic OpenAPI docs (`/docs`)
- **Server:** Uvicorn (ASGI development server)
- **Validation:** Pydantic v2 schemas
- **CORS:** Configured for cross-origin mobile and web requests

---

## 4. Project Directory Structure

```
app/panditg/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application & CORS configuration
│   │   ├── dummy_data.py        # Centralized in-memory dataset & state managers
│   │   ├── schemas.py           # Pydantic input/output schemas
│   │   ├── utils.py             # Date formatting & helper functions
│   │   └── routers/
│   │       ├── __init__.py
│   │       ├── services.py      # /api/services endpoint
│   │       ├── practitioners.py # /api/practitioners endpoints with query filters
│   │       ├── bookings.py      # /api/bookings endpoints (create, read, cancel)
│   │       └── reviews.py       # /api/practitioners/{id}/reviews endpoints
│   └── requirements.txt
│
├── src/
│   ├── app/
│   │   ├── _layout.tsx          # Root Stack navigator with safe area & theme
│   │   ├── index.tsx            # Splash / Welcome screen with guest entry
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx      # Bottom tab navigator (Home, Search, Bookings, Profile)
│   │   │   ├── index.tsx        # Screen 2: Home (Hero banner, services, practitioners)
│   │   │   ├── search.tsx       # Screen 3: Search & Discovery with multi-tier filters
│   │   │   ├── bookings.tsx     # Screen 6: Bookings (Categorized tabs & cancel action)
│   │   │   └── profile.tsx      # Screen 8: Profile (Demo credentials & live API status)
│   │   ├── practitioner/
│   │   │   └── [id].tsx         # Screen 4 & 7: Practitioner Profile & Review submission
│   │   └── request-service.tsx  # Screen 5: Service Request booking form & modal
│   │
│   ├── components/
│   │   ├── Header.tsx           # Cultural greeting, location pill, notification bell
│   │   ├── ServiceCard.tsx      # Cultural service cards (compact carousel & full)
│   │   ├── PractitionerCard.tsx # Detailed card with rating, badges, and fees
│   │   ├── StatusBadge.tsx      # Color-coded status pills (pending, confirmed, etc.)
│   │   └── StateFeedback.tsx    # Polished loading, retry error banner, and empty states
│   │
│   ├── constants/
│   │   └── theme.ts             # Sanskriti design tokens, colors, radii, spacing
│   ├── services/
│   │   └── api.ts               # Centralized Axios API client with device URL logic
│   └── types/
│       └── index.ts             # TypeScript interface definitions
│
├── .env.example
├── package.json
└── README.md
```

---

## 5. Quick Start Instructions

### Step 1: Start the FastAPI Backend

Open a terminal window and navigate to the backend directory:

```bash
cd app/panditg/backend

# Optional: activate virtual environment
# python -m venv venv
# venv\Scripts\activate   (Windows)
# source venv/bin/activate (macOS/Linux)

# Install dependencies (FastAPI, Uvicorn, Pydantic)
pip install -r requirements.txt

# Launch FastAPI on port 8000
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Verify backend health by opening your browser at:
- **API Health:** [http://localhost:8000/health](http://localhost:8000/health)
- **Interactive Swagger Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Step 2: Start the React Native Mobile Frontend

Open a second terminal window and navigate to the `app/panditg` directory:

```bash
cd app/panditg

# Start the Expo development server
npx expo start
```

Press:
- `w` to open the web demo in your browser.
- `a` to open on an Android emulator.
- `i` to open on an iOS simulator.
- Or scan the QR code with the **Expo Go** app on your physical smartphone.

> **Network Configuration for Physical Phones:**  
> When running Expo Go on a physical phone connected to the same Wi-Fi network, set `EXPO_PUBLIC_API_URL` to your computer's local IP address (e.g. `EXPO_PUBLIC_API_URL=http://192.168.1.100:8000`). For Android emulators, `http://10.0.2.2:8000` is automatically used by default.

---

## 6. End-to-End Demo Workflow

To demonstrate the full user flow to an audience or evaluator:

1. **Launch Sanskriti:** Open the application. Notice the serene welcome screen featuring the lotus emblem and the tagline *Connect • Celebrate • Preserve*.
2. **Guest Entry:** Tap **"Explore as Guest"** or **"Get Started"** to directly access the main app without authentication friction.
3. **Explore Home:**
   - View the cultural Namaste greeting with location set to Kathmandu.
   - Browse the cultural hero banner *"Celebrate your traditions with confidence"*.
   - Swipe horizontally through popular services (*Puja, Bratabandha, Wedding Ceremony, Buddhist Ceremony, Traditional Performers*).
4. **Search Cultural Offerings:** Tap on the search bar or switch to the **Search** tab.
5. **Apply Filters:**
   - Type `"Puja"` or select a ceremony tag.
   - Filter by tradition (*Hindu tradition*, *Buddhist tradition*, or *Indigenous cultural services*).
   - Filter by Valley location (*Kathmandu*, *Lalitpur*, *Bhaktapur*).
   - Filter by minimum rating (4.8+ or 4.9+).
6. **Open Practitioner Profile:** Tap on **Pandit Ramesh Sharma** or **Lama Tenzin Dorje**.
   - Review years of experience, Kathmandu Valley location, and verified demo badge.
   - Read the spiritual biography and ritual availability.
   - Read existing customer reviews and tap **"Write Review"** to submit a live demo review.
7. **Initiate Booking:** Tap **"Request Service"**.
8. **Fill Ceremony Form:**
   - Ceremony prefilled or selectable.
   - Enter preferred date (`2026-11-20`) and ceremony timing.
   - Enter ceremony address (e.g., `Baluwatar, Kathmandu`).
   - Add ritual notes (e.g., *Satyanarayan Katha and Havan*).
9. **Submit Request:** Tap **"Submit Demo Request"**.
   - View the instant success modal with generated Request ID (e.g., `REQ-2026-083`).
10. **Inspect Bookings Tab:** Tap **"View in Bookings"**.
    - Notice your new ceremony request listed under **Pending** with a saffron status badge.
11. **Cancel Request (Optional):** Tap **"Cancel Request"** to trigger the FastAPI cancellation endpoint; the status updates immediately to **Cancelled**.
12. **Profile & Backend Monitor:** Tap the **Profile** tab to inspect the demo user details and press **"Check"** to see live real-time connectivity to the FastAPI server.

---

## 7. REST API Endpoints Reference

| Method | Endpoint | Description | Query / Body Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API welcome & platform overview | — |
| `GET` | `/health` | Server health check | — |
| `GET` | `/api/services` | Retrieve all 6 cultural service categories | — |
| `GET` | `/api/practitioners` | List all practitioners with optional filters | `search`, `tradition`, `location`, `min_rating` |
| `GET` | `/api/practitioners/{id}` | Retrieve practitioner profile & reviews | — |
| `GET` | `/api/practitioners/{id}/reviews` | Fetch reviews for a specific practitioner | — |
| `POST` | `/api/practitioners/{id}/reviews` | Submit a customer review | JSON: `reviewer_name`, `rating`, `comment` |
| `GET` | `/api/bookings` | List all current in-memory service requests | — |
| `GET` | `/api/bookings/{id}` | Retrieve single booking details | — |
| `POST` | `/api/bookings` | Submit new ceremony booking request | JSON: `service_name`, `practitioner_id`, `event_date`, `location`, etc. |
| `PATCH` | `/api/bookings/{id}/cancel` | Cancel a pending demo request | — |

---

## 8. Verification and Quality Checks

To verify code quality and conformity before deploying or presenting:

```bash
# In app/panditg:
npx tsc --noEmit        # TypeScript type safety check (0 errors)
npx expo lint           # Expo & React Native ESLint checks
```
