import React from 'react';
import './container.css'

const Container = ({ children, center, top, width, height, style }) => {
    const centerStyle = {
        display: center ? "flex" : "inherit",
        justifyContent: center ? "center" : "inherit"
    }

    return (
        <div className="container" style={{
            textAlign: center ? "-webkit-center" : "inherit",
            width: width,
            height: height,
            ...centerStyle,
            ...style,
            paddingTop: top,
        }}>
            {children}
        </div>
    )
}
export default Container;