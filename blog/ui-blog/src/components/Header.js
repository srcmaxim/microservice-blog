import React from 'react';
import { Redirect, NavLink } from "react-router-dom";
import './Header.css';

function Header() {
    return (
        <header className="Header">
          <div className="Header-logo">
          KOVAL MAKSYM 🌄
          </div>
          {/* <Redirect from="/" exact to="/blog" /> */}
          <nav className="Header-nav">
            <ul>
              <li><NavLink  to="/blog"  className="Header-link" activeClassName="Header-active">BLOG</NavLink></li>
              <li><NavLink  to="/projects" className="Header-link" activeClassName="Header-active">PROJECTS</NavLink></li>
              <li><NavLink  to="/about" className="Header-link Header-last-link" activeClassName="Header-active">ABOUT</NavLink></li>
            </ul>
          </nav>
        </header>
    );
}

export default Header;
