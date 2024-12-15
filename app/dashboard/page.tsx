'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import './styles.css'

interface Post {
  username: string
  message: string
  imageUrl?: string
  timestamp: string
  id: string
}

const Botrap = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [form, setForm] = useState<{
    username: string
    message: string
    imageUrl: string
  }>({
    username: '',
    message: '',
    imageUrl: '',
  })

  useEffect(() => {
    const savedPosts = localStorage.getItem('posts')
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts))
  }, [posts])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (form.username.trim() && form.message.trim()) {
      const newPost: Post = {
        username: form.username,
        message: form.message,
        imageUrl: form.imageUrl,
        timestamp: new Date().toLocaleString(),
        id: crypto.randomUUID(),
      }
      setPosts((prevPosts) => [newPost, ...prevPosts])
      setForm({ username: '', message: '', imageUrl: '' })
    }
  }

  const handleDelete = (id: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
  }

  return (
    <div id='viewer-board' className='board-container'>
      <header className='board-header'>
        <h1
          style={{
            color: '#0066CC',
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
          }}
        >
          기상청 시청자 게시판
        </h1>
        <p
          className='board-subtitle'
          style={{ textAlign: 'center', color: '#333', margin: '0 0 20px' }}
        >
          최신 날씨 정보를 공유하고 의견을 나눠보세요!
        </p>
      </header>
      <form id='post-form' className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>이름:</label>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='이름을 입력하세요'
            value={form.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='message'>메시지:</label>
          <textarea
            id='message'
            name='message'
            placeholder='여기에 메시지를 작성하세요'
            value={form.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className='form-group'>
          <label htmlFor='imageUrl'>사진 URL:</label>
          <input
            type='text'
            id='imageUrl'
            name='imageUrl'
            placeholder='사진의 URL을 입력하세요'
            value={form.imageUrl}
            onChange={handleInputChange}
          />
        </div>

        <button type='submit' className='submit-button'>
          등록
        </button>
      </form>

      <h2 className='posts-title'>게시물</h2>
      <ul id='posts' className='posts-list'>
        {posts.map((post) => (
          <li key={post.id} className='post-item'>
            <div className='post-header'>
              <div className='post-info'>
                <p className='post-username'>{post.username}</p>
                <p className='post-timestamp'>{post.timestamp}</p>
              </div>
              <button
                className='delete-button'
                onClick={() => handleDelete(post.id)}
              >
                삭제
              </button>
            </div>
            <p className='post-message'>{post.message}</p>
            {post.imageUrl && <img src={post.imageUrl} alt='Post Image' />}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Botrap
