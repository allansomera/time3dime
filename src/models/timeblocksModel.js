import { Schema, model, models } from 'mongoose'
import { M_PLUS_Code_Latin } from 'next/font/google'

// const timeblockSchema = new Schema({
//   name: String,
//   days: [
//     {
//       '00:00': String,
//       '00:30': String,
//       '01:00': String,
//       '01:30': String,
//       '02:00': String,
//       '02:30': String,
//       '03:00': String,
//       '03:30': String,
//       '04:00': String,
//       '04:30': String,
//       '05:00': String,
//       '05:30': String,
//       '06:00': String,
//       '06:30': String,
//       '07:00': String,
//       '07:30': String,
//       '08:00': String,
//       '08:30': String,
//       '09:00': String,
//       '09:30': String,
//       '10:00': String,
//       '10:30': String,
//       '11:00': String,
//       '11:30': String,
//       '12:00': String,
//       '12:30': String,
//       '13:00': String,
//       '13:30': String,
//       '14:00': String,
//       '14:30': String,
//       '15:00': String,
//       '15:30': String,
//       '16:00': String,
//       '16:30': String,
//       '17:00': String,
//       '17:30': String,
//       '18:00': String,
//       '18:30': String,
//       '19:00': String,
//       '19:30': String,
//       '20:00': String,
//       '20:30': String,
//       '21:00': String,
//       '21:30': String,
//       '22:00': String,
//       '22:30': String,
//       '23:00': String,
//       '23:30': String,
//     },
//   ],
// })
const timeblockSchema = new Schema({
  day_fk: {
    type: Schema.Types.ObjectId,
    ref: 'Day',
  },
  timeblock: {
    type: Map,
    of: String,
  },
})

const Timeblock = models.Timeblock || model('Timeblock', timeblockSchema)

export default Timeblock
