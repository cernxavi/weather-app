import dotenv from 'dotenv';
dotenv.config();

interface Coordinates {
  lat: number;
  lon: number;
}

class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(city: string, date: string, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

class WeatherService {
  private baseURL: string;
  private apiKey: string;
  private cityName: string;
  cityDetails: any = null;  

  constructor() {
    this.baseURL = `https://api.openweathermap.org`;
    this.apiKey = process.env.API_KEY || '';
    this.cityName = '';
  }
  
  private async fetchLocationData(city: string) {
    const response = await fetch(this.buildGeocodeQuery(city));
    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error(`City "${city}" not found.`);
    }
    return data[0]; // OpenWeatherMap's geocoding API returns an array
  }

  private destructureLocationData(locationData: any): Coordinates {
    console.log('Location Data:', locationData);
    this.cityDetails = locationData;
    return { lat: locationData.lat, lon: locationData.lon };
  }

  private destructureWeatherData(weatherData: any, forecastData: any) {
    console.log('Weather Data:', weatherData);
    console.log('Forecast Data:', forecastData);
    
    const currentWeather = this.parseCurrentWeather(weatherData);
    const dailyForecast = this.parseForecastWeather(this.grabDailyForecast(forecastData.list));
    
    return [currentWeather, dailyForecast];
  }

  private grabDailyForecast(forecastData: any[]): any[] {
    return forecastData.filter((forecast) => {
      const date = new Date(forecast.dt * 1000);
      return date.getHours() === 12; // Get forecasts at noon each day
    });
  }

  private buildGeocodeQuery(city: string): string {
    return `${this.baseURL}/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
  }

  private buildWeatherQuery({ lat, lon }: Coordinates): string {
    return `${this.baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${this.apiKey}`;
  }

  private buildForecastQuery({ lat, lon }: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${this.apiKey}`;
  }

  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    if (!response.ok) throw new Error('Failed to fetch weather data');
    return response.json();
  }

  private async fetchForecastData(coordinates: Coordinates) {
    const response = await fetch(this.buildForecastQuery(coordinates));
    if (!response.ok) throw new Error('Failed to fetch forecast data');
    return response.json();
  }

  private parseCurrentWeather(response: any) {
    return new Weather(
      response.name,
      new Date(response.dt * 1000).toDateString(),
      response.weather?.[0]?.icon || '',
      response.weather?.[0]?.description || '',
      response.main.temp,
      response.wind?.speed || 0,
      response.main?.humidity || 0
    );
  }

  private parseForecastWeather(forecasts: any[]) {
    return forecasts.map((forecast) => {
      return new Weather(
        this.cityName,
        new Date(forecast.dt * 1000).toDateString(),
        forecast.weather?.[0]?.icon || '',
        forecast.weather?.[0]?.description || '',
        forecast.main.temp,
        forecast.wind?.speed || 0,
        forecast.main?.humidity || 0
      );
    });
  }

public async getWeatherForCity(city: string) {
    try {
        this.cityName = city;
        const locationData = await this.fetchLocationData(city);
        const coordinates = this.destructureLocationData(locationData);
        const weatherData = await this.fetchWeatherData(coordinates);
        const forecastData = await this.fetchForecastData(coordinates);
        return this.destructureWeatherData(weatherData, forecastData);
    } catch (error: any) { // ✅ Explicitly type the error as 'any'
        console.error('Error fetching weather data:', error.message);
        return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
}

}

export default new WeatherService();
