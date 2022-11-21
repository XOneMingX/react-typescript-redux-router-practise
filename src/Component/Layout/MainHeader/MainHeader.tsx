import React from "react"
import LoginManager from "../../../Login/LoginManager"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { ApplicationState } from "../../../Redux/reducers/rootReducer"

const MainHeader: React.FC = () => {
  const userState = useSelector((state: ApplicationState) => {
    return state.authReducer.userdata
  })

  return (
    <header className="fixed top-0 z-10 flex w-full items-center justify-between border-none bg-blue-100 p-2 shadow-md">
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
