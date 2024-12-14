import React from 'react'

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center space-y-8 bg-gray-100 p-8 rounded-lg shadow-md">
      {/* 사용자 프로필 섹션 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Park Daihee Youtube Channel
        </h1>
        <p className="text-gray-600 mb-4">
          유튜브 채널 입니다. AI로 제작해봤으며 HTML, CSS, JAVA SCRIPT 의 내용을
          담고 있습니다.
        </p>
      </div>

      {/* 동영상 섹션 */}
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-4">
        <div className="relative aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/Sg6XrvN4v58"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* 추가적인 요소 (예: 버튼) */}
      <div className="flex space-x-4">
        <a
          href="https://www.youtube.com/channel/UCp3wHIit5q9LoM3LmtTNjtw"
          target="_blank" // 새 탭에서 열기
          rel="noopener noreferrer" // 보안
        >
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            팔로우
          </button>
        </a>
      </div>
    </div>
  )
}
