import React, { useState, useEffect } from "react"
// import { Chart } from "primereact/chart"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

const DonutChart = ({ timeblocks, tags, getColor }) => {
  // console.log("DonutChart", timeblocks)
  // console.log("tagColors", tagColors)

  // const taglables = tags.map((t) => {
  //   return t.type
  // })
  //
  // const tagColors = tags.map((t) => {
  //   return getColor(t.type)
  // })

  const tagObj = {}

  const countTagsQty = (timeblocks) => {
    timeblocks.map((tb) => {
      tagObj[tb.type] = ++tagObj[tb.type] || 1
    })
  }

  countTagsQty(timeblocks)

  if (tagObj["null"]) delete tagObj["null"]

  const current_tag_entries = Object.keys(tagObj).filter((e) => {
    return e != null
  })
  console.log("current_tag_entries", current_tag_entries)

  // current_tag_entries.forEach(key => {
  //   cur
  // })

  const qty = current_tag_entries.map((tl) => {
    return tagObj[tl]
  })

  console.log("qty", qty)

  const current_label_colors = current_tag_entries.map((cte) => {
    return getColor(cte)
  })
  console.log("current_label_colors", current_label_colors)

  // console.log("tagObject", tagObj)
  // console.log("taglables", taglables)
  // console.log("tagObject_qty", tagObj[taglables[0]])

  // const qty = tags.map(t)
  // console.log("tagObj", tagObj)

  // console.log("qty", qty)

  //
  // countTagsQty()
  // timeblocks.forEach((i) => console.log(i.type))
  let data = {
    labels: current_tag_entries,
    datasets: [
      {
        data: qty,
        backgroundColor: current_label_colors,
        hoverBackgroundColor: current_label_colors,
      },
    ],
  }

  // let [chartData, setChartdata] = useState(data)

  const lightOptions = {
    plugins: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: "right",
        labels: {
          color: "#ffffff",
          font: {
            size: 24,
          },
        },
      },
    },
  }

  // useEffect(() => {
  //   setChartdata = {
  //     labels: current_tag_entries,
  //     datasets: [
  //       {
  //         data: qty,
  //         backgroundColor: current_label_colors,
  //         hoverBackgroundColor: current_label_colors,
  //       },
  //     ],
  //   }
  // }, [timeblocks])

  return (
    <>
      <Doughnut data={data} options={lightOptions} />
    </>
  )
}
export default DonutChart
