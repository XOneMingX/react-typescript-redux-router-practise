import { allAction } from "../allAction"

const folderInitialState = { allFolders: [] }

const addFolder = (state, folderID) => {
  const newFolder = [...state]
  console.log(newFolder)
  // error handle
  if (!newFolder.includes(folderID)) {
    newFolder.push(folderID)
  }

  return newFolder
}

const delFolder = (state, folderID) => {
  if (typeof folderID === "string") {
    return state.filter((e) => e.id !== folderID)
  }
  return state
}

const FolderReducer = (state = folderInitialState, action) => {
  switch (action.type) {
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
