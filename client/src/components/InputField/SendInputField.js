import React from 'react';
import './inputfield.css'

const SendInputField = ({ value, onChange, onKeyDown }) => {
    return (
        <input
            onKeyDown={onKeyDown}
            className="send-input"
            style={{
                width: '87%',
                height: '35px',
                border: 'none',
                backgroundColor: '#F9FBFF',
                borderColor: '#F9FBFF',
                color: '#87c779'
            }}
            type='text'
            value={value}
            onChange={onChange}
        />
    )
}

export default SendInputField
