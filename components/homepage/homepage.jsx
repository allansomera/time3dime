import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { resetServerContext } from '@hello-pangea/dnd'
// import Logo from '@/components/logo/Logo'
// import Logo_time from '@/components/logo/Logo_time'
// import Logo_block from '@/components/logo/Logo_block'
// import DateComp from '@/components/date-comp/DateComp'
// import DonutChart from '@/components/donut-chart/DonutChart'
import styles from './homepage.module.scss'
import TimeblockContainer from '@components/timeblock-container/TimeblockContainer'
import DUMMY_DATA, { TAGS } from '@lib/dummy_data'
// import DateComp from '@components/date-comp/DateComp'

// const tags = [
//   { id: uuidv4(), name: "sleep" },
//   { id: uuidv4(), name: "work" },
//   { id: uuidv4(), name: "gym" },
//   { id: uuidv4(), name: "eat" },
//   { id: uuidv4(), name: "free" },
// ]

import dynamic from 'next/dynamic'
const DragDropContext = dynamic(
  () =>
    import('@hello-pangea/dnd').then((mod) => {
      return mod.DragDropContext
    }),
  { ssr: false }
)
const Droppable = dynamic(
  () =>
    import('@hello-pangea/dnd').then((mod) => {
      return mod.Droppable
    }),
  { ssr: false }
)
const Draggable = dynamic(
  () =>
    import('@hello-pangea/dnd').then((mod) => {
      return mod.Draggable
    }),
  { ssr: false }
)

const URL = 'http://localhost:8080'

const tagColors = {
  gym: '#0000ff',
  free: '#ff00ff',
  sleep: '#fb2600',
  school: '#6600ff',
  eat: '#fbc800',
  code: '#463848',
}

const getColor = (type) => {
  return tagColors[type]
}

// const URL = "http://localhost:8080"
// const URL = 'https://time3dime-be.onrender.com'
// const u_id = "2922c286-16cd-4d43-ab98-c79f698aeab0"

const getObject = (timeblocks, dest) => {
  return timeblocks.filter((o) => {
    return o.day_timeblock_id === dest
  })
}

const onDragEnd = (
  result,
  timeblocks,
  tagsColumn,
  setTimeblocks,
  setTagsColumn
) => {
  if (!result.destination) return
  // console.log("slots", slots)
  const { source, destination } = result
  console.log('result', result)
  console.log('source', source)
  console.log('destination', destination)
  let sourceColumn = {}
  let destColumn = {}
  if (source.droppableId !== destination.droppableId) {
    if (tagsColumn.hasOwnProperty(source.droppableId)) {
      // console.log("has property", tagsColumn.hasOwnProperty(source.droppableId))
      sourceColumn = tagsColumn[source.droppableId]
      destColumn = getObject(timeblocks, destination.droppableId)[0]
      const destTarget_idx = timeblocks.findIndex(
        (o) => o.day_timeblock_id === destination.droppableId
      )
      const sourceItems = [...sourceColumn.tags]
      const [removed] = sourceItems.splice(source.index, 1)
      const destColumn_copy = {
        ...destColumn,
        type: removed.type,
      }
      const new_timeblocks = [...timeblocks]
      new_timeblocks[destTarget_idx] = destColumn_copy
      setTimeblocks(new_timeblocks)
      setTagsColumn(tagsColumn)
    } else {
      sourceColumn = getObject(timeblocks, source.droppableId)[0]
      destColumn = getObject(timeblocks, destination.droppableId)[0]

      console.log('sourceColumn: ', sourceColumn)
      console.log('destColumn: ', destColumn)
      // find source index
      const sourceTarget_idx = timeblocks.findIndex(
        (o) => o.day_timeblock_id === source.droppableId
      )
      // find destination index
      const destTarget_idx = timeblocks.findIndex(
        (o) => o.day_timeblock_id === destination.droppableId
      )

      // change source timeslot type to null
      const sourceColumn_copy = {
        ...sourceColumn,
        type: null,
      }

      // change destination timeslot to a copy of the source
      const destColumn_copy = {
        ...destColumn,
        type: sourceColumn.type,
      }
      const new_timeblocks = [...timeblocks]
      new_timeblocks[sourceTarget_idx] = sourceColumn_copy
      new_timeblocks[destTarget_idx] = destColumn_copy
      // setTimeblocks(new_timeblocks)
      setTimeblocks((prev) => {
        return [...new_timeblocks]
      })
      console.log('new_timeblocks: ', new_timeblocks)
    }
  } else {
    // console.log("same droppableId")
    // console.log("result", result)
    // console.log("source", source)
    // console.log("destination", destination)
    // sourceColumn = getObject(timeblocks, source.droppableId)
    // destColumn = getObject(timeblocks, destination.droppableId)
    // const [removed] = copiedItems.splice(source.index, 1)
    // copiedItems.splice(destination.index, 0, removed)
    // setSlots({
    //   ...slots,
    //   [source.droppableId]: {
    //     ...slot,
    //     tags: copiedItems,
    //   },
    // })
  }
}

// const backend_tags = await axios.get(`${URL}/users/1/tags`)
// const backend_tags = TAGS

const tagSlot = {
  [uuidv4()]: {
    slot: 'tags',
    tags: TAGS,
  },
}

const Homepage = (props) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const { id, day_id } = useParams()
  const params = useParams()

  const [timeblocks, setTimeblocks] = useState([])
  // const [usertags, setUserTags] = useState([])
  const [tagsColumn, setTagsColumn] = useState(tagSlot)

  // setTimeblocks(props.data)

  useEffect(() => {
    // if (typeof window !== 'undefined') {
    if (process.browser) {
      setIsBrowser(true)
    }
    const getTimeblocks = async () => {
      const { data } = await axios.get(`${URL}/users/1/day/1`)
      // console.log("data", data)
      // if (!data) console.log(`no data for user ${id} for ${day_id} `)
      // let data = DUMMY_DATA
      // console.log('time_data: ', props.time_data)

      // setTimeblocks((prev) => {
      //   return [...DUMMY_DATA]
      // })
      // setTimeblocks(DUMMY_DATA)
      setTimeblocks(data)
      // setUserTags(tags.data)
    }
    getTimeblocks()
  }, [])

  // useEffect(() => {
  //   const getTimeblocks = () => {
  //     // const { data } = await axios.get(`${URL}/users/${id}/day/${day_id}`)
  //     // const { data } = await axios.get(`${URL}/users/1/day/1`)
  //     // console.log("data", data)
  //     // if (!data) console.log(`no data for user ${id} for ${day_id} `)
  //     // let data = DUMMY_DATA
  //     setTimeblocks(data)
  //     // setUserTags(tags.data)
  //   }
  //   getTimeblocks()
  // }, [timeblocks])

  const btn_handler = () => {
    const payload = { day_data: timeblocks }
    // const id = toast.loading("SAVING...")

    // toast.promise(axios.post(`${URL}/users/${id}/day/${day_id}`, payload), {
    //   pending: {
    //     render() {
    //       return 'SAVING..'
    //     },
    //     icon: false,
    //     position: 'top-left',
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: 'dark',
    //   },
    //   success: {
    //     render() {
    //       return 'SAVED!'
    //     },
    //     // other options
    //     icon: false,
    //     position: 'top-left',
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: 'dark',
    //   },
    // })
    //toast here
    // toast
    // console.log(res)
  }

  // console.log(slots)
  // console.log(Object.entries(slots))
  // onDragEnd={(result) => onDragEnd(result, slots, setSlots)}

  // useEffect(() => {
  //   // console.log("current state of slots", slots)
  //   console.log("current state of timeblock", timeblocks)
  //   console.log("current state of usertags", usertags)
  // }, [usertags, timeblocks])
  return (
    <>
      <DragDropContext
        onDragEnd={(result) =>
          onDragEnd(
            result,
            timeblocks,
            tagsColumn,
            setTimeblocks,
            setTagsColumn
          )
        }
      >
        <div className={styles['homepage']}>
          {/*
           * <div className="project_name">
           *   <div className="capstone">Time__</div>
           *   <div className="capstone2">_Triple</div>
           *   <div className="capstone">Dime__</div>
           * </div>
          <Logo />
          <Logo_time />
          <Logo_block />
           */}
          <div className={styles['testcolumn']}>
            {/*
             * <div className="datepicker">
             *   <DateComp />
             * </div>
             */}
            <div className={styles['tc_buttoncon']}>
              <button
                className={styles['tc_button']}
                onClick={() => btn_handler()}
              >
                SAVE
              </button>
            </div>
          </div>
          <div className={styles['column1']}>
            00:00 -- 05:30
            {timeblocks.slice(0, 12).map((droppable_item) => {
              return (
                <TimeblockContainer
                  droppable_item={droppable_item}
                  getColor={getColor}
                />
              )
            })}
          </div>
          <div className={styles['column2']}>
            06:00 -- 11:30
            {timeblocks.slice(12, 24).map((droppable_item) => {
              return (
                <TimeblockContainer
                  droppable_item={droppable_item}
                  getColor={getColor}
                />
              )
            })}
          </div>
          <div className={styles['column3']}>
            12:00 -- 17:30
            {timeblocks.slice(24, 36).map((droppable_item) => {
              return (
                <TimeblockContainer
                  droppable_item={droppable_item}
                  getColor={getColor}
                />
              )
            })}
          </div>
          <div className={styles['column4']}>
            18:00 -- 23:30
            {timeblocks.slice(36, 48).map((droppable_item) => {
              return (
                <TimeblockContainer
                  droppable_item={droppable_item}
                  getColor={getColor}
                />
              )
            })}
          </div>
          <div className={styles['column5']}>
            {Object.entries(tagSlot).map(([id, slot]) => {
              return (
                <div className={styles['timeslot']} key={id}>
                  <div className={styles['tagcolumn-title']}>
                    {'__' + slot.slot + '-_'}
                  </div>
                  <Droppable key={id} droppableId={id}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          className={styles['tag__column']}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? 'lightblue'
                              : '#f1433e',
                            //  : "lightgrey",
                            // padding: 20,
                            // width: 150,
                            minHeight: 50,
                          }}
                        >
                          {slot.tags.map((item, index) => {
                            return (
                              <Draggable
                                key={item.usertag_id}
                                draggableId={String(item.usertag_id)}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      className={styles['tag__type']}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: 'none',
                                        padding: 16,
                                        margin: '0 0 20px 0',
                                        minHeight: '30px',
                                        backgroundColor: snapshot.isDragging
                                          ? '#000000'
                                          : getColor(item.type),
                                        color: snapshot.isDragging
                                          ? item.type === 'eat'
                                            ? 'white'
                                            : 'white'
                                          : item.type === 'eat'
                                          ? 'black'
                                          : 'white',
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.type}
                                    </div>
                                  )
                                }}
                              </Draggable>
                            )
                          })}
                          {provided.placeholder}
                        </div>
                      )
                    }}
                  </Droppable>
                </div>
              )
            })}
          </div>
          {/*
           * <div className="chart">
           *   <DonutChart
           *     timeblocks={timeblocks}
           *     tags={backend_tags.data}
           *     getColor={getColor}
           *   />
           * </div>
           */}
        </div>
      </DragDropContext>
    </>
  )
}

// export const getServerSideProps = (context) => {
//   resetServerContext()
//   return { props: {} }
// }

// export const getStaticProps = async () => {
//   const { data } = await axios.get(`${URL}/users/1/day/1`)
//   console.log('staticProps data: ', data)
//   return {
//     props: {
//       time_data: [...data],
//     },
//   }
// }

export default Homepage
