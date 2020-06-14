import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({linkTo, id, style, onClick, children}) {
    return linkTo
        ? <Link data-testid={id} to={ linkTo } >
            <button id={id} style={style} onClick={onClick} className="button">{children}</button>
        </Link>
        : <button data-testid={id} id={id} style={style} onClick={onClick} className="button">{children}</button>
}
