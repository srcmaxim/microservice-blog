import React from 'react';
import {
  BrowserRouter as Router
} from "react-router-dom";
import './App.css';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
        <Router>
          <Header/>
          <Main/>
          <Footer/>
        </Router>
    </div>
  );
}

export default App;
