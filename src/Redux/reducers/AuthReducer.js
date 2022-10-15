import { allAction } from "../allAction"

const authInitState = { userdata: {}, isLogin: false }

const AuthReducer = (state = authInitState, action) => {
  switch (action.type) {
    case allAction.LOGIN:
      return {
        userdata: action.userdata,
        isLogin: true,
      }
    case allAction.LOGOUT:
      return {
        state: authInitState,
      }
    default:
      return state
  }
}

export default AuthReducer
