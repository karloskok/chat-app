import React from 'react';
import './inputfield.css'

const InputField = ({ type, label, placeholder, style, onKeyDown, value, onChange }) => {
    return (
        <div className="input-field">
            {
                label &&
                <label>{label || ''}</label>
            }
            <input
                value={value}
                onChange={onChange}
                style={{ ...style }}
                placeholder={placeholder}
                type={type || 'text'}
                onKeyDown={onKeyDown}
            />
        </div>
    )
}

export default InputField
