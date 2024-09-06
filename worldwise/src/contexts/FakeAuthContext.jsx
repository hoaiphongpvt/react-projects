/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer} from 'react'

const AuthContext = createContext()

const initialState = {
    user : null,
    isAuthenticated: false
}

const FAKE_USER = {
    name: "Phong",
    email: "hoaiphongpvt@gmail.com",
    password: "21032002",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
  

function reducer(state, action) {
    switch(action.type) {
        case 'login':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case 'logout':
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        default: 
            throw new Error("Unknow action type!")
    }
}


function AuthProvider({ children }) {

    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState)

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({type: 'login', payload: FAKE_USER})
        }
        else {
            console.log("Email or password is incorrect!")
        }
    }

    function logout() {
        dispatch({type: 'logout'})
    }

    return (<AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
        {children}
    </AuthContext.Provider>)
}

function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) throw new Error('AuthContext was used outside AuthProvider!')
    return context
}

export {AuthProvider, useAuth}