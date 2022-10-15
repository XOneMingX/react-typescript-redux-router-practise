import { createStore, combineReducers } from "redux"
import todoReducer, { todoInitStateType } from "./TodoReducer"
import modalControllerReducer, { modalInitStateType } from "./ModalController"
import authReducer from "./AuthReducer"

export interface ApplicationState {
  todoReducer: todoInitStateType
  modalControllerReducer: modalInitStateType
}

const rootReducer = combineReducers({
  todoReducer,
  modalControllerReducer,
  authReducer,
})

const store = createStore(rootReducer)

export type storeTypes = ReturnType<typeof rootReducer>

export default store
