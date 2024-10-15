import React from 'react';
import { WiCloud, WiDayCloudy, WiDayThunderstorm, WiDayShowers } from 'react-icons/wi';

const WeatherCard: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-blue-100 to-white p-4 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-700">Nairobi</div>
        <div className="text-sm text-gray-700">6:23 PM</div>
      </div>
      <div className="text-6xl font-light mt-4 text-gray-800">22°</div>
      <div className="text-lg text-gray-600">Partly Cloudy</div>
      <div className="text-sm text-gray-500 mt-1">14°/27°C</div>

      <div className="flex mt-6 space-x-2 overflow-x-auto">
        {['19:00', '20:00', '21:00', '22:00', '23:00'].map((time, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-sm text-gray-600">{time}</div>
            <div className="text-2xl mt-2">
              <WiCloud /> {/* Replace with appropriate icons */}
            </div>
            <div className="text-sm text-gray-600">{21 - index * 2}°C</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm">
          <div className="text-gray-600">Level4</div>
          <div className="text-gray-500">E</div>
        </div>
        <div className="text-sm">
          <div className="text-gray-600">50%</div>
          <div className="text-gray-500">Humidity</div>
        </div>
        <div className="text-sm">
          <div className="text-gray-600">22°C</div>
          <div className="text-gray-500">Feels Like</div>
        </div>
      </div>

      <div className="mt-6">
        {[
          { day: 'SUN', temp: '14°/26°C', icon: <WiDayCloudy /> },
          { day: 'MON', temp: '14°/27°C', icon: <WiCloud /> },
          { day: 'TUE', temp: '15°/28°C', icon: <WiDayThunderstorm /> },
          { day: 'WED', temp: '15°/27°C', icon: <WiDayShowers /> },
        ].map((forecast, index) => (
          <div key={index} className="flex justify-between text-sm text-gray-600 mt-1">
            <div>{forecast.day}</div>
            <div className="text-2xl">{forecast.icon}</div>
            <div>{forecast.temp}</div>
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
