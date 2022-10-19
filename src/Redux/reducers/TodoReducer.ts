import { Reducer } from "react"
import Todo from "../../Model/Todo"
import { allAction } from "../allAction"

interface actionTypes {
  type: string
  data: Todo | string | any
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
    const newTodo: Todo[] = [...state]
    const index = newTodo.findIndex((e) => e.id === todoID)
    if (index !== -1) {
      newTodo[index].isFinish = !state[index].isFinish
    }
    return newTodo
  }
  return state
}

const setItemColor = (state: Todo[], todo: Todo): Todo[] => {
  if (typeof todo === "object") {
    const newTodo: Todo[] = [...state]
    const index = newTodo.findIndex((e) => e.id === todo.id)
    if (index !== -1) {
      newTodo[index].color = todo.color
    }
    return newTodo
  }
  return state
}

const updateItem = (state: Todo[], todoID: Todo | string): Todo[] => {
  if (typeof todoID === "string") {
    const newTodo: Todo[] = [...state]
    const index = newTodo.findIndex((e) => e.id === todoID)
    return newTodo
  }
  return state
}

const TodoReducer: Reducer<todoInitStateType, actionTypes> = (
  state = initialState,
  action
) => {
  //console.log(action.data)
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
        allTodo: setItemColor(state.allTodo, action.data),
      }
    default:
      return state
  }
}

export default TodoReducer
