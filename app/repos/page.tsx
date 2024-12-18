/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import React, { useState, useEffect } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export default function SeoulWeather() {
  const [weatherData, setWeatherData] = useState<Record<string, string> | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // OpenWeather API 정보
  const API_KEY = '4c8fb93b5fd26c0a0a6d27bfc9a77791'
  const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather`

  const fetchWeatherData = async () => {
    try {
      setLoading(true)
      setError(null)

      const cityName = 'Seoul'
      const url = `${API_ENDPOINT}?q=${cityName}&appid=${API_KEY}&units=metric`

      const response = await fetch(url)
      if (!response.ok) {
        console.error('API 응답 실패:', response.status, response.statusText)
        throw new Error('날씨 데이터를 가져오는 데 실패했습니다.')
      }

      const data = await response.json()
      console.log('API 응답 데이터:', data)

      const weatherInfo = {
        T1H: data.main.temp.toFixed(1), // 현재 기온
        REH: data.main.humidity, // 습도
        PTY: data.weather[0].main, // 날씨 상태 (맑음, 비, 눈 등)
        WSD: data.wind.speed.toFixed(1), // 풍속
      }

      setWeatherData(weatherInfo)
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류 발생')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherData()
  }, [])

  useEffect(() => {
    if (!weatherData) return

    const map = new maplibregl.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [126.978, 37.5665], // 서울 좌표
      zoom: 5,
    })

    new maplibregl.Marker()
      .setLngLat([126.978, 37.5665])
      .setPopup(
        new maplibregl.Popup().setHTML(
          `<b>서울</b><br/>기온: ${weatherData.T1H}°C<br/>습도: ${weatherData.REH}%<br/>날씨: ${weatherData.PTY}`
        )
      )
      .addTo(map)

    return () => map.remove()
  }, [weatherData])

  if (loading) {
    return <p style={styles.loading}>날씨 데이터를 가져오는 중입니다...</p>
  }

  if (error) {
    return <p style={styles.error}>에러 발생: {error}</p>
  }

  if (!weatherData) {
    return (
      <p style={styles.error}>
        날씨 데이터가 없습니다. 잠시 후 다시 시도해주세요.
      </p>
    )
  }

  const backgroundGif =
    {
      Clear: '/clearday.gif',
      Rain: '/rainy.gif',
      Snow: '/snowy.gif',
      Clouds: '/cloudy.gif',
    }[weatherData.PTY] || '/clearday.gif'

  return (
    <div
      style={{ ...styles.container, backgroundImage: `url(${backgroundGif})` }}
    >
      <header style={styles.header}>
        <h1 style={styles.title}>서울 날씨 정보</h1>
        <p>OpenWeather 데이터를 기반으로 한 실시간 날씨</p>
      </header>
      <section style={styles.weatherSection}>
        <h2 style={styles.subtitle}>현재 날씨</h2>
        <div style={styles.weatherDetails}>
          <div style={styles.weatherItem}>
            <span>기온</span>
            <span>{weatherData.T1H}°C</span>
          </div>
          <div style={styles.weatherItem}>
            <span>습도</span>
            <span>{weatherData.REH}%</span>
          </div>
          <div style={styles.weatherItem}>
            <span>날씨</span>
            <span>{weatherData.PTY}</span>
          </div>
          <div style={styles.weatherItem}>
            <span>풍속</span>
            <span>{weatherData.WSD}m/s</span>
          </div>
        </div>
      </section>
      <section style={styles.mapSection}>
        <h2 style={styles.subtitle}>서울 위치</h2>
        <div id='map' style={styles.map}></div>
      </section>
      <footer style={styles.footer}>
        <p>데이터 제공: OpenWeather</p>
      </footer>
    </div>
  )
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    margin: 0,
    padding: 0,
    textAlign: 'center' as const,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    width: '100vw',
  },
  header: {
    marginBottom: '20px',
    background: '#0078ff',
    color: '#fff',
    padding: '20px',
    borderRadius: '8px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold' as const,
  },
  weatherSection: {
    margin: '20px 0',
  },
  subtitle: {
    fontSize: '22px',
    fontWeight: 'bold' as const,
    marginBottom: '10px',
  },
  weatherDetails: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    margin: '10px',
  },
  weatherItem: {
    background: '#eaf4ff',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center' as const,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  mapSection: {
    margin: '30px 0',
  },
  map: {
    height: '600px',
    width: '100%',
    borderRadius: '8px',
  },
  footer: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#666',
  },
  loading: {
    color: '#555',
    fontSize: '18px',
  },
  error: {
    color: 'red',
    fontSize: '18px',
  },
}
