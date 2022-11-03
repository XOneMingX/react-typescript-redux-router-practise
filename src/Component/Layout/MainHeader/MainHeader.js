import React from "react"
import LoginManager from "../../../Login/LoginManager"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const MainHeader = (props) => {
  const userState = useSelector((state) => {
    return state.authReducer.userdata
  })

  return (
    <header className="fixed top-0 z-10 flex w-screen items-center justify-between border bg-blue-100 p-5">
      <div>
        <Link
          to={
            userState && userState.uid !== undefined
              ? "/todolist/" + userState.uid
              : "/"
          }>
          <h1 className="text-3xl font-bold">ToDo List</h1>
        </Link>
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <LoginManager />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default MainHeader
