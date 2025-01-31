# Weather Dashboard Application

## Description
The Weather Dashboard Application allows users to search for a city and retrieve a 5-day weather forecast. It integrates with a weather API to provide real-time temperature, humidity, wind speed, and weather conditions. The application is built using JavaScript and utilizes Google Places API to enhance location-based searches.

## Features
- Search for a city's weather forecast
- Display a 5-day forecast with temperature, humidity, and wind speed
- Integrate Google Places API for accurate location suggestions
- Fetch real-time weather data from the weather API
- User-friendly interface

## Technologies Used
- **JavaScript** - Core logic and API integration
- **TypeScript** - Ensures type safety and better code maintainability
- **HTML/CSS** - Structure and styling of the application
- **Google Places API** - Provides location-based search capabilities
- **Weather API** - Fetches real-time weather data

## Installation
1. Clone the repository:
   ```sh
   git clone git@github.com:cernxavi/weather-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd weather-dashboard
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up API keys for the Weather API and Google Places API in a `.env` file:
   ```sh
   WEATHER_API_KEY=your_weather_api_key
   GOOGLE_PLACES_API_KEY=your_google_places_api_key
   ```
5. Run the application:
   ```sh
   npm run start:dev
   ```

## Usage
1. Enter a city name in the search bar.
2. Select the correct city from the suggested locations.
3. View the 5-day weather forecast, including temperature, humidity, and wind speed.

## API Integration
- **Weather API**: Retrieves the 5-day forecast for a given city.
- **Google Places API**: Provides autocomplete suggestions for location input.

## Error Handling
- If an invalid city name is entered, an error message will be displayed.
- Network or API request failures are handled gracefully with user-friendly messages.

## Future Enhancements
- Add historical weather data for the searched location.
- Improve UI with interactive charts and animations.
- Implement user authentication to save favorite locations.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request with any improvements or bug fixes.


---

**GitHub Repo:** [git@github.com:cernxavi/weather-app.git](https://github.com/cernxavi/weather-app.git)

