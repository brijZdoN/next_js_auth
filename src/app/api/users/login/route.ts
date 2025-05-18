import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

await connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody
    const user = await User.findOne({ email })
    console.log(reqBody)
    if (!user) {
      return NextResponse.json(
        { error: 'User doest not exist' },
        {
          status: 401,
        }
      )
    }
    // check if the password is correct

    const validPassword = await bcryptjs.compare(password, user.password)

    if (!validPassword) {
      return NextResponse.json(
        { error: 'User doest not exist' },
        {
          status: 401,
        }
      )
    }
    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    }
    //create token
    const token = await jwt.sign(tokenData, 'nextjsauth', {
      expiresIn: '1h',
    })

    const response = NextResponse.json({
      message: 'Login Successful',
      success: true,
    })
    response.cookies.set('token', token, { httpOnly: true })
    return response
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    )
  }
}
