import React, { useEffect, useState } from "react"

import Todo from "../../../Model/Todo"
import { updateTodoDataInDatabase } from "../../../Redux/reducers-actions/TodoActions"

interface propsState {
  data: Todo
  user: any
  setIsFinish: (id: string) => void
  onRemove: (id: string) => void
}

const TodoItem: React.FC<propsState> = (props) => {
  const [isInitial, setIsInitial] = useState(false)
  const [isEdited, setIsEdited] = useState(false)
  const [color, setColor] = useState("")

  const saveChangeHandler = () => {
    setIsEdited(false)
  }

  const cancelChangeHandler = () => {
    setIsEdited(false)
  }

  useEffect(() => {
    if (isInitial) {
      setIsEdited(true)
    } else {
      setIsInitial(true)
    }
  }, [props.data.isFinish, color])

  return (
    <li
      key={props.data.id}
      style={{
        display: "grid",
        gridTemplateColumns: "auto 40px 40px",
        backgroundColor: color,
      }}>
      <div
        style={
          props.data.isFinish
            ? { textDecoration: "underline", color: "lightgray" }
            : { color: "grey" }
        }>
        {props.data.text}
        <div>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            id="deadline"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
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
        <button onClick={() => props.setIsFinish(props.data.id)}>OK</button>
      </div>
      <div>
        <button onClick={() => props.onRemove(props.data.id)}>X</button>
      </div>
    </li>
  )
}
export default TodoItem
