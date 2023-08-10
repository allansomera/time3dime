import { Schema, model, models } from 'mongoose'

// const userSchema = new Schema({
//   name: String,
//   days: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Day',
//     },
//   ],
// })

const userSchema = new Schema({
  name: String,
  day_ids: [
    {
      type: Schema.Types.ObjectId(),
      ref: 'Day',
    },
  ],
})

const User = models.User || model('User', userSchema)

export default User
