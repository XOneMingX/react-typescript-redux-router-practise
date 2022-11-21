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

const folderDatabase = collection(db, "Folder")
const todoDatabase = collection(db, "TodoList")

export const folderDataHandler = async (userID: string, folderID: string) => {
  const folderDocs = await getDocs(
    query(
      folderDatabase,
      where("createUserID", "==", userID),
      where("folderID", "==", folderID)
    )
  )

  let foldersData: any = []
  if (!foldersData.empty) {
    foldersData = folderDocs.docs.map((doc) => {
      return doc.data()
    })
  }
  return foldersData
}

export const addFolderToDatabase = async (folderData: any) => {
  await setDoc(doc(db, "Folder", folderData.id), {
    ...folderData,
  })
}

export const delFolderFromDatabase = async (folderID: string) => {
  const todoList = await getDocs(
    query(todoDatabase, where("folderID", "==", folderID))
  )
  if (!todoList.empty) {
    todoList.docs.map(async (todo) => {
      await deleteDoc(doc(db, "TodoList", todo.id))
    })
  }

  const folderList = await getDocs(
    query(folderDatabase, where("folderID", "==", folderID))
  )
  if (!folderList.empty) {
    folderList.docs.map(async (folder) => {
      await deleteDoc(doc(db, "Folder", folder.id))
    })
  }

  await deleteDoc(doc(db, "Folder", folderID))
}

// export const updateFolderDataInDatabase = async (folderData) => {
//   console.log(folderData)
//   const todoRef = doc(db, "Folder", folderData.id)
//   await updateDoc(todoRef, { ...folderData })
// }
