import React from 'react';
import {
    BrowserRouter as Router
  } from "react-router-dom";
import './Layout.css';

import Header from './Header/Header';
import Content from './Content/Content';
import Footer from './Footer/Footer';

function Layout() {
    return (
        <Router>
            <Header/>
            <main className="Main">
                <Content/>
            </main>
            <Footer/>
        </Router>
    );
}

export default Layout;
