// utils/fetchWeather.ts
export const fetchWeather = async (location: string) => {
    const apiKey = 'a68df739a20d4390a5904009242603';
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=no`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return response.json();
  };
  //fetching weather data from the API