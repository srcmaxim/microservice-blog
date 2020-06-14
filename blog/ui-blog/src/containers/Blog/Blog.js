import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";

import Post from './Post/Post';
import Posts from './Posts/Posts';
import PostEdit from './PostEdit/PostEdit';
import PostCreate from './PostCreate/PostCreate';
import PostDelete from './PostDelete/PostDelete';

const Blog = () => (
    <>
    <Switch>
        <Route path="/blog/:id" render={ifRouteMatch("/blog/create", p => <Posts {...p}/>, p => <Post {...{...p, id: p.match.params.id}} />)} />
        <Route path="/blog/" component={Posts} />
    </Switch>
    <Switch>
        <Route exact path="/blog/create" component={PostCreate} />
        <Route exact path="/blog/:id/edit" render={p => <PostEdit {...{...p, id: p.match.params.id}} />} />
        <Route exact path="/blog/:id/delete" render={p => <PostDelete {...{...p, id: p.match.params.id}} />} />
    </Switch>
    </>
);

const ifRouteMatch = (path, a, b) => routeProps => {
    const routePath = routeProps?.location?.pathname;
    return path === routePath ? a(routeProps) : b(routeProps)
}

export default Blog;
