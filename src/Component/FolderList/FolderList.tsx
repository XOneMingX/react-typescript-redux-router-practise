import React, { useEffect, useState } from "react"
import FolderItem from "./FolderItem/FolderItem"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { allAction } from "../../Redux/allAction"
import Folder from "../../Model/Folder"
import {
  addFolderToDatabase,
  delFolderFromDatabase,
} from "../../Redux/reducers-actions/FolderAction"
import { folderDataHandler } from "../../Redux/reducers-actions/FolderAction"
import { ApplicationState } from "../../Redux/reducers/rootReducer"

const FolderList: React.FC<{ folders: Folder[] }> = (props) => {
  const dispatch = useDispatch()
  const params = useParams()

  const userState = useSelector((state: ApplicationState) => {
    return state.authReducer.userdata
  })!

  const [folderName, setFolderName] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (userState && userState !== undefined) {
      if (Object.keys(userState).length !== 0) {
        setIsLoaded(true)
      } else {
        setIsLoaded(false)
      }
    }
  }, [userState])

  useEffect(() => {
    if (isLoaded) {
      if (userState.uid && params.folderID !== undefined) {
        setFolder(userState.uid, params.folderID)
      } else {
        setFolder(userState.uid, "")
      }
    }
  }, [params, isLoaded])

  const setFolder = async (userID: string, folderID: string) => {
    const folderData = await folderDataHandler(userID, folderID)
    dispatch({
      type: allAction.SET_FOLDER,
      data: folderData,
    })
  }

  const createFolder = (name: string, userID: string, folderID: string) => {
    if (name.trim().length !== 0) {
      const newFolder = new Folder(name, userID, folderID)

      dispatch({
        type: allAction.ADD_FOLDER,
        data: newFolder,
      })
      addFolderToDatabase(newFolder)
    }
  }

  const onRemoveFolder = (folderID: string) => {
    dispatch({
      type: allAction.DEL_FOLDER,
      data: folderID,
    })
    delFolderFromDatabase(folderID)
  }

  return (
    <div>
      <ul>
        {props.folders.map((e: Folder, index: number) => {
          return (
            <FolderItem key={index} data={e} onRemoveFolder={onRemoveFolder} />
          )
        })}
      </ul>
      <div>
        <input
          style={{
            padding: "2px",
            borderRadius: "0.75em",
            backgroundColor: "lightgray",
            margin: "4px 0",
          }}
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <button
          type="button"
          className="btn m-2"
          onClick={() => {
            createFolder(
              folderName,
              userState.uid,
              params.folderID ? params.folderID : ""
            )
            setFolderName("")
          }}>
          + Add Folder
        </button>
      </div>
    </div>
  )
}

export default FolderList
