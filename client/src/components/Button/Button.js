import React from 'react';
import './button.css';


const Button = ({ label, onClick }) => {
    return (
        <button className="button" onClick={onClick}>{label}</button>
    )
}

export default Button
