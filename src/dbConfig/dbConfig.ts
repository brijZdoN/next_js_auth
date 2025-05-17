import mongoose from 'mongoose'

export async function connect() {
  try {
    if (mongoose.connection.readyState === 1) {
      // Already connected
      console.log('MongoDB already connected.')
      return
    }
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI is missing from .env')
      return
    }
    await mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection
    connection.on('connected', () => {
      console.log('MongoDB connected Successfully')
    })
    connection.on('error', (err) => {
      console.log(
        'MongoDB connection error. Please make sure mongodb is running' + err
      )
      process.exit()
    })
  } catch (error) {
    console.log('Something went wrong')
    console.log(error)
  }
}
