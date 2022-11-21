import { allAction } from "../allAction"
import Folder from "../../Model/Folder"
import { Reducer } from "react"

interface actionTypes {
  type: string
  data: Folder | string | any
}

export interface folderInitStateType {
  allFolders: Folder[]
}

const folderInitialState: folderInitStateType = { allFolders: [] }

const addFolder = (state: Folder[], folder: Folder | string) => {
  const newFolder = [...state]
  console.log(newFolder)
  // error handle
  if (folder instanceof Folder) {
    newFolder.push(folder)
  }

  return newFolder
}

const delFolder = (state: Folder[], folderID: Folder | string) => {
  if (typeof folderID === "string") {
    return state.filter((e) => e.id !== folderID)
  }
  return state
}

const FolderReducer: Reducer<folderInitStateType, actionTypes> = (
  state = folderInitialState,
  action
) => {
  switch (action.type) {
    case allAction.SET_FOLDER:
      return {
        ...state,
        allFolders: action.data,
      }
    case allAction.ADD_FOLDER:
      return {
        ...state,
        allFolders: addFolder(state.allFolders, action.data),
      }
    case allAction.DEL_FOLDER:
      return {
        ...state,
        allFolders: delFolder(state.allFolders, action.data),
      }
    default:
      return state
  }
}

export default FolderReducer
