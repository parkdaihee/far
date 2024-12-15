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

  const API_ENDPOINT =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
  const API_KEY =
    'xSclGfnfd44ErGXkGsukDq3m6lmLu1I5pJI61hQ%2FyjAJPohjb5FUKy9VuqfuPYndCxDpwpyMrjM%2FVIN7Eq3GFA%3D%3D'

  const fetchWeatherData = async () => {
    try {
      setLoading(true)
      setError(null)

      const now = new Date()
      const baseDate = `${now.getFullYear()}${String(
        now.getMonth() + 1
      ).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}` // YYYYMMDD
      const minutes = Math.floor(now.getMinutes() / 10) * 10 // 10분 단위
      const baseTime = `${String(now.getHours()).padStart(2, '0')}${String(
        minutes
      ).padStart(2, '0')}` // HHMM

      const nx = 60 // X 좌표
      const ny = 127 // Y 좌표

      const url = `${API_ENDPOINT}?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`

      const response = await fetch(url)
      if (!response.ok) {
        console.error('API 응답 실패:', response.status, response.statusText)
        throw new Error('날씨 데이터를 가져오는 데 실패했습니다.')
      }

      const data = await response.json()
      console.log('API 응답 데이터:', data)

      const items = data?.response?.body?.items?.item
      if (!items || !Array.isArray(items)) {
        throw new Error('유효한 날씨 데이터가 없습니다.')
      }

      const weatherInfo = items.reduce(
        (acc: Record<string, string>, item: any) => {
          acc[item.category] = item.obsrValue
          return acc
        },
        {}
      )

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
      zoom: 14,
    })

    new maplibregl.Marker()
      .setLngLat([126.978, 37.5665])
      .setPopup(
        new maplibregl.Popup().setHTML(
          `<b>서울</b><br/>기온: ${weatherData.T1H}°C<br/>습도: ${weatherData.REH}%`
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
      '0': '/clearday.gif',
      '1': '/rainy.gif',
      '3': '/snowy.gif',
    }[weatherData.PTY] || '/clearday.gif'

  return (
    <div
      style={{ ...styles.container, backgroundImage: `url(${backgroundGif})` }}
    >
      <header style={styles.header}>
        <h1 style={styles.title}>서울 날씨 정보</h1>
        <p>기상청 초단기 실황 데이터</p>
        <p>(10분마다 업데이트)</p>
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
            <span>강수 형태</span>
            <span>
              {{ '0': '맑음', '1': '비', '3': '눈' }[weatherData.PTY] ||
                '알 수 없음'}
            </span>
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
        <p>데이터 제공: 기상청</p>
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
