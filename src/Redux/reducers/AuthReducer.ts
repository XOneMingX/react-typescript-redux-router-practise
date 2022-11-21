import { allAction } from "../allAction"
import { Reducer } from "react"
import { User } from "firebase/auth"

interface actionTypes {
  type: string
  userdata: User | null
  isLogin: boolean
}

export interface authInitStateType {
  userdata: User | null
  isLogin: boolean
}

const authInitState: authInitStateType = {
  userdata: null,
  isLogin: false,
}

const AuthReducer: Reducer<authInitStateType, actionTypes> = (
  state = authInitState,
  action
) => {
  switch (action.type) {
    case allAction.LOGIN:
      return {
        userdata: action.userdata,
        isLogin: true,
      }
    case allAction.LOGOUT:
      return {
        userdata: null,
        isLogin: false,
      }
    default:
      return state
  }
}

export default AuthReducer
