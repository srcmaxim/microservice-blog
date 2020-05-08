import React from 'react';
import {
    Switch,
    Route,
  } from "react-router-dom";
import './Aside.css';

function Aside() {
    return (
        <aside className="Aside">
            <Switch>
                <Route path="/blog">
                    <p>Table of Contents</p>
                    <p>1 Subfolder</p>
                    <p className="h2">1.2 Subfolder</p>
                    <p className="h3">1.2.1 Subfolder</p>
                    <p>2 Subfolder</p>
                    <p className="h2">2.1 Subfolder</p>
                </Route>
            </Switch>
        </aside>
    );
}

export default Aside;
