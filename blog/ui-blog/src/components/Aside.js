import React from 'react';
import {
    Switch,
    Route,
  } from "react-router-dom";
import './Aside.css';

class Aside extends React.Component {
    state = { 
        m: []
    };

    intervalId = setInterval(() => this.renderAside(), 200);
    
    renderAside() {
        let content = document.querySelectorAll('#Content')[0];
        if (content) { 
            var contents = [...content.children].filter(el => {
                return el.nodeName.match(/^h\d$/i);
            }).map(el => {
                var clazz = el.nodeName.toLowerCase();
                var id = el.innerText.toLowerCase().replace(/\s/g, "-")
                el.setAttribute('id',id);
                return { id: "#" + id, clazz, text: el.innerText };
            });
            this.setState({ m: contents });
        }
    }

    render() {
        return (
            <aside id="Aside">
                <Switch>
                    <Route path="/blog">
                        {this.state.m.length !== 0 ? (<p>Table of Contents</p>) : null}    
                        {this.state.m.map(el => <a href={el.id}><p className={el.clazz} >{el.text}</p></a>)}
                    </Route>
                </Switch>
            </aside>
        );
    }

    componentWillUnmount() {
        clearTimeout(this.intervalId);
    }
}

export default Aside;
