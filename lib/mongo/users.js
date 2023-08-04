import clientPromise from '.'

let client
let db
let users

const init = async () => {
  if (db) return
  try {
    client = await clientPromise
    db = await client.db('time3dime')
    users = await db.collection('user')
  } catch (error) {
    throw new Error('Failed to establish connection to database')
  }
}

;(async () => {
  await init()
})()

export const getUsers = async () => {
  try {
    if (!users) await init()
    const result = await users
      .find({})
      .limit(2)
      // .map((user) => ({ ...user, _id: user._id.toString() }))
      .toArray()
    return { users: result }
  } catch (error) {
    return { error: 'Failed to fetch users' }
  }
}
