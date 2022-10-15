import React from "react"
import { useDispatch } from "react-redux"
import { collection, getDocs, query, where, doc } from "firebase/firestore"

import { db } from "../../Config/Firebase"
import todo from "../../Model/Todo"

const usersDatabase = collection(db, "Users")

export const getUserData = async (uid) => {
  // return async (dispatch) => {
  //
  // }
  const userData = async (uid) => {
    const currentUser = await getDocs(
      query(usersDatabase, where("uid", "==", uid))
    )
    if (currentUser) {
      let currentUserId
      const getCurrentUserId = await currentUser.forEach((doc) => {
        currentUserId = doc.id
      })
      const todoColRef = collection(db, "Users", currentUserId, "TodoList")
      const todoDocs = await getDocs(todoColRef)
      const todoData = todoDocs.docs.map((doc) => {
        console.log(doc.id, doc.data())
      })
      console.log(todoData)
    } else {
      console.log("New user")
      //create new user in firestore
      //create empty todo list under the user
    }
  }
  try {
    const user = await userData(uid)
  } catch (err) {
    console.log(err)
  }
}
