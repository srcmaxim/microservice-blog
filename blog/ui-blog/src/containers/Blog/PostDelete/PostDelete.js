import React, {useState, useEffect} from 'react';
import { withRouter } from "react-router";
import './PostDelete.css';

import Button from '../../../components/UI/Button/Button';
import Modal from '../../../components/UI/Modal/Modal';
import axios from 'axios';

function PostDelete({ id, history }) {
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

    const deletePost = (id, history) => async event => {
        event.preventDefault();
        await axios.delete(`${process.env.REACT_APP_BLOG_API}/posts/${id}`)
        history.push(`/blog`);
    }

    if (!post) {
        return null;
    }

    return (
        <Modal>
            <div>
                <h1 style={{marginTop: "0px"}}>{post?.title}</h1>
                <p>Would you like to delete post?</p>
                <span>
                    <Button id={ "post-delete" } onClick={ deletePost(id, history) }>Delete Post</Button>
                    <Button id={ "post-close" } linkTo={ `/blog/${id}` } style={{borderLeftWidth: 0}}>Close</Button>
                </span>
            </div>
        </Modal>
    );
}

export default withRouter(PostDelete);
