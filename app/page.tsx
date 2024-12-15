import React from 'react'

function Homepage() {
  return (
    <div
      style={{
        textAlign: 'center',
        margin: '0', // 마진 제거
        padding: '0', // 패딩 제거
        height: '100vh', // 화면의 전체 높이
        width: '100vw', // 화면의 전체 너비
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("/cloud2.gif")', // 여기에 GIF 경로를 넣으세요
        backgroundSize: 'cover', // 화면에 꽉 차게
        backgroundPosition: 'center', // 이미지 중앙을 기준으로
        backgroundRepeat: 'no-repeat', // 반복 금지
      }}
    >
      <h1
        style={{ fontSize: '2em', marginBottom: '10px', color: 'white' }}
      ></h1>
      <p style={{ fontSize: '1.5em', marginBottom: '20px', color: 'white' }}>
        대한민국의 날씨 정보를 한눈에!
      </p>
      <br />
      <p style={{ fontSize: '1.2em', marginBottom: '20px', color: 'white' }}>
        실시간 기상 정보와 자연 현상을 확인하세요.
        <br />
        오늘의 날씨, 내일의 기온, 그리고 미래의 기상 변화를 제공합니다.
        <br />
        기상청과 함께 안전하고 건강한 하루를 준비하세요!
      </p>
    </div>
  )
}

export default Homepage
