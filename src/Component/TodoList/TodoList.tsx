import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import Todo from "../../Model/Todo"
import TodoItem from "./TodoItem/TodoItem"
import { allAction } from "../../Redux/allAction"
import { MODAL_TYPE } from "../../Enum/MODAL_TYPE"
import Modal from "../../Model/Modal"
import {
  addTodoToDatabase,
  delTodoFromDatabase,
  todoDataHandler,
  updateTodoDataInDatabase,
} from "../../Redux/reducers-actions/TodoActions"
import { auth } from "../../Config/Firebase"
import { ApplicationState } from "../../Redux/reducers/rootReducer"

const TodoList: React.FC<{ items: Todo[] }> = (props) => {
  const dispatch = useDispatch()
  const params = useParams()

  const [newItemName, setNewItemName] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState(false)

  const userState = useSelector((state: ApplicationState) => {
    return state.authReducer.userdata
  })!

  useEffect(() => {
    if (userState && userState !== undefined) {
      if (Object.keys(userState).length !== 0) {
        setIsLoaded(true)
      } else {
        setIsLoaded(false)
      }
    }
  }, [userState])

  useEffect(() => {
    if (isLoaded) {
      if (userState.uid !== undefined && params.folderID !== undefined) {
        setFolderTodo(userState.uid, params.folderID)
      } else {
        setFolderTodo(userState.uid, "")
      }
    }
  }, [params, isLoaded])

  const setFolderTodo = async (userID: string, folderID: string) => {
    const todoData: Todo[] = await todoDataHandler(userID, folderID)
    dispatch({
      type: allAction.SET_ITEM,
      data: todoData as Todo[],
    })
  }

  const setIsFinish = (todoID: string): void => {
    dispatch({
      type: allAction.SET_FINISH,
      // item id
      data: todoID,
    })
  }

  const onRemove = (todoID: string): void => {
    console.log(todoID)

    dispatch({
      type: allAction.SET_MODAL,
      Modal: new Modal(MODAL_TYPE.DELETE_TODO, true),
      data: todoID,
    })

    delTodoFromDatabase(todoID)
  }

  const onCreate = (text: string, userID: string, folderID: string): void => {
    const newTodo = new Todo(text, userID, folderID)

    dispatch({
      type: allAction.ADD_ITEM,
      data: newTodo,
    })

    addTodoToDatabase(newTodo)
  }

  const updateItem = (todo: Todo): void => {
    updateTodoDataInDatabase(todo)
  }

  return (
    <div>
      <ul>
        {props.items.map((e: Todo, index: number) => {
          return (
            <TodoItem
              key={index}
              data={e}
              onRemove={onRemove}
              setIsFinish={setIsFinish}
              updateItem={updateItem}
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
          onCreate(
            newItemName,
            userState.uid,
            params.folderID ? params.folderID : ""
          )
          // reset item name
          setNewItemName("")
        }}>
        Submit
      </button>
    </div>
  )
}
export default TodoList
