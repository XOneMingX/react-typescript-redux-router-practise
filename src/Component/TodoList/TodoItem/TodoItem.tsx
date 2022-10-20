import React, { useEffect, useState } from "react"

import Todo from "../../../Model/Todo"

interface propsState {
  data: Todo
  setIsFinish: (id: string) => void
  onRemove: (id: string) => void
  setTodoColor: (id: string, color: string) => void
  setTodoDeadline: (id: string, deadline: Date) => void
  updateItem: (data: Todo) => void
}

const TodoItem: React.FC<propsState> = (props) => {
  const [isEdited, setIsEdited] = useState(false)
  const [isInitial, setIsInitial] = useState(false)
  const [deadline, setDeadline] = useState("")
  const [color, setColor] = useState("")

  const saveChangeHandler = () => {
    if (color !== "") {
      console.log(color)
      props.setTodoColor(props.data.id, color)
    }
    if (deadline !== "") {
      console.log(deadline)
      props.setTodoDeadline(props.data.id, new Date(deadline))
    }

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
  }, [props.data.isFinish, color, deadline])

  // useEffect(() => {
  //   props.setTodoColor(props.data.id, color)
  // }, [color])
  //
  // useEffect(() => {
  //   props.setTodoDeadline(props.data.id, new Date(deadline))
  // }, [deadline])

  return (
    <li
      key={props.data.id}
      style={{
        display: "grid",
        gridTemplateColumns: "auto 300px 30px 60px 30px",
        backgroundColor: color,
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
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <label htmlFor="deadline">Deadline:</label>
        <input
          type="date"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
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
