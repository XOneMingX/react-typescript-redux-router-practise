import React from "react"
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore"

import { db } from "../../Config/Firebase"
import { useDispatch } from "react-redux"

const usersDatabase = collection(db, "Users")

const userDataHandler = async (userdata) => {
  const currentUser = await getDocs(
    query(usersDatabase, where("uid", "==", userdata.uid))
  )
  if (currentUser.empty) {
    //create new user in firestore
    await setDoc(doc(usersDatabase), {
      uid: userdata.uid,
      username: userdata.displayName,
    }).then(() => {
      return userDataHandler(userdata)
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
  console.log(getUserDocId)
  const todoColRef = collection(db, "Users", getUserDocId, "TodoList")
  const todoDocs = await getDocs(todoColRef)
  if (!todoDocs.empty) {
    const todosData = todoDocs.docs.map((doc) => {
      return { id: doc.id, todo: doc.data() }
    })
    return todosData
  }
}
