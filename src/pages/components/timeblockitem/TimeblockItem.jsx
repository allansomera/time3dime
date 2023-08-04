import "./TimeblockItem.scss"
import { Draggable } from "@hello-pangea/dnd"

const TimeblockItem = ({ item, getColor }) => {
  return (
    item.type && (
      <Draggable
        key={item.day_timeblock_id}
        draggableId={item.day_timeblock_id}
        index={0}
      >
        {(provided, snapshot) => {
          return (
            <div
              className="container"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                userSelect: "none",
                // width: 80,
                // padding: 16,
                // margin: "0 0 8px 0",
                minHeight: "10px",
                // backgroundColor: snapshot.isDragging ? "#000000" : "#456c86",
                backgroundColor: snapshot.isDragging ? "#000000" : "#ffffff",
                color: snapshot.isDragging ? "#ffffff" : "#000000",
                ...provided.draggableProps.style,
              }}
            >
              <div
                className="container__leftbar"
                style={{ backgroundColor: getColor(item.type) }}
              ></div>
              <div className="container__itemCon">{item.type}</div>
            </div>
          )
        }}
      </Draggable>
    )
  )
}
export default TimeblockItem
