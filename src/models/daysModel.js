import { Schema, model, models } from 'mongoose'

const daySchema = new Schema({
  user_fk: {
    type: Schema.Type.ObjectId,
    ref: 'User',
  },
  timeblocks: {
    type: Schema.Types.ObjectId,
    ref: 'Timeblock',
  },
})

const Day = models.Day || model('Day', daySchema)

export default Day
