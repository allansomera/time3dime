import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  name: String,
  days: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Day',
    },
  ],
})

const User = models.user || model('User', userSchema)

export default User
