import { MongoClient } from 'mongodb'

const URI = process.env.MONGODB_URI
// const URI = 'mongodb://root:rootroot@localhost:27017'
const options = {}

if (!URI) throw new Error('Please add your Mongo URI to .env.local')

let client = new MongoClient(URI, options)

let clientPromise

if (process.env.NODE_ENV !== 'production') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect()
  }

  clientPromise = global._mongoClientPromise
} else {
  clientPromise = client.connect()
}

export default clientPromise
