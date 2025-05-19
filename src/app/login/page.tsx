'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState({ email: '', password: '' })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    console.log('clicked')
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      console.log('Login Success', response.data)

      toast.success(response.data.message || 'Login Success')
      router.push('/profile')
    } catch (error: any) {
      console.log('Login Failed', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])
  return (
    <>
      <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
      <div className='flex flex-col items-center justify-center min-h-screen py-2 m-2'>
        <h1 className='text-3xl'>{loading ? 'Processing' : 'Login'}</h1>

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
    </>
  )
}
