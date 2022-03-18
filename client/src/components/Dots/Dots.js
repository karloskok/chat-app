import React from 'react';
import './dots.css'

const Dots = ({ typing }) => {
    return (
        <>
            {typing &&
                <div className="bubble show">
                    <div className="ellipsis one"></div>
                    <div className="ellipsis two"></div>
                    <div className="ellipsis three"></div>
                </div>
            }
        </>
    )
}

export default Dots;