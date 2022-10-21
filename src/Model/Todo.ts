import { v4 as uuidv4 } from "uuid"

class Todo {
  id: string
  text: string
  isFinish: boolean
  color: string
  deadline: Date

  constructor(todoText: string) {
    this.text = todoText
    this.id = uuidv4()
    this.isFinish = false
    this.color = ""
    this.deadline = new Date()
  }
}

export default Todo
