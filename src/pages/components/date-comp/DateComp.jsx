import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker"
import axios from "axios"

import "react-datepicker/dist/react-datepicker.css"

const URL = "http://localhost:8080"
const DateComp = () => {
  let { id, day_id } = useParams()
  let navigate = useNavigate()

  const [date, setDate] = useState(new Date())
  const onChange = async (date) => {
    setDate(date)
    const [day, month, year] = date.toLocaleString().split(",")[0].split("/")
    const payload = {
      day,
      month,
      year,
    }
    const { data } = await axios.post(`${URL}/users/${id}/day/check`, payload)
    console.log("res data", data)
    if (!data.length) {
      const new_data = await axios.post(`${URL}/users/${id}/day/new`, payload)
      console.log("new_data", new_data.data)
      const { insertId } = new_data.data[0]
      console.log("insertId", insertId)
      const new_day = await axios.post(
        `${URL}/users/${id}/day/${insertId}/add`,
        {}
      )
      navigate(`/user/${id}/day/${insertId}`)
    } else {
      console.log("found timeslots")
      console.log("data exists", data)
      const { day_id, fk_user_id } = data[0]
      navigate(`/user/${fk_user_id}/day/${day_id}`)
    }
  }

  return <DatePicker selected={date} onChange={onChange} />
}

export default DateComp
