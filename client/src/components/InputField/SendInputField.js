import React from 'react';
import './inputfield.css'

const SendInputField = ({ value, onChange, onKeyDown }) => {
    return (
        <input
            onKeyDown={onKeyDown}
            className="send-input"
            type='text'
            value={value}
            onChange={onChange}
        />
    )
}

export default SendInputField
