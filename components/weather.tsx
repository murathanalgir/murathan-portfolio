/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import HttpStatus from './httpStatus';

export default function WeatherPage() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const [statusCode, setStatusCode] = useState<number | null>(null);
  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await axios.get('https://api.weatherstack.com/current', {
          params: {
            access_key: '62b53b77faa36362c13285bfc2653169',
            query: 'Istanbul',
            units: 'm',
          },
        });
        if ((response.data as any).error) {
          throw new Error((response.data as any).error.info);
        }
        setStatusCode(response.status)
        setWeather(response.data.current);
      } catch (err: any) {
        console.error('weatherError:', err);
        setError(err.message || 'The weather could not be loaded, please try again later.');
        setStatusCode(err.response?.status ?? 500)
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  //     if (statusCode && statusCode !== 200) {
  //       return <httpStatus status={statusCode} />
  //     }
      
  // }

  if (loading) return <div>Loading</div>
  if (statusCode && statusCode !== 200) {
    return <HttpStatus status={statusCode} />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        <span>❌ {error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-sm w-full bg-card text-card-foreground dark:bg-card dark:text-card-foreground rounded-2xl shadow-lg p-6 m-auto">
    <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
      🌤️ Istanbul
    </h2>
    <div className="flex items-center justify-between">
      <div className="flex items-baseline space-x-1">
        <span className="text-5xl font-semibold">{weather.temperature}°</span>
        <span className="text-sm">C</span>
      </div>
      <div className="text-right">
        <p className="font-medium">{weather.weather_descriptions[0]}</p>
        {/* <p className="text-xs text-muted-foreground">
          Updated at {weather.observation_time}
        </p> */}
      </div>
    </div>
  </div>
  );
}
