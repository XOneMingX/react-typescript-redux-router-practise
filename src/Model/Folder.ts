import { v4 as uuidv4 } from "uuid"

class Folder {
  id: string
  name: string
  createUserID: string
  folderID: string | ""

  constructor(folderName: string, userID: string, folderID: string | "") {
    this.id = uuidv4()
    this.name = folderName
    this.createUserID = userID
    this.folderID = folderID
  }
}

export default Folder
