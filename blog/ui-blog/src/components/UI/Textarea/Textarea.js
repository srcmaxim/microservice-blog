import React from 'react';

const textarea = ({id, placeholder, rows, value, onChange }) => (
    <textarea id={id} placeholder={placeholder}  rows={rows} onInput={handleKeyDown} value={value} onChange={onChange}/>
);

const handleKeyDown = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = e.target.scrollHeight + "px"; 
}

export default textarea;
