import React from "react"
import { useSelector } from "react-redux"

const SideMenu = () => {
  const userState = useSelector((state) => {
    return state.authReducer.userdata
  })

  return (
    <div className="flex h-full flex-col items-center gap-10 shadow max-sm:h-fit max-sm:flex-row max-sm:justify-around">
      <a
        href={
          userState && userState.uid !== undefined
            ? "/todolist/" + userState.uid
            : "/"
        }
        className="w-full">
        <button className="btn-lg w-full p-0 hover:bg-slate-200">
          <i className="fa-solid fa-list fa-xl"></i>
          <p className="font-xl max-md:clear-both max-[500px]:hidden">
            Todo List
          </p>
        </button>
      </a>
      <a href="/reminder" className="w-full">
        <button className="btn-lg w-full p-0 hover:bg-slate-200">
          <i className="fa-solid fa-bell fa-xl"></i>
          <p className="max-md:clear-both max-[500px]:hidden">Reminder</p>
        </button>
      </a>
      <a href="/completed" className="w-full">
        <button className="btn-lg w-full p-0 hover:bg-slate-200">
          <i className="fa-solid fa-check fa-xl"></i>
          <p className="max-md:clear-both max-[500px]:hidden">Completed</p>
        </button>
      </a>
      <a href="/rubbishBin" className="w-full">
        <button className="btn-lg w-full p-0 hover:bg-slate-200">
          <i className="fa-solid fa-trash fa-xl"></i>
          <p className="max-md:clear-both max-[500px]:hidden">Trash</p>
        </button>
      </a>
      <a href="/setting" className="w-full">
        <button className="btn-lg w-full p-0 hover:bg-slate-200">
          <i className="fa-solid fa-gear fa-xl"></i>
          <p className="max-md:clear-both max-[500px]:hidden">Setting</p>
        </button>
      </a>
    </div>
  )
}

export default SideMenu
