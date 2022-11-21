import React from "react"
import { Route, Switch } from "react-router-dom"
import TodoList from "./Page/TodoListPage/TodoListPage"
import MainPage from "./Page/MainPage/MainPage"
import SideMenu from "./Component/Layout/SideMenu/SideMenu"

const RouterManager = () => {
  return (
    <div className="mt-28 h-full grid-cols-[90px_auto] max-sm:mt-24 max-sm:flex max-sm:h-fit max-sm:flex-col-reverse sm:grid">
      <SideMenu />
      <div className="m-3">
        <Switch>
          <Route path="/folder/:folderID">
            <TodoList />
          </Route>
          <Route path="/todolist/:uid">
            <TodoList />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </div>
    </div>
  )
}
export default RouterManager
