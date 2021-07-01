import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { postAction } from '../redux/actions/postAction';
import { useAuthContext } from '../hooks/AuthContextProvider';

const Dashboard = () => {
    const { token, user } = useAuthContext();
    const [search, setSearch] = useState('');
    const history = useHistory()
    const { getPostObject } = useSelector((state) => state.postReducer)
    const dispatch = useDispatch()
    const likePost = (postId, index) => {
        dispatch(postAction.likePost(token, { userId: user._id, _id: postId, index: index }, history))
    }
    useEffect(() => {
        if(!search) dispatch(postAction.getPost(token, history))
    }, [token,history,search])
    const buttonSearch = (e) => {
        e.preventDefault()
        dispatch(postAction.getPostBySearch(token, { name: search }, history))
    }
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <input type="text" placeholder=" Search by Author Name" style={{ width: '40%', marginLeft: '5%' }} value={search} onChange={(e) => setSearch(e.target.value)} />
                <button className="btn btn-secondary" onClick={buttonSearch}>Search</button>
                <Link to="/create" style={{ float: 'right', marginLeft: '5%' }}><i className="fa fa-plus fa-2x" aria-hidden="true"></i>
                </Link>
            </div>
            <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                {getPostObject.data?.data ? getPostObject.data.data.map((post, index) => (
                    <Card style={{ width: '60%', minHeight: '32rem', marginTop: '10px' }} key={index}>
                        {post.fileUrl ? <Card.Img variant="top" style={{ height: '30%', width: '40%', margin: '10% 10% 0% 10%' }} src={post.fileUrl} alt={post.title} /> : ''}
                        <Card.Body >
                            <Card.Title>{post.title}</Card.Title>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                {post.tags.map(tag => (
                                    <Card.Text className="text-primary">
                                        &nbsp;#{tag}
                                    </Card.Text>
                                ))}

                            </div>
                            <Card.Text><span className="fw-bold">By</span> {post.name}</Card.Text>
                            <Card.Text><span className="fw-bold">CreatedAt</span> {new Date(post.createdAt).toLocaleDateString()}</Card.Text>

                        </Card.Body>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingBottom: '5%' }}>
                            <Button variant="primary" onClick={() => likePost(post._id, index)} ><i className="fa fa-thumbs-up">{post.likes.length}</i></Button>
                            <Link className="btn btn-primary" to={`/post/${post._id}`} style={{ marginLeft: '10%' }}>Details</Link>

                        </div>
                    </Card>
                )) : ''}

            </Container>
        </>
    )
}

export default Dashboard
