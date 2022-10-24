import React, { useEffect, useState } from "react"

import Todo from "../../../Model/Todo"
import { allAction } from "../../../Redux/allAction"
import { useDispatch } from "react-redux"

export function timeStampToString(ts: number) {
  const date = new Date(ts * 1000)
  if (date.getDate() < 10) {
    const dateDay = "0" + date.getDate()
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + dateDay
  }
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
}

interface propsState {
  data: Todo
  setIsFinish: (id: string) => void
  onRemove: (id: string) => void
  updateItem: (data: Todo) => void
}

const TodoItem: React.FC<propsState> = (props) => {
  const dispatch = useDispatch()

  const [isEdited, setIsEdited] = useState(false)
  const [isInitial, setIsInitial] = useState(false)
  const [deadline, setDeadline] = useState()

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
    } else {
      setIsEdited(true)
    }
  }, [props.data])

  useEffect(() => {
    if (typeof props.data.deadline === "string") {
      console.log("1")
      setDeadline(props.data.deadline)
    } else {
      console.log("2")
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setDeadline(timeStampToString(props.data.deadline.seconds))
    }
  }, [props.data.deadline])

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
