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
            <Link to="/create" style={{marginLeft:'80%'}}><i className="fa fa-plus fa-2x" aria-hidden="true"></i>
         </Link>
        <Container style={{ display: 'flex', flexDirection: 'column', justifyContent:'space-around',alignItems:'center' }}>
            {getPostObject.data?.data ? getPostObject.data.data.map((post,index) => (
                <Card style={{ width: '34rem', height:'32rem',marginTop:'10px'}} key={index}>
                    {post.fileUrl ? <Card.Img variant="top" style={{height:'30%',width:'40%'}} src={post.fileUrl} alt={post.title}/> : ''}
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        {post.tags.slice(0,5).map(tag=>(
                            <Card.Text>
                                #{tag}
                        </Card.Text> 
                        ))}
                    </Card.Body>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}> 
                    <Button variant="primary" onClick={()=>likePost(post._id,index)} ><i className="fa fa-thumbs-up">{post.likes.length}</i></Button>
                        <Link to={`/post/${post._id}`} style={{marginLeft:'10%'}}>Details</Link>

                    </div>
                </Card>
            )) : ''}

        </Container>
             </>
    )
}

export default Dashboard
