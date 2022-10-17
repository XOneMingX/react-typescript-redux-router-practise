import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { withRouter } from "react-router-dom"
import TodoList from "../../Component/TodoList/TodoList"

import { ApplicationState } from "../../Redux/reducers/rootReducer"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../Config/Firebase"
import { todoDataHandler } from "../../Redux/reducers-actions/TodoActions"
import { allAction } from "../../Redux/allAction"
import Todo from "../../Model/Todo"

const TodoListPage: React.FC = (props) => {
  const dispatch = useDispatch()
  const todos = useSelector((state: ApplicationState) => {
    return state.todoReducer.allTodo
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "LOGIN", userdata: user })
        setTodo(user)
      }
    })
  }, [dispatch])

  const setTodo = async (userdata: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const todoData: Todo[] = await todoDataHandler(userdata)
    console.log(todoData)
    dispatch({
      type: allAction.SET_ITEM,
      data: todoData as Todo[],
    })
  }

  if (Array.isArray(todos)) {
    return (
      <div>
        <TodoList items={todos} />
      </div>
    )
  }
  return <div>loading...</div>
}

export default withRouter(TodoListPage)
