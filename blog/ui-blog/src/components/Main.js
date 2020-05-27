import React from 'react';
import './Main.css';

import Aside from './Aside';
import Content from './Content';

function Main() {
    return (
        <main className="Main">
            <Aside/>
            <Content/>
        </main>
    );
}

export default Main;
