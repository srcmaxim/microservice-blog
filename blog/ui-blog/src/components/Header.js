import React from 'react';
import './Header.css';

function Header() {
    return (
        <header className="Header">
          <div className="Header-logo">
          KOVAL MAKSYM 🌄
          </div>
          <nav>
            <ul>
              <li className="Header-hover">BLOG</li>
              <li>PROJECTS</li>
              <li>ABOUT</li>
            </ul>
          </nav>
        </header>
    );
}

export default Header;
