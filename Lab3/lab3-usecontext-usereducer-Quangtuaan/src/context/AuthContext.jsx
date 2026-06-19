import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

const initialState = { isAuthenticated: false, user: null, error: null }

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { isAuthenticated: true, user: action.payload, error: null }
    case 'LOGIN_FAILURE':
      return { ...state, isAuthenticated: false, error: action.payload }
    case 'CHANGE_PASSWORD':
      return { ...state, user: { ...state.user, password: action.payload } }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}