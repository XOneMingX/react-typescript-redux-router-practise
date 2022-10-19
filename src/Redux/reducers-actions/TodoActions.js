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
  // let currentUserDocId
  // await currentUser.forEach((doc) => {
  //   currentUserDocId = doc.id
  // })
  // console.log(currentUserDocId)
  // return currentUserDocId
}

export const todoDataHandler = async (userdata) => {
  await newUserHandler(userdata)

  const todoColRef = collection(db, "Users", userdata.uid, "TodoList")
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
