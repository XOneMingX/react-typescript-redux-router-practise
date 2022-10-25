import React from "react"
import classes from "./MainHeader.module.css"
import LoginManager from "../../../Login/LoginManager"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const MainHeader = (props) => {
  const userState = useSelector((state) => {
    return state.authReducer.userdata
  })

  return (
    <header className={classes.header}>
      <Link to={userState ? "/todolist/" + userState.uid : "/"}>
        <h1>ToDo List</h1>
      </Link>
      v
      <nav>
        <ul>
          <li>
            <LoginManager />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainHeader
