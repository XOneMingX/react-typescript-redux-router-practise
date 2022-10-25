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
      <div>
        <Link to={"/folder/" + props.data.id}>{props.data.name}</Link>
      </div>
      <div>
        <button onClick={() => props.onRemoveFolder(props.data.id)}>X</button>
      </div>
    </li>
  )
}

export default FolderItem
