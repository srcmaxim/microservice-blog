import React from 'react';
import {
    Switch,
    Redirect,
    Route,
} from "react-router-dom";
import './Content.css';

import Blog from '../../../containers/Blog/Blog';
import Projects from '../Projects/Projects';
import About from '../About/About';

function Content() {
    return (
        <article id="Content">
            <Switch>
                <Route path="/blog"  component={Blog}/>
                <Route path="/projects" component={Projects} />
                <Route path="/about" component={About}/>
                <Redirect exact from='/' to='/blog' />
            </Switch>
        </article>
    );
}

export default Content;
