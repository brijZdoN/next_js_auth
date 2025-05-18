'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = useState({ email: '', password: '', username: '' })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const resp = await axios.post(
        'http://localhost:3000//api/users/signup',
        user
      )
      toast.success(resp.data.message || 'Signed up successfully!')
      console.log('Singup Sucess', resp.data)

      router.push('/login')
    } catch (error: any) {
      console.log('Signup Failed', error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <>
      <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
      <div className='flex flex-col items-center justify-center min-h-screen py-2 m-2'>
        <h1 className=''>{loading ? 'Processing' : 'Signup'}</h1>

        <label>UserName</label>
        <input
          className='p-2 mb-2 border border-grey-300 rounded-lg'
          id='username'
          type='text'
          placeholder='Enter UserName'
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
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
          onClick={onSignup}
        >
          {buttonDisabled ? 'No Sign up' : 'Singup'}
        </button>
        <Link className='mt-2' href='/login'>
          Visit Login Page
        </Link>
      </div>
    </>
  )
}
