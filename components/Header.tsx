import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div>
      <nav className='bg-blue-500 py-4 px-8'>
        {' '}
        {/* 파란색으로 변경 */}
        <div className='flex items-center justify-between container'>
          <div className='flex items-center font-bold'>
            <Link href='/'>
              <div className='text-lg text-white'>Main</div>
            </Link>
          </div>
          <div className='flex items-center font-bold'>
            {' '}
            <Link href='/repos' className='text-gray-300 hover:text-white mr-4'>
              서울 날씨 정보{' '}
            </Link>
          </div>

          <div className='flex items-center font-bold'>
            <SignedOut>
              <div className='text-gray-300 hover:text-white mr-4'>
                <SignInButton />
              </div>
              <div className='text-gray-300 hover:text-white mr-4'>
                <SignUpButton />
              </div>
            </SignedOut>

            <SignedIn>
              <Link
                href='/profile'
                className='text-gray-300 hover:text-white mr-4'
              >
                세계 주요 도시 날씨 정보
              </Link>

              <Link
                href='/dashboard'
                className='text-gray-300 hover:text-white mr-4'
              >
                기상청 게시판
              </Link>

              <Link
                href='/dashboard-client'
                className='text-gray-300 hover:text-white mr-4'
              >
                Personal project
              </Link>
              <div className='text-gray-300 hover:text-white mr-4'>
                <UserButton />
              </div>
              <div className='text-gray-300 hover:text-white mr-4'>
                <SignOutButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>
    </div>
  )
}
