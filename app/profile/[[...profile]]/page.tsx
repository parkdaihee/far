'use client'

import React, { useState, useEffect } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const API_KEY = '4c8fb93b5fd26c0a0a6d27bfc9a77791'
const CITIES = [
  { name: 'New York', country: 'USA', coordinates: [-74.006, 40.7128] },
  { name: 'Tokyo', country: 'Japan', coordinates: [139.6917, 35.6895] },
  { name: 'Beijing', country: 'China', coordinates: [116.4074, 39.9042] },
  { name: 'Berlin', country: 'Germany', coordinates: [13.405, 52.52] },
  { name: 'Accra', country: 'Ghana', coordinates: [-0.186964, 5.6037] },
  { name: 'Riyadh', country: 'Saudi Arabia', coordinates: [46.6753, 24.7136] },
]

type WeatherData = {
  id: number
  city: string
  country: string
  coordinates: [number, number]
  main: {
    temp: number
    humidity: number
  }
  weather: {
    description: string
  }[]
  wind: {
    speed: number
  }
}

const App = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWeatherData = async () => {
    try {
      setLoading(true)
      setError(null)

      const promises = CITIES.map(async (city) => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}&units=metric`
        )
        if (!response.ok) {
          throw new Error(`Failed to fetch weather data for ${city.name}`)
        }
        const data = await response.json()
        return {
          id: data.id,
          city: city.name,
          country: city.country,
          coordinates: city.coordinates,
          main: data.main,
          weather: data.weather,
          wind: data.wind,
        } as WeatherData
      })

      const results = await Promise.all(promises)
      setWeatherData(results)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherData()

    const interval = setInterval(() => {
      fetchWeatherData()
    }, 3600000) // Update every 1 hour

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (weatherData.length === 0) return

    const map = new maplibregl.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [0, 0],
      zoom: 2,
    })

    weatherData.forEach((weather) => {
      new maplibregl.Marker()
        .setLngLat(weather.coordinates)
        .setPopup(
          new maplibregl.Popup().setHTML(
            `<b>${weather.city}</b><br/>${weather.country}<br/>Temperature: ${weather.main.temp}°C<br/>Weather: ${weather.weather[0].description}`
          )
        )
        .addTo(map)
    })

    return () => map.remove()
  }, [weatherData])

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f4f8',
        minHeight: '100vh',
        padding: '20px',

        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <header
        style={{
          backgroundColor: '#0056b3',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h1>World Weather Dashboard</h1>
        <p>Real-time weather updates from around the globe</p>
      </header>

      <main
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          flexGrow: 1,
          width: '100%',
        }}
      >
        <div
          id='map'
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            minHeight: '600px',
          }}
        ></div>

        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            width: '100%',
            overflowY: 'auto',
            paddingBottom: '20px',
          }}
        >
          {loading && <p>Loading weather data...</p>}
          {error && <p>Error: {error}</p>}
          {!loading &&
            !error &&
            weatherData.map((weather) => (
              <div
                key={weather.id}
                style={{
                  backgroundColor: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #ddd',
                  textAlign: 'center',
                }}
              >
                <h3>
                  {weather.city}, {weather.country}
                </h3>
                <p>
                  <strong>Temperature:</strong> {weather.main.temp}°C
                </p>
                <p>
                  <strong>Weather:</strong> {weather.weather[0].description}
                </p>
                <p>
                  <strong>Humidity:</strong> {weather.main.humidity}%
                </p>
                <p>
                  <strong>Wind Speed:</strong> {weather.wind.speed} m/s
                </p>
              </div>
            ))}
        </div>
      </main>

      <footer
        style={{
          backgroundColor: '#e8eef3',
          color: '#333',
          padding: '10px',
          textAlign: 'center',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <p>Powered by OpenWeather | Map visualization by MapLibre</p>
      </footer>
    </div>
  )
}

export default App
