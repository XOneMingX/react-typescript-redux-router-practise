import React from "react"

import Todo from "../../../Model/Todo"

interface propsState {
  data: Todo
  setIsFinish: (id: string) => void
  onRemove: (id: string) => void
}

const TodoItem: React.FC<propsState> = (props) => {
  console.log(props.data)
  console.log(props.data.text)

  return (
    <li
      key={props.data.id}
      style={{ display: "grid", gridTemplateColumns: "auto 40px 40px" }}>
      <div
        style={
          props.data.isFinish
            ? { textDecoration: "underline", color: "lightgray" }
            : { color: "grey" }
        }>
        {props.data.text}
      </div>
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
