import React from 'react';
import {Redirect,Route} from 'react-router-dom';
import { useAuthContext } from '../hooks/AuthContextProvider';
export const PrivateRoute = ({component:Component,...rest})=>{
    const {user,isAuthenticated} = useAuthContext()
    return (
        <Route
        {...rest}
        render={props=>user && isAuthenticated ? (
            <Component {...props} />
        ):(
            <Redirect to={{
                pathname:"/login"
            }}/>
        )}
         />
    )
}