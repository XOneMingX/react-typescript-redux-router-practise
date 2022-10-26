import React, { useEffect, useState } from "react"

import Todo from "../../../Model/Todo"
import { allAction } from "../../../Redux/allAction"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

export function timeStampToString(ts: number) {
  const timeStamp = new Date(ts * 1000)
  let timeStampMonth
  let timeStampDay
  if (timeStamp.getMonth() + 1 < 10) {
    timeStampMonth = (timeStamp.getMonth() + 1).toString().padStart(2, "0")
  } else {
    timeStampMonth = timeStamp.getMonth() + 1
  }
  if (timeStamp.getDate() < 10) {
    timeStampDay = ("0" + timeStamp.getDate()).slice(-2)
  } else {
    timeStampDay = timeStamp.getDate()
  }

  return timeStamp.getFullYear() + "-" + timeStampMonth + "-" + timeStampDay
}

function dateTypeToString(date: Date) {
  date = new Date(date)
  let dateMonth
  let dateDay
  if (date.getMonth() + 1 < 10) {
    dateMonth = (date.getMonth() + 1).toString().padStart(2, "0")
  } else {
    dateMonth = date.getMonth() + 1
  }
  if (date.getDate() < 10) {
    dateDay = ("0" + date.getDate()).slice(-2)
  } else {
    dateDay = date.getDate()
  }

  return date.getFullYear() + "-" + dateMonth + "-" + dateDay
}

interface propsState {
  data: Todo
  setIsFinish: (id: string) => void
  onRemove: (id: string) => void
  updateItem: (data: Todo) => void
}

const TodoItem: React.FC<propsState> = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [isEdited, setIsEdited] = useState(false)
  const [isInitial, setIsInitial] = useState(false)

  const [deadline, setDeadline] = useState("")

  const setItemUpdate = (data: {
    id: string
    fieldName: string
    data: any
  }): void => {
    dispatch({
      type: allAction.UPDATE_ITEM,
      data: data,
    })
  }

  const saveChangeHandler = () => {
    props.updateItem(props.data)
    setIsEdited(false)
  }

  const cancelChangeHandler = () => {
    setIsEdited(false)
  }

  useEffect(() => {
    if (!isInitial) {
      setIsInitial(true)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setDeadline(timeStampToString(props.data.deadline.seconds))
    } else {
      //console.log("edit")
      setIsEdited(true)
    }
  }, [props.data, props.data.isFinish])

  useEffect(() => {
    convertDate()
    return history.listen(() => {
      // console.log("history")
      //convertDate()
      setIsEdited(false)
      setIsInitial(false)
    })
  }, [history, props.data.deadline])

  const convertDate = () => {
    if (isInitial) {
      if (typeof props.data.deadline === "string") {
        setDeadline(props.data.deadline)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } else if (typeof props.data.deadline.seconds === "number") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setDeadline(timeStampToString(props.data.deadline.seconds))
      } else {
        setDeadline(dateTypeToString(props.data.deadline))
      }
    }
  }

  return (
    <li
      key={props.data.id}
      style={{
        display: "grid",
        gridTemplateColumns: "auto 300px 30px 60px 30px",
        backgroundColor: props.data.color,
      }}>
      <div
        style={
          props.data.isFinish
            ? { textDecoration: "underline", color: "lightgray" }
            : { color: "grey" }
        }>
        {props.data.text}
      </div>
      <div>
        <label htmlFor="color">Color:</label>
        <input
          type="color"
          id="color"
          value={props.data.color}
          onChange={(e) => {
            setItemUpdate({
              id: props.data.id,
              fieldName: "color",
              data: e.target.value,
            })
          }}
        />
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          id="deadline"
          value={deadline}
          onChange={(e) => {
            setItemUpdate({
              id: props.data.id,
              fieldName: "deadline",
              data: new Date(e.target.value),
            })
          }}
        />
      </div>

      <div>
        <button onClick={() => props.setIsFinish(props.data.id)}>OK</button>
      </div>

      {isEdited ? (
        <div>
          <div>
            <button onClick={saveChangeHandler}>Save</button>
          </div>
          <div>
            <button onClick={cancelChangeHandler}>Cancel</button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div>
        <button onClick={() => props.onRemove(props.data.id)}>X</button>
      </div>
    </li>
  )
}
export default TodoItem
