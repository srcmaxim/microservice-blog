import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Posts.css';

import Button from '../../../components/UI/Button/Button';

import axios from 'axios';
import PostMeta from '../PostMeta/PostMeta'; 

export default function Posts() {

    const [posts, setPosts] = useState([])
    
    async function fetchPostsData() {
        const response = await axios.get(`${process.env.REACT_APP_BLOG_API}/posts`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setPosts(response.data);
    }

    useEffect(() => {
        fetchPostsData();
    }, []);

    return (<>{
        posts.map(post => {
            return (
                <div key={ post.id }>
                    <Link id={ post.id } data-testid={ "header-link" } to={ "/blog/" + post.id  } ><h1>{ post.title }</h1></Link>      
                    <PostMeta className={ "Post-meta" }
                        publishDate={post.publishDate} 
                        readMinutes={post.readMinutes} 
                        tags={post.tags} />        
                </div>
            );
        })
    }
    <span><Button id={ "post-create" } linkTo={ `/blog/create` }>Create Post</Button></span>
    </>);
}
