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

export const todoDataHandler = async (userID: string, folderID: string) => {
  const todoDocs = await getDocs(
    query(
      todoDatabase,
      where("createUserID", "==", userID),
      where("folderID", "==", folderID)
    )
  )

  let todosData: any = []
  if (!todoDocs.empty) {
    todosData = todoDocs.docs.map((doc) => {
      return doc.data()
    })
  }
  return todosData
}

export const addTodoToDatabase = async (todoData: any) => {
  await setDoc(doc(db, "TodoList", todoData.id), {
    ...todoData,
  })
}

export const delTodoFromDatabase = async (todoID: string) => {
  await deleteDoc(doc(db, "TodoList", todoID))
}

export const updateTodoDataInDatabase = async (todoData: any) => {
  console.log(todoData)
  const todoRef = doc(db, "TodoList", todoData.id)
  await updateDoc(todoRef, { ...todoData })
}
