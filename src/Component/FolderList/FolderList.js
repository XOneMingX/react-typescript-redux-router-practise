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
import classes from "./FolderList.module.css"
import Todo from "../../Model/Todo"
import { folderDataHandler } from "../../Redux/reducers-actions/FolderAction"

const FolderList = (props) => {
  const dispatch = useDispatch()
  const params = useParams()

  const userState = useSelector((state) => {
    return state.authReducer.userdata
  })

  const [folderName, setFolderName] = useState("")

  useEffect(() => {
    if (params.folderID !== undefined) {
      setFolder(userState.uid, params.folderID)
    } else {
      setFolder(userState.uid, "")
    }
  }, [params])

  const setFolder = async (userID, folderID) => {
    const folderData = await folderDataHandler(userID, folderID)
    dispatch({
      type: allAction.SET_FOLDER,
      data: folderData,
    })
  }

  const createFolder = (name, userID, folderID) => {
    if (name.trim().length !== 0) {
      const newFolder = new Folder(name, userID, folderID)

      dispatch({
        type: allAction.ADD_FOLDER,
        data: newFolder,
      })
      addFolderToDatabase(newFolder)
    }
  }

  const onRemoveFolder = (folderID) => {
    dispatch({
      type: allAction.DEL_FOLDER,
      data: folderID,
    })
    delFolderFromDatabase(folderID)
  }

  return (
    <div>
      <ul>
        {props.folders.map((e, index) => {
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
          className={classes.button}
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
