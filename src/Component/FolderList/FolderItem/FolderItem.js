import React from "react"
import { Link } from "react-router-dom"

const FolderItem = (props) => {
  return (
    <li
      key={props.data.id}
      style={{
        display: "grid",
        gridTemplateColumns: "auto 40px",
      }}>
      <div className="flex items-center gap-2">
        <i className="fa-solid fa-folder fa-xl"></i>
        <Link to={"/folder/" + props.data.id} className="text-2xl">
          {props.data.name}
        </Link>
      </div>
      <div>
        <button onClick={() => props.onRemoveFolder(props.data.id)}>X</button>
      </div>
    </li>
  )
}

export default FolderItem
