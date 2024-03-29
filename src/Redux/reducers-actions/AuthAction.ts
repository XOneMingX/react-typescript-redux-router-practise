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
import { User } from "firebase/auth"

const usersDatabase = collection(db, "Users")

export const newUserHandler = async (userData: User) => {
  const currentUser = await getDocs(
    query(usersDatabase, where("uid", "==", userData.uid))
  )

  if (currentUser.empty) {
    //create new user in firestore
    await setDoc(doc(usersDatabase, userData.uid), {
      uid: userData.uid,
      username: userData.displayName,
    })
  }
}
