import React, { useState } from "react"

import Todo from "../../Model/Todo"
import TodoItem from "./TodoItem/TodoItem"
import { allAction } from "../../Redux/allAction"
import { useDispatch, useSelector } from "react-redux"
import { MODAL_TYPE } from "../../Enum/MODAL_TYPE"
import Modal from "../../Model/Modal"
import {
  addTodoToDatabase,
  delTodoFromDatabase,
} from "../../Redux/reducers-actions/TodoActions"

const TodoList: React.FC<{ items: Todo[] }> = (props) => {
  const dispatch = useDispatch()

  const [newItemName, setNewItemName] = useState<string>("")

  const userState = useSelector((state: any) => {
    return state.authReducer.userdata
  })

  const setIsFinish = (todoID: string): void => {
    dispatch({
      type: allAction.SET_FINISH,
      // item id
      data: todoID,
    })
  }

  const setTodoColor = (todo: Todo): void => {
    dispatch({
      type: allAction.SET_COLOR,
      data: todo,
    })
  }

  const onRemove = (todoID: string): void => {
    console.log(todoID)

    dispatch({
      type: allAction.SET_MODAL,
      Modal: new Modal(MODAL_TYPE.DELETE_TODO, true),
      data: todoID,
    })

    delTodoFromDatabase(userState, todoID)
  }

  const onCreate = (text: string): void => {
    const newTodo = new Todo(text)

    dispatch({
      type: allAction.ADD_ITEM,
      data: newTodo,
    })

    addTodoToDatabase(userState, newTodo)
  }

  return (
    <div>
      <ul>
        {props.items.map((e: Todo, index: number) => {
          return (
            <TodoItem
              key={index}
              data={e}
              user={userState}
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
