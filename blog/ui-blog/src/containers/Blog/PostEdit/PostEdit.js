import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router";
import { dateTo8601, countReadMinutes } from "../../../functions/Utils";
import './PostEdit.css';

import Button from '../../../components/UI/Button/Button';
import Textarea from '../../../components/UI/Textarea/Textarea';
import Modal from '../../../components/UI/Modal/Modal';
import axios from 'axios';

function PostEdit({ id, history }) {
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

    const handleChange = (key, map) => {
        return (event) => {
            const value = map ? map(event.target.value) : event.target.value;
            setPost({ ...post, [key]: value });
        }
    }

    async function updatePost(event) {
        event.preventDefault();
        await axios.put(`${process.env.REACT_APP_BLOG_API}/posts`, {
            ...post,
            publishDate: dateTo8601(),
            readMinutes: countReadMinutes(post.content)
        }, { headers: { 'Content-Type': 'application/json' } });
        history.push(`/blog/${id}`);
        window.location.reload(false);
    }

    if (!post) {
        return null;
    }

    return (
        <Modal>
            <input id="title" placeholder="Title" value={post.title} readOnly />
            <br />
            <Textarea id="content" placeholder="Your post" rows={100} value={post.content} onChange={handleChange("content")} />
            <input id="tags" placeholder="Add tags" value={post.tags.join(" ")} onChange={handleChange("tags", s => s.split(/\s+/))} />
            <br />
            <span>
                <Button id={"post-edit"} onClick={updatePost}>Edit Post</Button>
                <Button id={"post-close"} linkTo={`/blog/${id}`} style={{ borderLeftWidth: 0 }}>Close</Button>
            </span>
        </Modal>
    );
}

export default  withRouter(PostEdit);
