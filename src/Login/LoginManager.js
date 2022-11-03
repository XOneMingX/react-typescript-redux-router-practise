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
      <div className=" box-content w-fit rounded-md bg-yellow-300 shadow active:bg-yellow-100">
        <i className="fa-solid fa-right-to-bracket pl-1.5"></i>
        <button
          onClick={loginHandler}
          className="font-xl p-2 text-center font-semibold">
          Login
        </button>
      </div>
    )
  }
  return (
    <div>
      <p>Hi!{userState.displayName}</p>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default LoginManager
