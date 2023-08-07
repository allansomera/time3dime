import { Schema, model, models } from 'mongoose'

const daySchema = new Schema({
  timeblocks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Timeblock',
    },
  ],
})

const Day = models.Day || model('Day', daySchema)

export default Day
