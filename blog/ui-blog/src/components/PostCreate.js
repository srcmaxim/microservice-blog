import React from 'react';
import './PostCreate.css';

import axios from 'axios';

class PostCreate extends React.Component {
    state = {
        title: "",
        tags: "",
        content: "",
    }

    handleKeyDown(e) {
        e.target.style.height = 'inherit';
        e.target.style.height = e.target.scrollHeight + "px"; 
    }

    handleChange(key) {
        return (event) => {
            this.setState({[key]: event.target.value});
        }
    }

    createPost(event) {
        event.preventDefault()
        const data = this.getData()
        axios.post(`http://localhost:8080/api/blog/posts`, 
            data,
            { headers: { 'Content-Type' : 'application/json'}}
        )
    }

    getData() {
        return {
            ...this.state,
            publishDate: new Date().toISOString(),
            readMinutes: (this.state.content.split(/\s+/) + 280)/ 280
        }
    }

    render() {
        return (
            <>
                <div>
                    <input id="title" placeholder="Title" value={this.state.title} onChange={this.handleChange("title")}/>
                    <br/>
                    <textarea id="content" placeholder="Your post"  onInput={this.handleKeyDown} rows="10" value={this.state.content} onChange={this.handleChange("content")}/>
                    <input id="tags" placeholder="Add tags" value={this.state.tags} onChange={this.handleChange("tags")}/>
                    <br/>
                    <button id="create-post" onClick={this.createPost.bind(this)}>Create Post</button>
                </div>
            </>
        );
    }
}

export default PostCreate;

