import React from "react"
import { Route, Switch } from "react-router-dom"
import TodoList from "./Page/TodoListPage/TodoListPage"
import MainPage from "./Page/MainPage/MainPage"

const RouterManager = () => {
  return (
    <div>
      <Switch>
        <Route path="/todolist/:uid">
          <TodoList />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </div>
  )
}
export default RouterManager
