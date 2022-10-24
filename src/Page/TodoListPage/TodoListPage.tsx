import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { withRouter } from "react-router-dom"
import TodoList from "../../Component/TodoList/TodoList"

import { ApplicationState } from "../../Redux/reducers/rootReducer"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../Config/Firebase"
import { todoDataHandler } from "../../Redux/reducers-actions/TodoActions"
import { allAction } from "../../Redux/allAction"
import Todo from "../../Model/Todo"
import classes from "./TodoListPage.module.css"
import Folder from "../../Model/Folder"

const TodoListPage: React.FC = (props) => {
  const dispatch = useDispatch()
  const todos = useSelector((state: ApplicationState) => {
    return state.todoReducer.allTodo
  })
  const userState = useSelector((state: any) => {
    return state.authReducer.userdata
  })

  const [folderName, setFolderName] = useState<string>("")

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "LOGIN", userdata: user })
        setTodo(user)
      } else {
        dispatch({ type: allAction.SET_ITEM, data: [] })
      }
    })
  }, [auth])

  const setTodo = async (userdata: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const todoData: Todo[] = await todoDataHandler(userdata)
    dispatch({
      type: allAction.SET_ITEM,
      data: todoData as Todo[],
    })
  }

  const createFolder = (name: string, userID: string): void => {
    const newFolder = new Folder(name, userID)
  }

  if (Array.isArray(todos)) {
    return (
      <div>
        <div>
          <TodoList items={todos} />
        </div>
        <div>
          <input
            style={{
              padding: "2px",
              borderRadius: "0.75em",
              backgroundColor: "lightgray",
              margin: "4px 0",
            }}
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <button
            type="button"
            className={classes.button}
            onClick={() => {
              createFolder(folderName, userState.uid)
              setFolderName("")
            }}>
            + Add Folder
          </button>
        </div>
      </div>
    )
  }
  return <div>loading...</div>
}

export default withRouter(TodoListPage)
