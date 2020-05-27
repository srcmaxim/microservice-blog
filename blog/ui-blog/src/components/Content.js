import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import './Content.css';

import Posts from './Posts';
import Post from './Post';
import PostCreate from './PostCreate';
import Projects from './Projects';
import About from './About';

function Content() {
    return (
        <article id="Content">
            <Switch>
                <Route exact path="/blog"  component={Posts}/>
                <Route exact path="/blog/create"  component={PostCreate}/>
                <Route path="/blog/:postId" component={Post}/>
                <Route path="/projects" component={Projects} />
                <Route path="/about" component={About}/>
            </Switch>
        </article>
    );
}

export default Content;