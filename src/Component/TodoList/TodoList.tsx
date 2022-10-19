import React, { useState } from "react"

import Todo from "../../Model/Todo"
import TodoItem from "./TodoItem/TodoItem"
import { allAction } from "../../Redux/allAction"
import { useDispatch } from "react-redux"
import { MODAL_TYPE } from "../../Enum/MODAL_TYPE"
import Modal from "../../Model/Modal"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../Config/Firebase"

const TodoList: React.FC<{ items: Todo[] }> = (props) => {
  console.log(props.items)
  const dispatch = useDispatch()

  const [newItemName, setNewItemName] = useState<string>("")

  const setIsFinish = (text: string): void => {
    dispatch({
      type: allAction.SET_FINISH,
      // item id
      data: text,
    })
  }

  const onRemove = (todoID: string): void => {
    console.log(todoID)

    dispatch({
      type: allAction.SET_MODAL,
      Modal: new Modal(MODAL_TYPE.DELETE_TODO, true),
      data: todoID,
    })
  }

  const onCreate = (text: string): void => {
    dispatch({
      type: allAction.ADD_ITEM,
      data: new Todo(text),
    })
  }
  return (
    <div>
      <ul>
        {props.items.map((e: Todo, index: number) => {
          console.log(e)
          return (
            <TodoItem
              key={index}
              data={e}
              onRemove={onRemove}
              setIsFinish={setIsFinish}
            />
          )
        })}
      </ul>
      <input
        style={{
          padding: "2px",
          borderRadius: "0.75em",
          backgroundColor: "lightgray",
          margin: "4px 0",
        }}
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
      />

      <button
        style={{
          textAlign: "center",
          margin: "4px 0",
          backgroundColor: "lightgreen",
          borderRadius: "0.75em",
        }}
        onClick={() => {
          onCreate(newItemName)
          // reset item name
          setNewItemName("")
        }}>
        Submit
      </button>
    </div>
  )
}
export default TodoList
