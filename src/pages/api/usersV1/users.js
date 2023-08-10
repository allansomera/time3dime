import dbConnect from '../../../../lib/utils/dbConfig'
import User from '../../../models/usersModel'

const handler = async (req, res) => {
  try {
    console.log('connecting to mongo')
    await dbConnect()
    console.log('connected to mongo')

    if (req.method === 'POST') {
      console.log('creating document')
      const createdUser = await User.create(req.body)
      console.log('created document')
      res.json({ createdUser })
    } else if (req.method === 'GET') {
      console.log('fetching documents')
      const fetchedUsers = await User.find({})
      console.log('fetched documents')
      res.json({ fetchedUsers })
    } else {
      throw new Error(`Unsupported HTTP method: ${req.method}`)
    }
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

export default handler
