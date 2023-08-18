import { Schema, model, models } from 'mongoose'

const daySchema = new Schema({
  id: Number,
  day: [
    {
      timeslot_id: { type: Schema.Types.ObjectId, ref: 'Timeslot' },
      tag: String,
    },
  ],
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Day = models?.Day || model('Day', daySchema)

export default Day
