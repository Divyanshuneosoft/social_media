import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { postAction } from '../redux/actions/postAction';
import { useAuthContext } from '../hooks/AuthContextProvider';

const Dashboard = () => {
    const { token, user } = useAuthContext()
    const history = useHistory()
    const { getPostObject } = useSelector((state) => state.postReducer)
    const dispatch = useDispatch()
    const likePost = (postId,index) => {
        dispatch(postAction.likePost(token, { userId: user._id, _id: postId,index:index},history))
    }
    useEffect(() => {
        dispatch(postAction.getPost(token,history))
    }, [token])
    return (
         <>
            <Link to="/post/add" style={{marginLeft:'80%'}}><i className="fa fa-plus fa-2x" aria-hidden="true"></i>
         </Link>
        <Container style={{ display: 'flex', flexDirection: 'row' }}>
            {getPostObject.data?.data ? getPostObject.data.data.map((post,index) => (
                <Card style={{ width: '18rem', margin: '0px 10px 0px 10px' }} key={index}>
                    {post.fileUrl ? <Card.Img variant="top" src={post.fileUrl} style={{ minWidth: '60%' }} /> : ''}
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>
                            {post.message}
                        </Card.Text>
                        <Button variant="primary" onClick={()=>likePost(post._id,index)} ><i className="fa fa-thumbs-up">{post.likes.length}</i></Button>
                    </Card.Body>
                </Card>
            )) : ''}

        </Container>
             </>
    )
}

export default Dashboard
