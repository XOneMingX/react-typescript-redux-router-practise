import React from "react"
import MainHeader from "./MainHeader/MainHeader"

const Layout = (props) => {
  return (
    <React.Fragment>
      <div>
        <MainHeader />
      </div>
      <main>{props.children}</main>
    </React.Fragment>
  )
}

export default Layout
