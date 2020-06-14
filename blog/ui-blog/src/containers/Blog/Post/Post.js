import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Button from '../../../components/UI/Button/Button';
import PostMeta from '../PostMeta/PostMeta'; 

export default function Post({id}) {
    const [post, setPost] = useState(null);

    async function fetchPostData(id) {
        const response = await axios.get(`${process.env.REACT_APP_BLOG_API}/posts/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setPost(response.data);
    }

    useEffect(() => {
        fetchPostData(id);
    }, [id]);
    
    if (!post) {
        return null;
    }

    return (
        <>
            <Link id={post.id} data-testid={ "header-link" } to={ "/blog/" + post.id  } className="Post-title-link"><h1 className="Post-title">{ post.title }</h1></Link>
            <PostMeta className={ "Post-meta" }
                publishDate={post.publishDate} 
                readMinutes={post.readMinutes} 
                tags={post.tags} />  
            <ReactMarkdown source={ post.content } />
            <span>
                <Button id={ "post-edit" } linkTo={ `/blog/${post.id}/edit` }>Edit</Button>
                <Button id={ "post-delete" } linkTo={ `/blog/${post.id}/delete` } style={{borderLeftWidth: 0}}>Delete</Button>
            </span>
        </>
    );
}
