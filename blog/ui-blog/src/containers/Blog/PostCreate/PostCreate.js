import React, {useState} from 'react';
import { withRouter } from "react-router";
import { dateTo8601, countReadMinutes } from "../../../functions/Utils";
import './PostCreate.css';

import Button from '../../../components/UI/Button/Button';
import Textarea from '../../../components/UI/Textarea/Textarea';
import Modal from '../../../components/UI/Modal/Modal';
import axios from 'axios';

function PostCreate({ history }) {
    const [post, setPost] = useState({
        title: "",
        content: "",
        tags: []
    });

    const handleChange = (key, map) => {
        return (event) => {
            const value = map ? map(event.target.value) : event.target.value;
            setPost({ ...post, [key]: value });
        }
    }

    async function createPost(event) {
        event.preventDefault();
        const responce = await axios.post(`${process.env.REACT_APP_BLOG_API}/posts`, {
            ...post,
            publishDate: dateTo8601(),
            readMinutes: countReadMinutes(post.content)
        }, { headers: { 'Content-Type': 'application/json' } });
        const id = responce.data.id;
        history.push(`/blog/${id}`);
    }

    if (!post) {
        return null;
    }
    
    return (
        <Modal>
            <input id="title" placeholder="Title" value={post.title} onChange={handleChange("title")} />
            <br />
            <Textarea id="content" placeholder="Your post" rows={100} value={post.content} onChange={handleChange("content")} />
            <input id="tags" placeholder="Add tags" value={post.tags.join(" ")} onChange={handleChange("tags", s => s.split(/\s+/))} />
            <br />
            <span>
                <Button id={ "post-create" } onClick={createPost}>Create Post</Button>
                <Button id={ "post-close" } linkTo={ `/blog` } style={{borderLeftWidth: 0}}>Close</Button>
            </span>
        </Modal>
    );
}

export default withRouter(PostCreate);
