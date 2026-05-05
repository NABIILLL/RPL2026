"use client";

import { useState, useEffect } from "react";
import {
  getCurrentWeather,
  getWeatherForecast,
  getHourlyWeather,
  WeatherData,
  DailyForecast,
  HourlyWeatherData,
} from "@/lib/weather";

interface UseWeatherOptions {
  latitude: number;
  longitude: number;
  locationName: string;
}

interface UseWeatherReturn {
  current: WeatherData | null;
  forecast: DailyForecast[];
  hourly: HourlyWeatherData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook to fetch and manage weather data
 * @param latitude - Location latitude
 * @param longitude - Location longitude
 * @param locationName - Location display name
 * @returns Weather data, loading state, error, and refetch function
 */
export function useWeather({
  latitude,
  longitude,
  locationName,
}: UseWeatherOptions): UseWeatherReturn {
  const [current, setCurrent] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [hourly, setHourly] = useState<HourlyWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [currentData, forecastData, hourlyData] = await Promise.all([
        getCurrentWeather(latitude, longitude, locationName),
        getWeatherForecast(latitude, longitude),
        getHourlyWeather(latitude, longitude),
      ]);

      if (!currentData) {
        throw new Error("Failed to fetch current weather");
      }

      setCurrent(currentData);
      setForecast(forecastData);
      setHourly(hourlyData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();

    // Auto-refresh every 10 minutes
    const interval = setInterval(fetchWeatherData, 600000);
    return () => clearInterval(interval);
  }, [latitude, longitude, locationName]);

  return {
    current,
    forecast,
    hourly,
    loading,
    error,
    refetch: fetchWeatherData,
  };
}
