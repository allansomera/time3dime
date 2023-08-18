import { Schema, model, models } from 'mongoose'

const timeslotSchema = new Schema({
  timeslot_id: Number,
  tag: String,
})

const Timeslot = models?.Timeslot || model('Timeslot', timeslotSchema)

export default Timeslot
