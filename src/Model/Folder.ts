import { v4 as uuidv4 } from "uuid"

class Folder {
  folderID: string
  name: string
  createUserID: string

  constructor(folderName: string, userID: string) {
    this.folderID = uuidv4()
    this.name = folderName
    this.createUserID = userID
  }
}

export default Folder
