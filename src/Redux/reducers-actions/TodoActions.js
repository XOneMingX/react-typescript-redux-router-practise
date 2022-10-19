import React from "react"
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore"

import { db } from "../../Config/Firebase"

const usersDatabase = collection(db, "Users")

const newUserHandler = async (userdata) => {
  const currentUser = await getDocs(
    query(usersDatabase, where("uid", "==", userdata.uid))
  )
  if (currentUser.empty) {
    //create new user in firestore
    await setDoc(doc(usersDatabase, userdata.uid), {
      uid: userdata.uid,
      username: userdata.displayName,
    })
  }
}

export const todoDataHandler = async (userData) => {
  await newUserHandler(userData)

  const todoColRef = collection(db, "Users", userData.uid, "TodoList")
  const todoDocs = await getDocs(todoColRef)

  let todosData = []
  if (!todoDocs.empty) {
    todosData = todoDocs.docs.map((doc) => {
      return doc.data()
    })
  } else {
    todosData = [
      {
        id: "sample",
        text: "Start from your first todo",
        isFinish: false,
      },
    ]
  }
  return todosData
}

export const addTodoToDatabase = async (userData, todoData) => {
  const todoColRef = collection(db, "Users", userData.uid, "TodoList")
  await setDoc(doc(todoColRef, todoData.id), {
    ...todoData,
  })
}

export const delTodoFromDatabase = async (userData, todoID) => {
  const todoRef = doc(db, "Users", userData.uid, "TodoList", todoID)
  await deleteDoc(todoRef)
}

export const updateTodoDataInDatabase = async (userData, todoData) => {
  const todoRef = doc(db, "Users", userData.uid, "TodoList", todoData.id)
  await updateDoc(todoRef, { ...todoData })
}
