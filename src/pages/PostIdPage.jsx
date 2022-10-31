import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import PostService from '../API/PostServise';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    })
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostById(params.id);
        fetchComments(params.id);
    }, [])
    return (
        <div className='post__current' style={{margin: '20px 50px'}}>
            <h2 style={{textAlign:'center'}}>Post {params.id} :</h2>
            {isLoading
                ? <Loader/>
                : <div style={{textAlign:'justify', fontWeight: '700', margin:'20px 0px'}}>{post.id}. {post.title}<div style={{textAlign:'center', marginTop: '20px'}}><h4>{post.body}</h4></div></div>
                
            }
            <h1 style={{textAlign:'center', marginTop:'20px'}}>Comments</h1>
            {isComLoading
                ? <Loader/>
                : <div>{comments.map(comm =>
                        <div className='post__current__comment' key={comm.id} style={{margin: '10px 20px'}}>
                            <h4>
                                {comm.name}<br/>
                                ( {comm.email} )
                            </h4>
                            <div>
                                {comm.body}    
                            </div> 
                        </div>  
                    )}</div>
            }
        </div>
    );
};

export default PostIdPage;