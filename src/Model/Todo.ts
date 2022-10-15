import { v4 as uuidv4 } from "uuid"

class Todo {
  id: string
  text: string
  isFinish: boolean

  constructor(todoText: string) {
    this.text = todoText
    this.id = uuidv4() + todoText
    this.isFinish = false
  }
}

export default Todo
