'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function ProfilePage() {
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const getUserDetails = async () => {
    const result = await axios.get('api/users/currentuser')
    console.log(result.data)
    setUserData(result.data.data._id)
  }
  useEffect(() => {
    getUserDetails()
  }, [])
  const logout = async () => {
    console.log('logout clicked')

    try {
      await axios.get('/api/users/logout')
      toast.success('Logout Successfully')
      router.push('/login')
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  return (
    <>
      <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
      <div className='flex  flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <p>Profile Page</p>
        <h2 className=' rounded bg-green-400'>
          {userData === null ? (
            'No Data'
          ) : (
            <Link href={`/profile/${userData}`}>{userData}</Link>
          )}
        </h2>
        <button
          onClick={logout}
          className='bg-blue-500 hover:bg-blue-700 mt-4 font-bold py-2 px-4 rounded text-white'
        >
          Logout
        </button>
      </div>
    </>
  )
}
