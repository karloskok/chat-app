import React from 'react'

const InfoMessage = ({ message }) => {
    return (
        <div style={{
            fontSize: 'small',
            padding: '20px',
            fontStyle: 'italic',
            fontWeight: 'lighter'
        }}>
            <span>{message}</span>
        </div>
    )
}

export default InfoMessage
