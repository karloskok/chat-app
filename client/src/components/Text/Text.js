import React from 'react'

const Text = ({ children, style }) => {
    return (
        <span style={style}>
            {children}
        </span>
    )
}

export default Text
