import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { withRouter } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

import TodoList from "../../Component/TodoList/TodoList"
import { ApplicationState } from "../../Redux/reducers/rootReducer"
import { auth } from "../../Config/Firebase"
import { allAction } from "../../Redux/allAction"
import FolderList from "../../Component/FolderList/FolderList"
import { newUserHandler } from "../../Redux/reducers-actions/AuthAction"

const TodoListPage: React.FC = () => {
  const dispatch = useDispatch()

  const todos = useSelector((state: ApplicationState) => {
    return state.todoReducer.allTodo
  })
  const folders = useSelector((state: any) => {
    return state.folderReducer.allFolders
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "LOGIN", userdata: user })
        newUserHandler(user)
        //setInitialComponents(user)
      } else {
        dispatch({ type: allAction.SET_FOLDER, data: [] })
        dispatch({ type: allAction.SET_ITEM, data: [] })
      }
    })
  }, [auth])

  // const setInitialComponents = async (userData: any) => {
  //   console.log(userData)
  //   await newUserHandler(userData)
  //   const folderData: Folder[] = await folderDataHandler(userData.uid)
  //   dispatch({ type: allAction.SET_FOLDER, data: folderData as Folder[] })
  //
  //   const todoData: Todo[] = await todoDataHandler(userData.uid)
  //   dispatch({
  //     type: allAction.SET_ITEM,
  //     data: todoData as Todo[],
  //   })
  // }

  if (Array.isArray(todos)) {
    return (
      <div>
        <div>
          <FolderList folders={folders} />
          <TodoList items={todos} />
        </div>
      </div>
    )
  }
  return <div>loading...</div>
}

export default withRouter(TodoListPage)
