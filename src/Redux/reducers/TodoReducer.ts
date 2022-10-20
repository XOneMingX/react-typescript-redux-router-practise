import { Reducer } from "react"
import Todo from "../../Model/Todo"
import { allAction } from "../allAction"

interface actionTypes {
  type: string
  data: Todo | string | any
  color: string
  deadline: Date
}

export interface todoInitStateType {
  allTodo: Todo[]
}

const initialState: todoInitStateType = {
  allTodo: [],
}

const addItem = (state: Todo[], todo: Todo | string): Todo[] => {
  const newTodo: Todo[] = [...state]
  // error handle
  if (todo instanceof Todo) {
    newTodo.push(todo)
  }

  return newTodo
}

const deleteItem = (state: Todo[], todoID: Todo | string): Todo[] => {
  if (typeof todoID === "string") {
    return state.filter((e) => e.id !== todoID)
  }
  return state
}

const setItemFinish = (state: Todo[], todoID: Todo | string): Todo[] => {
  if (typeof todoID === "string") {
    const currentTodoList: Todo[] = [...state]
    const index = currentTodoList.findIndex((e) => e.id === todoID)
    if (index !== -1) {
      currentTodoList[index].isFinish = !state[index].isFinish
    }
    return currentTodoList
  }
  return state
}

const setItemColor = (
  state: Todo[],
  todoID: Todo | string,
  color: string
): Todo[] => {
  const currentTodoList: Todo[] = [...state]
  if (typeof todoID === "string") {
    const index = currentTodoList.findIndex((e) => e.id === todoID)
    if (index !== -1) {
      currentTodoList[index].color = color
    }
    return currentTodoList
  }
  return state
}

const setItemDeadline = (
  state: Todo[],
  todoID: Todo | string,
  deadline: Date | null
): Todo[] => {
  const currentTodoList: Todo[] = [...state]
  if (typeof todoID === "string") {
    const index = currentTodoList.findIndex((e) => e.id === todoID)
    if (index !== -1) {
      currentTodoList[index].deadline = deadline
    }
    return currentTodoList
  }
  return state
}

// const updateItemProp = (state: Todo[], todo: Todo | string): Todo[] => {
//   const currentTodoList: Todo[] = [...state]
//
//   if (todo instanceof Todo) {
//     const index = currentTodoList.findIndex((e) => e.id === todo.id)
//     if (index !== -1) {
//       currentTodoList[index] = todo
//     }
//     return currentTodoList
//   }
//
//   return state
// }

const TodoReducer: Reducer<todoInitStateType, actionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case allAction.SET_ITEM:
      return {
        ...state,
        allTodo: action.data,
      }
    case allAction.ADD_ITEM:
      return {
        ...state,
        allTodo: addItem(state.allTodo, action.data),
      }
    case allAction.DELETE_ITEM:
      return {
        ...state,
        allTodo: deleteItem(state.allTodo, action.data),
      }

    case allAction.SET_FINISH:
      return {
        ...state,
        allTodo: setItemFinish(state.allTodo, action.data),
      }
    case allAction.SET_COLOR:
      return {
        ...state,
        allTodo: setItemColor(state.allTodo, action.data, action.color),
      }
    case allAction.SET_DEADLINE:
      return {
        ...state,
        allTodo: setItemDeadline(state.allTodo, action.data, action.deadline),
      }

    default:
      return state
  }
}

export default TodoReducer
