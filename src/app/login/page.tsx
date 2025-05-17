'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
export default function LoginPage() {
  const [user, setUser] = useState({ email: '', password: '' })

  const onLogin = () => {
    console.log('Clicking it ')
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 m-2'>
      <h1 className=''>Login</h1>

      <label>email</label>
      <input
        className='p-2 mb-2 border border-grey-300 rounded-lg'
        id='email'
        type='text'
        placeholder='Enter email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label>password</label>
      <input
        className='p-2 mb-2 border border-grey-300 rounded-lg'
        id='password'
        type='text'
        placeholder='Enter password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        className='p-2 border m-6 border-grey-300 rounded-lg'
        onClick={onLogin}
      >
        Login Here
      </button>
      <Link className='mt-2' href='/signup'>
        Visit SignUp Page
      </Link>
    </div>
  )
}
