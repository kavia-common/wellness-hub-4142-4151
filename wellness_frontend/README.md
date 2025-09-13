# Wellness Frontend

This React app is the frontend for the Wellness Hub. It connects to the backend Express API to list curated resources and track wellness activities.

## Quick start

1. Install dependencies
   npm install

2. Set API base URL (optional; defaults to http://localhost:3001)
   Create `.env` in the project root with:
   REACT_APP_API_BASE=http://localhost:3001

3. Run the app
   npm start

Open http://localhost:3000 in your browser.

## Features
- Browse curated wellness resources from the backend (/wellness/resources)
- Track activities (meditation, steps, water, sleep) via POST /wellness/track
- View recent tracked activities via GET /wellness/track
- Light/Dark theme toggle
- Simple, responsive UI with no heavy UI framework

## Structure
- src/api/client.js: API client functions
- src/context/ApiContext.js: Provides API via React Context
- src/pages/HomePage.js: Health check and quick links
- src/pages/ResourcesPage.js: Resource listing
- src/pages/TrackPage.js: Track form and history
- src/App.js: Routing and layout
- src/App.css: Styles

## Environment variables
- REACT_APP_API_BASE: Base URL for backend API (default http://localhost:3001)

Note: Do not commit secrets into .env; for production deployments, environment variables should be set by the hosting environment.
