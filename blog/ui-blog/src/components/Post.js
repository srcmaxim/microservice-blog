import React from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

import axios from 'axios';
import ReactMarkdown from 'react-markdown';

class Post extends React.Component {
    state = {
        post: null
    }

    componentDidMount() {
        const { postId } = this.props.match.params
        axios.get(`http://localhost:8080/api/blog/posts/${postId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            const post = res.data;
            axios.get(post.contentUrl).then(res => {
                const content = res.data;
                this.setState({ post: { ...post, content} });
            })
        })
    }

    render() {
        const post = this.state.post;
        if (!post) {
            return <></>;
        }
        return (
            <>
                <Link to={ "/blog/" + post.id  } ><h1>{ post.title }</h1></Link>
                <span>⏱️ { new Date(post.publishDate).toLocaleString("en-US", {year: 'numeric',  month: 'long', day: 'numeric'}) } </span>
                <span>⌛ { post.readMinutes + " min" } </span>
                <span>🏷️ { post.tags?.join(" ") } </span>
                <ReactMarkdown source={ post.content } />
            </>
        );
    }
}

export default Post;

