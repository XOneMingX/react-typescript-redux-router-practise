import React from "react"
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore"

import { db } from "../../Config/Firebase"

const usersDatabase = collection(db, "Users")

const userDataHandler = async (userdata) => {
  let currentUser
  currentUser = await getDocs(
    query(usersDatabase, where("uid", "==", userdata.uid))
  )

  if (currentUser.empty) {
    //create new user in firestore
    await setDoc(doc(usersDatabase, userdata.uid), {
      uid: userdata.uid,
      username: userdata.displayName,
    })
  }
  let currentUserDocId
  await currentUser.forEach((doc) => {
    currentUserDocId = doc.id
  })
  console.log(currentUserDocId)

  return currentUserDocId
}

export const todoDataHandler = async (userdata) => {
  const getUserDocId = await userDataHandler(userdata)
  const setInitialTodo = () => {
    const initialTodo = {
      id: "initialTodo",
      text: "initialTodo-Sample",
      isFinish: false,
    }
    todos.push({ ...initialTodo })
  }
  console.log(getUserDocId)
  let todos = []
  if (getUserDocId) {
    const todoColRef = collection(db, "Users", getUserDocId, "TodoList")
    const todoDocs = await getDocs(todoColRef)
    console.log(todoDocs)

    if (!todoDocs.empty) {
      todoDocs.docs.map((doc) => {
        todos.push({
          id: doc.id,
          ...doc.data(),
        })
      })
    } else {
      setInitialTodo()
    }
  }
  return todos
}
