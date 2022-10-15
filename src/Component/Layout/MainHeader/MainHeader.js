import React from "react"
import classes from "./MainHeader.module.css"
import LoginManager from "../../../Login/LoginManager"

const MainHeader = (props) => {
  return (
    <header className={classes.header}>
      <h1>ToDo List</h1>
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
