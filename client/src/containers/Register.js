import React, { useState } from 'react';
import { Card,Alert, Container } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import {utils} from  '../utils/index'
import { useAuthContext } from '../hooks/AuthContextProvider'

const Register = () => {
    const { signUp } = useAuthContext()
    const history = useHistory();
    const dispatch = useDispatch()
    const initialData = { email: '', password: '',name:'' }
    const [error,setError] = useState('')
    const [registerObj, setRegisterObj] = useState(initialData)
    const {registerDataObject} =  useSelector(state => state.authReducer)
    const changeText = (e) => {
        setRegisterObj(
            {
                ...registerObj,
                [e.target.name]: e.target.value
            },
        )
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        signUp(registerObj,()=>{
            setRegisterObj(initialData)
            setError('')
            history.push('/')
        })
    }
    if(registerDataObject.error && error !== registerDataObject.error?.message){
        setError(registerDataObject.error?.message)
        setTimeout(()=>{
          dispatch({type:'CLEAR_REGISTER_ERROR'})
        },2000)
    } 
    const validate = (e)=>{
       setError(utils.validateFields(e.target))
    }
    return (
        <Container>
            <Card>
                <Card.Body>
                    <h1 className="large text-primary text-center">Sign up</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" placeholder="name" name="name" value={registerObj.name} onChange={changeText} onBlur={validate} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" placeholder="email" name="email" value={registerObj.email} onChange={changeText} onBlur={validate} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="password" className="form-control" placeholder="password" name="password" value={registerObj.password} onChange={changeText} onBlur={validate} />
                        </div>

                        <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary" disabled={error ? true : false}>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </Card.Body>
            </Card>

        </Container>
    )
}

export default Register

