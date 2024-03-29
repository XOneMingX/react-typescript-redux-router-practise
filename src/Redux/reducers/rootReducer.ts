import { createStore, combineReducers } from "redux"
import todoReducer, { todoInitStateType } from "./TodoReducer"
import modalControllerReducer, { modalInitStateType } from "./ModalController"
import authReducer, { authInitStateType } from "./AuthReducer"
import folderReducer from "./FolderReducer"

export interface ApplicationState {
  todoReducer: todoInitStateType
  modalControllerReducer: modalInitStateType
  authReducer: authInitStateType
}

const rootReducer = combineReducers({
  todoReducer,
  modalControllerReducer,
  authReducer,
  folderReducer,
})

const store = createStore(rootReducer)

export type storeTypes = ReturnType<typeof rootReducer>

export default store
