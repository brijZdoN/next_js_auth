import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

await connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { username, email, password } = reqBody

    console.log(reqBody)

    // check if user exist
    const user = await User.findOne({ email })

    if (user) {
      console.log('User already exists')
      return NextResponse.json(
        { error: 'User already Exists' },
        { status: 400 }
      )
    }
    //hash password

    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    })

    const savedUser = await newUser.save()

    console.log(savedUser)

    return NextResponse.json(
      { message: 'User created successfully', success: true, savedUser },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
