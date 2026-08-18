# Classy Weather

A lightweight weather application built with React that lets users search for a location and view a multi-day forecast.

The project focuses on building a small, asynchronous React application around real API data, with an emphasis on state management, component composition, data transformation, and predictable UI updates.

## Overview

The application takes a location entered by the user, resolves it to geographic coordinates through the Open-Meteo Geocoding API, and then uses those coordinates to retrieve the corresponding weather forecast.

The resulting data is transformed into a format suitable for the UI and rendered as a simple multi-day forecast.

```text
Location
   ↓
Geocoding API
   ↓
Latitude / Longitude / Timezone
   ↓
Weather API
   ↓
Forecast Data
   ↓
React State
   ↓
UI
```

## Key Features

* Search weather by location
* Location geocoding before requesting forecast data
* Multi-day temperature forecast
* Weather condition icons based on WMO weather codes
* Loading state while requests are in progress
* Basic handling for invalid or unavailable locations
* Persists the last searched location using `localStorage`
* Responsive, component-based UI

## Technical Approach

### State-driven UI

The application keeps the current location, loading state, display location, and forecast data in React state.

User input updates the location state, which triggers the weather lookup. Once the asynchronous requests complete, the resulting data is stored in state and React updates the UI.

This keeps the rendered interface derived from the current application state rather than manually manipulating the DOM.

### Two-step API flow

Weather data cannot be requested from a city name alone in the forecast endpoint, so the application uses a two-step request:

1. Resolve the location using the Open-Meteo Geocoding API.
2. Use the returned latitude, longitude, and timezone to request the forecast.

This also keeps the responsibility of location resolution separate from forecast retrieval.

### Asynchronous data handling

The weather lookup is implemented as an asynchronous operation using `async/await`.

The request lifecycle is represented explicitly through state:

```text
Request starts
     ↓
isLoading = true
     ↓
Fetch location
     ↓
Fetch forecast
     ↓
Update weather state
     ↓
isLoading = false
```

Errors are caught at the request boundary so a failed lookup does not leave the application in a loading state.

### Component composition

The UI is split into focused components:

```text
App
├── Input
└── Weather
    └── Day
```

`App` coordinates the application state and data fetching.

`Input` handles the location input and communicates changes back to `App`.

`Weather` receives forecast data and is responsible for rendering the forecast.

`Day` represents an individual forecast entry.

This keeps the data-fetching and state-management concerns separate from the individual pieces of the UI.

### Data transformation

The API returns weather condition codes rather than presentation-ready descriptions or icons.

The application maps those WMO codes to weather symbols before rendering them.

It also formats dates and converts country codes into display-friendly flags.

This keeps API-specific representations from leaking directly into the presentation layer.

### Persistence

The last searched location is stored in `localStorage` and restored when the application loads.

This provides a small but useful persistence layer without introducing a backend or external state-management solution.

## Tech Stack

* React 18
* JavaScript (ES6+)
* Create React App
* CSS
* Open-Meteo Geocoding API
* Open-Meteo Forecast API
* Browser `localStorage`

## Project Structure

```text
src/
├── App.js
├── Counter.js
├── index.css
├── index.js
└── starter.js

public/
└── ...
```

The primary application logic lives in `App.js`, where the application state, API integration, data transformation, and main UI composition are coordinated.

> `Counter.js` and `starter.js` are retained as supporting/learning files from the original project setup and are not part of the main weather application flow.

## Running Locally

Clone the repository:

```bash
git clone https://github.com/imssc/weather-app-using-node.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

Create a production build with:

```bash
npm run build
```

## API

Weather information is provided by [Open-Meteo](https://open-meteo.com/).

The application uses:

* Open-Meteo Geocoding API for location lookup
* Open-Meteo Forecast API for daily weather data

No API key is required for the current implementation.

## What This Project Demonstrates

This project was built as a practical exercise in working with React and external data rather than as a collection of isolated UI examples.

The main areas explored were:

* React component composition
* State management
* Controlled inputs
* Props and component communication
* Asynchronous API requests
* Loading and error states
* Conditional rendering
* Data transformation
* Browser storage
* Lifecycle-driven application behavior
* Rendering collections from API data

## Notes

The application is intentionally small. The goal was to understand the complete path from user input to an external API request and finally to a state-driven React UI.

Potential next steps would include migrating the implementation to functional components and hooks, introducing a dedicated API/service layer, adding automated tests, improving accessibility, and eventually moving the data-fetching concerns toward a server-state solution such as TanStack Query.
