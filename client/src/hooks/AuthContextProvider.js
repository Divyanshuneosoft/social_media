import React, { useContext, useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';
import { useDispatch } from 'react-redux'
import { authAction } from '../redux/actions/authAction';

const AuthContext = React.createContext()
export const useAuthContext = () => {
    return useContext(AuthContext)
}
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useLocalStorage('token', '');
    const [user, setUser] = useLocalStorage('user', null);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const dispatch = useDispatch()
    const signIn = (data,callback) => {
        dispatch(authAction.signIn(data, (response) => {
            setUser({email:response.data.email,name:response.data.name,_id:response.data._id})
            setToken({token:response.token})
            setIsAuthenticated(true)
            callback(response)
        }))
    }
    const signUp = (data,callback)=>{
        dispatch(authAction.signUp(data,(response)=>{
            setUser(response.data)
            setToken({token:response.token})
            setIsAuthenticated(true)
            callback(response)
        }))
    }
    useEffect(() => {
        if (token && user) setIsAuthenticated(true)
    }, [token, user])
    const value = {
        signIn,
        signUp,
        token,
        user,
        isAuthenticated
    }
    return (<AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>)
}