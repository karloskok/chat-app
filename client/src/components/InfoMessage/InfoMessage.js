import React from 'react';
import './infomessage.css';

const InfoMessage = ({ message }) => {
    return (
        <div className="infomessage">
            <span>{message}</span>
        </div>
    )
}

export default InfoMessage
