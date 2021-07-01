import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/AuthContextProvider';
import { postAction } from '../redux/actions/postAction';

const DetailPost = (props) => {
    const dispatch = useDispatch()
    const [post, setPost] = useState(null)
    const history = useHistory()
    const { token } = useAuthContext()
    const { detailPostObject } = useSelector(state => state.postReducer)
    useEffect(() => {
        dispatch(postAction.detailPost(token, { '_id': props.match.params.id }, history))
    }, [props.match.params.id])
    useEffect(() => {
        if (detailPostObject.data?.post) setPost(detailPostObject.data?.post)
    }, [detailPostObject.data?.post])
    const deletePost = (e) => {
        e.preventDefault()
        dispatch(postAction.deletePost(token, { '_id': props.match.params.id }, history, () => {
            history.push('/')
        }))
    }
    return (
        <Container className="d-flex justify-content-center" style={{ position: 'relative' }}>
            {post ? (
                <div style={{ position: 'absolute' }}>
                    <h1 className="text-primary text-center"> {post.title} </h1>
                    { post.fileUrl ? <img src={post.fileUrl} style={{ height: '15rem' }} alt={post.title} /> : ''}
                    <p>{post.message}</p>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {post.tags.map(tag => (
                            <p>&nbsp; #{tag} </p>
                        ))}
                    </div>
                    <p><span className="fw-bold"> Author:&nbsp;</span> {post.name}</p>
                    <p><span className="fw-bold">CreatedAt:&nbsp;</span>{new Date(post.createdAt).toLocaleDateString()}</p>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Link className="btn btn-primary" to={`/edit/${post._id}`}>Edit</Link>
                        <button className="btn btn-danger" onClick={deletePost}>Delete</button>
                    </div>
                </div>
            ) : ''}
        </Container>
    )
}

export default DetailPost
