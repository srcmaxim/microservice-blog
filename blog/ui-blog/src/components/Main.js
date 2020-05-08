import React from 'react';
import './Main.css';

import Aside from './Aside';
import Article from './Article';

function Main() {
    return (
        <main className="Main">
            <Aside/>
            <Article/>
        </main>
    );
}

export default Main;
