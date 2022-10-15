import React from "react"
import { useSelector } from "react-redux"
import { withRouter } from "react-router-dom"
import TodoList from "../../Component/TodoList/TodoList"

import { ApplicationState } from "../../Redux/reducers/rootReducer"

const TodoListPage: React.FC = (props) => {
  const todos = useSelector((state: ApplicationState) => {
    return state.todoReducer.allTodo
  })

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
