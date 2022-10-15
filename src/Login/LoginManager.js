import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { useHistory } from "react-router-dom"
import classes from "./LoginManager.module.css"
import { auth } from "../Config/Firebase"
import { getUserData } from "../Redux/reducers-actions/TodoActions"

const LoginManager = () => {
  const authDispatch = useDispatch()
  const isLoginState = useSelector((state) => state.authReducer.isLogin)
  const userState = useSelector((state) => state.authReducer.userdata)
  let history = useHistory()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authDispatch({ type: "LOGIN", userdata: user })
        getUserData(user.uid)
        history.push("/todolist/" + user.uid)
      }
    })
  }, [authDispatch])

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
        console.log(result.user)
      })
      .catch((er) => {
        console.log(er)
      })
  }

  if (!isLoginState) {
    return (
      <button className={classes.button} onClick={loginHandler}>
        Login
      </button>
    )
  }
  return (
    <div>
      <p className={classes.username}>Hi!{userState.displayName}</p>
      <button className={classes.button} onClick={logoutHandler}>
        Logout
      </button>
    </div>
  )
}

export default LoginManager