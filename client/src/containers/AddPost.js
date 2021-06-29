import React, { useState } from 'react';
import { Card, Container, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { useAuthContext } from '../hooks/AuthContextProvider';
import { postAction } from '../redux/actions/postAction';
import { storageRef } from '../redux/store/firestore';

const AddPost = () => {
    const { user, token } = useAuthContext()
    const initialValue = { title: '', message: '', fileUrl: '', name: '' }
    const [postObject, setPostObject] = useState(initialValue);
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch();
    const history = useHistory()
    const changeText = (e) => {
        setPostObject({
            ...postObject,
            [e.target.name]: e.target.value
        })
    }
    const fileSelected = (e) => {
        setError('')
        setDisabled(false)
        const file = e.target.files[0]
        const name = file.name.split('.')
        if (!['jpg', 'jpeg', 'gif', 'png'].includes(name[name.length - 1])) {
            setError('Please select an image')
            setDisabled(true)
        }
        const uploadStorage = storageRef.ref('post').child(file.name).put(file)
        uploadStorage.on('state_changed', (snapshot) => {
            setDisabled(true)
        }, (error) => {
            console.log(error)
            setDisabled(false)

        }, async () => {
            const downloadUrl = await uploadStorage.snapshot.ref.getDownloadURL()
            setPostObject({
                ...postObject,
                fileUrl: downloadUrl
            })
            setDisabled(false)
        })
    }
    const handleSubmit = (e) => {
        let objectTosend = {
            'name':user.name
        }
        Object.keys(postObject).forEach(key=>postObject[key] && (objectTosend[key] = postObject[key]))
        e.preventDefault()
        setPostObject({
            ...postObject,
        })
        dispatch(postAction.addPost(objectTosend, token,history, () => {
             setError('')
             setPostObject(initialValue)
             history.push('/')
        }))
    }
    return (
        <Container>
            <Card>
                <Card.Body>
                    <h1 className="large text-primary text-center">Add Post</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" placeholder="Title" name="title" value={postObject.title} onChange={changeText} />
                        </div>
                        <div className="form-group mb-3">
                            <textarea className="form-control" placeholder="Message" name="message" value={postObject.message} onChange={changeText} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="file" className="form-control" placeholder="attachment" name="file" value={postObject.file} onChange={fileSelected} />
                        </div>

                        <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary" disabled={disabled}>
                                Add Post
                            </button>
                        </div>
                    </form>
                </Card.Body>
            </Card>

        </Container>
    )
}

export default AddPost
