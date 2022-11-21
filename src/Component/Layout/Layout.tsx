import React from "react"
import MainHeader from "./MainHeader/MainHeader"

const Layout: React.FC = (props) => {
  return (
    <div className="flex">
      <MainHeader />
      <main className="h-full w-screen overflow-hidden">{props.children}</main>
    </div>
  )
}

export default Layout
