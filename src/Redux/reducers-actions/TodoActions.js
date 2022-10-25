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

const todoDatabase = collection(db, "TodoList")

export const todoDataHandler = async (userID, folderID) => {
  const todoDocs = await getDocs(
    query(
      todoDatabase,
      where("createUserID", "==", userID),
      where("folderID", "==", folderID)
    )
  )

  let todosData = []
  if (!todoDocs.empty) {
    todosData = todoDocs.docs.map((doc) => {
      return doc.data()
    })
  }
  return todosData
}

export const addTodoToDatabase = async (todoData) => {
  await setDoc(doc(db, "TodoList", todoData.id), {
    ...todoData,
  })
}

export const delTodoFromDatabase = async (todoID) => {
  await deleteDoc(doc(db, "TodoList", todoID))
}

export const updateTodoDataInDatabase = async (todoData) => {
  console.log(todoData)
  const todoRef = doc(db, "TodoList", todoData.id)
  await updateDoc(todoRef, { ...todoData })
}
