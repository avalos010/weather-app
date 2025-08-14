// Weather App by JLuis Avalos - Modern Version
class WeatherApp {
  constructor() {
    this.apiUrl = 'https://fcc-weather-api.glitch.me/api/current';
    this.init();
  }

  init() {
    this.showLoading();
    this.getWeather();
  }

  showLoading() {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('weather-content').classList.add('hidden');
    document.getElementById('error').classList.add('hidden');
  }

  showWeather() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('weather-content').classList.remove('hidden');
    document.getElementById('error').classList.add('hidden');
  }

  showError() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('weather-content').classList.add('hidden');
    document.getElementById('error').classList.remove('hidden');
  }

  getWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.fetchWeatherData(position),
        (error) => this.handleGeolocationError(error)
      );
    } else {
      this.showError();
      console.error('Geolocation is not supported by this browser.');
    }
  }

  async fetchWeatherData(position) {
    try {
      const { latitude, longitude } = position.coords;
      const url = `${this.apiUrl}?lat=${latitude}&lon=${longitude}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      this.displayWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      this.showError();
    }
  }

  handleGeolocationError(error) {
    console.error('Geolocation error:', error);
    this.showError();
  }

  displayWeather(data) {
    // Set location
    document.getElementById('location').textContent = data.name;
    
    // Set current date
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    document.getElementById('current-date').textContent = currentDate;
    
    // Set weather description
    document.getElementById('weather-description').textContent = data.weather[0].description;
    
    // Set weather icon
    const weatherIcon = this.getWeatherIcon(data.weather[0].main, data.weather[0].description);
    document.getElementById('weather-icon').innerHTML = weatherIcon;
    
    // Set temperatures
    const tempCelsius = Math.floor(data.main.temp);
    const tempFahrenheit = Math.floor(data.main.temp * 1.8 + 32);
    
    document.getElementById('temp-celsius').textContent = `${tempCelsius}°C`;
    document.getElementById('temp-fahrenheit').textContent = `${tempFahrenheit}°F`;
    
    // Set additional weather info
    const feelsLikeCelsius = Math.floor(data.main.feels_like);
    const feelsLikeFahrenheit = Math.floor(data.main.feels_like * 1.8 + 32);
    document.getElementById('feels-like').textContent = `${feelsLikeFahrenheit}°F`;
    
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    
    const windSpeedMph = Math.floor(data.wind.speed * 2.237); // Convert m/s to mph
    document.getElementById('wind-speed').textContent = `${windSpeedMph} mph`;
    
    this.showWeather();
    
    // Add entrance animation
    this.animateEntrance();
  }

  getWeatherIcon(weatherMain, description) {
    const iconMap = {
      'Clear': 'fas fa-sun',
      'Clouds': 'fas fa-cloud',
      'Rain': 'fas fa-cloud-rain',
      'Drizzle': 'fas fa-cloud-drizzle',
      'Thunderstorm': 'fas fa-bolt',
      'Snow': 'fas fa-snowflake',
      'Mist': 'fas fa-smog',
      'Smoke': 'fas fa-smog',
      'Haze': 'fas fa-smog',
      'Dust': 'fas fa-smog',
      'Fog': 'fas fa-smog',
      'Sand': 'fas fa-smog',
      'Ash': 'fas fa-smog',
      'Squall': 'fas fa-wind',
      'Tornado': 'fas fa-wind'
    };
    
    const iconClass = iconMap[weatherMain] || 'fas fa-cloud';
    return `<i class="${iconClass}"></i>`;
  }

  animateEntrance() {
    const elements = document.querySelectorAll('#weather-content > *');
    elements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'all 0.6s ease';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new WeatherApp();
});

// Global function for retry button
function getWeather() {
  new WeatherApp();
}