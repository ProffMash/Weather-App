// import React from 'react';
// import { WiCloud, WiDayCloudy, WiDayThunderstorm, WiDayShowers } from 'react-icons/wi';

// const WeatherCard: React.FC = () => {
//   return (
//     <div className="max-w-md mx-auto bg-gradient-to-b from-blue-100 to-white p-4 rounded-2xl shadow-lg">
//       <div className="flex justify-between items-center">
//         <div className="text-sm text-gray-700">Nairobi</div>
//         <div className="text-sm text-gray-700">6:23 PM</div>
//       </div>
//       <div className="text-6xl font-light mt-4 text-gray-800">22°</div>
//       <div className="text-lg text-gray-600">Partly Cloudy</div>
//       <div className="text-sm text-gray-500 mt-1">14°/27°C</div>

//       <div className="flex mt-6 space-x-2 overflow-x-auto">
//         {['19:00', '20:00', '21:00', '22:00', '23:00'].map((time, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <div className="text-sm text-gray-600">{time}</div>
//             <div className="text-2xl mt-2">
//               <WiCloud /> {/* Replace with appropriate icons */}
//             </div>
//             <div className="text-sm text-gray-600">{21 - index * 2}°C</div>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-between items-center mt-4">
//         <div className="text-sm">
//           <div className="text-gray-600">Level4</div>
//           <div className="text-gray-500">E</div>
//         </div>
//         <div className="text-sm">
//           <div className="text-gray-600">50%</div>
//           <div className="text-gray-500">Humidity</div>
//         </div>
//         <div className="text-sm">
//           <div className="text-gray-600">22°C</div>
//           <div className="text-gray-500">Feels Like</div>
//         </div>
//       </div>

//       <div className="mt-6">
//         {[
//           { day: 'SUN', temp: '14°/26°C', icon: <WiDayCloudy /> },
//           { day: 'MON', temp: '14°/27°C', icon: <WiCloud /> },
//           { day: 'TUE', temp: '15°/28°C', icon: <WiDayThunderstorm /> },
//           { day: 'WED', temp: '15°/27°C', icon: <WiDayShowers /> },
//         ].map((forecast, index) => (
//           <div key={index} className="flex justify-between text-sm text-gray-600 mt-1">
//             <div>{forecast.day}</div>
//             <div className="text-2xl">{forecast.icon}</div>
//             <div>{forecast.temp}</div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-4 text-right text-blue-600 text-sm">
//         More Weather Forecast &gt;
//       </div>
//     </div>
//   );
// };

// export default WeatherCard;





import React, { useEffect, useState } from 'react';
import { WiCloud, WiDayCloudy, WiDayThunderstorm, WiDayShowers } from 'react-icons/wi';
import { fetchWeather } from '../utils/fetchWeather';

interface WeatherData {
  location: {
    name: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    feelslike_c: number;
  };
  forecast: {
    forecastday: Array<{
      [x: string]: any;
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }>;
  };
}

const WeatherCard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('Nairobi');
  const [inputValue, setInputValue] = useState<string>('');

  const handleSearch = () => {
    if (inputValue.trim()) {
      setLocation(inputValue.trim());
    }
  };

  useEffect(() => {
    const getWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeather(location);
        setWeatherData(data);
      } catch (err) {
        setError('Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, [location]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error || !weatherData) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const {
    location: { name, localtime },
    current: { temp_c, condition, humidity, feelslike_c },
    forecast: { forecastday },
  } = weatherData;

  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-blue-100 to-white p-4 rounded-2xl shadow-lg">
      <div className="flex flex-col mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter city name"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={handleSearch}
          className="mt-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-700">{name}</div>
        <div className="text-sm text-gray-700">{localtime.split(' ')[1]}</div>
      </div>
      <div className="text-6xl font-light mt-4 text-gray-800">{temp_c}°</div>
      <div className="text-lg text-gray-600">{condition.text}</div>
      <div className="text-sm text-gray-500 mt-1">
        {forecastday[0].day.mintemp_c}°/{forecastday[0].day.maxtemp_c}°C
      </div>

      <div className="flex mt-6 space-x-2 overflow-x-auto">
        {forecastday[0].hour.slice(19, 24).map((hour: { time: string; condition: { icon: string | undefined; text: string | undefined; }; temp_c: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-sm text-gray-600">{hour.time.split(' ')[1]}</div>
            <div className="text-2xl mt-2">
              <img src={hour.condition.icon} alt={hour.condition.text} className="w-8 h-8" />
            </div>
            <div className="text-sm text-gray-600">{hour.temp_c}°C</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm">
          <div className="text-gray-600">Level4</div>
          <div className="text-gray-500">E</div>
        </div>
        <div className="text-sm">
          <div className="text-gray-600">{humidity}%</div>
          <div className="text-gray-500">Humidity</div>
        </div>
        <div className="text-sm">
          <div className="text-gray-600">{feelslike_c}°C</div>
          <div className="text-gray-500">Feels Like</div>
        </div>
      </div>

      <div className="mt-6">
        {forecastday.map((day, index) => (
          <div key={index} className="flex justify-between text-sm text-gray-600 mt-1">
            <div>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <div className="text-2xl">
              <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-8 h-8" />
            </div>
            <div>
              {day.day.mintemp_c}°/{day.day.maxtemp_c}°C
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-right text-blue-600 text-sm">
        More Weather Forecast &gt;
      </div>
    </div>
  );
};

export default WeatherCard;
