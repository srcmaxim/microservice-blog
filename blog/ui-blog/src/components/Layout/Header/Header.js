import React from 'react';
import { NavLink } from "react-router-dom";
import './Header.css';

function Header() {
    return (
        <header className="Header">
          <div className="Header-logo">
          KOVAL MAKSYM <span role="img" aria-label="logo">🌄</span>
          </div>
          <nav className="Header-nav">
            <ul>
              <li><NavLink  to="/blog"  id="blog-link" className="Header-link Header-first-link" activeClassName="Header-active">BLOG</NavLink></li>
              <li><NavLink  to="/projects" id="projects-link" className="Header-link" activeClassName="Header-active">PROJECTS</NavLink></li>
              <li><NavLink  to="/about" id="about-link" className="Header-link Header-last-link" activeClassName="Header-active">ABOUT</NavLink></li>
            </ul>
          </nav>
        </header>
    );
}

export default Header;
