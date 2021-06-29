import React, { useState } from 'react';
import { Card,Alert, Container } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import {utils} from  '../utils/index';
import {useSelector,useDispatch} from 'react-redux';
import { useAuthContext } from '../hooks/AuthContextProvider'

const Login = () => {
    const { signIn } = useAuthContext()
    const history = useHistory();
    const {loginDataObject} = useSelector((state)=>state.authReducer)
    const initialData = { email: '', password: '' }
    const [error,setError] = useState('');
    const dispatch = useDispatch()
    const [loginObj, setLoginObj] = useState(initialData)
    const changeText = (e) => {
        setLoginObj(
            {
                ...loginObj,
                [e.target.name]: e.target.value
            },
        )
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        signIn(loginObj,()=>{
            setLoginObj(initialData)
            setError('')
            history.push('/')
        })
    }
    if(loginDataObject.error && error !== loginDataObject.error?.message){
        setError(loginDataObject.error?.message)
        setTimeout(()=>{
            dispatch({type:'CLEAR_LOGIN_ERROR'})
        },2000)
    } 
    const validate = (e)=>{
       setError(utils.validateFields(e.target))
    }
    return (
        <Container>
            <Card style={{width:'70%',height:'50%',margin:'auto'}}>
                <Card.Body>
                    <h1 className="large text-primary text-center">Sign In</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" placeholder="email" name="email" value={loginObj.email} onChange={changeText} onBlur={validate} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="password" className="form-control" placeholder="password" name="password" value={loginObj.password} onChange={changeText} onBlur={validate} />
                        </div>

                        <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary" disabled={error ? true : false}>
                                Sign In
                            </button>
                        </div>
                    </form>
                </Card.Body>
            </Card>

        </Container>
    )
}

export default Login
