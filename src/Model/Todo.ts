import { v4 as uuidv4 } from "uuid"

class Todo {
  id: string
  text: string
  isFinish: boolean
  color: string
  deadline: Date
  createUserID: string
  folderID: string

  constructor(todoText: string, userID: string, folderID: string | "") {
    this.text = todoText
    this.id = uuidv4()
    this.isFinish = false
    this.color = ""
    this.deadline = new Date()
    this.createUserID = userID
    this.folderID = folderID
  }
}

export default Todo
