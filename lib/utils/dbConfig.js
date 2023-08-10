import mongoose from 'mongoose'

// const connectMongo = async () => {
//   if (mongoose.connection.readState >= 1) {
//     return
//   }
//
//   mongoose.connection.on('connected', () => {
//     console.log('connected to mongo db')
//   })
//
//   mongoose.connection.on('error', (err) => {
//     console.log(`db connection problem`, err.message)
//   })
//
//   return mongoose.connect(process.env.MONGODB_URI)
// }

const dbConnect = async () => mongoose.connect(process.env.MONGODB_URI)
export default dbConnect
