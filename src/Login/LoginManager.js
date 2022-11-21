import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { useHistory } from "react-router-dom"
import { auth } from "../Config/Firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LoginManager = () => {
  const authDispatch = useDispatch()
  const isLoginState = useSelector((state) => state.authReducer.isLogin)
  const userState = useSelector((state) => state.authReducer.userdata)
  let history = useHistory()

  const logoutHandler = () => {
    signOut(auth).then(() => {
      authDispatch({ type: "LOGOUT" })
      history.push("/")
    })
  }

  const loginHandler = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        authDispatch({ type: "LOGIN", userdata: result.user })
        history.push("/todolist/" + result.user.uid)
      })
      .catch((er) => {
        console.log(er)
      })
  }

  if (!isLoginState) {
    return (
      <div className=" m-3 box-content w-fit rounded-md bg-yellow-300 shadow active:bg-yellow-100">
        <i className="fa-solid fa-right-to-bracket pl-2 "></i>
        <button
          onClick={loginHandler}
          className="font-xl m-1 p-2 text-center text-2xl font-semibold">
          Login
        </button>
      </div>
    )
  }
  return (
    // <div>
    //   <div className="ml-1.5 box-content w-fit items-center rounded-md bg-yellow-300 shadow active:bg-yellow-100">
    //     <i className="fa-solid fa-user ml-2 rounded-full bg-slate-400/50 p-3"></i>
    //     <button
    //       className="font-xl p-2 text-center text-2xl font-semibold"
    //       onClick={logoutHandler}>
    //       {userState.displayName}
    //     </button>
    //   </div>
    // </div>
    <div className="dropdown-end dropdown">
      <button className="btn m-2 w-fit items-center gap-2 rounded-md border-none bg-yellow-300 text-black shadow hover:bg-yellow-100 focus:bg-yellow-100 md:text-2xl md:btn-lg">
        <i className="fa-solid fa-user ml-2 rounded-full bg-slate-400/50 p-3"></i>
        {userState.displayName}
      </button>
      <ul
        tabIndex="0"
        className="dropdown-content menu rounded-box w-[250px] bg-base-100 p-3 text-2xl shadow max-sm:w-[200px] max-sm:text-lg">
        <li>
          <a>Member Info</a>
        </li>
        <li>
          <a onClick={logoutHandler}>Logout</a>
        </li>
      </ul>
    </div>
  )
}

export default LoginManager
