import React from 'react';
import './avatar.css';

const Avatar = ({ radius = 35, text = 'K', image }) => {
    return (
        <div className="avatar" style={{
            width: radius,
            height: radius
        }}>
            <p style={{
                fontSize: radius / 2,
                margin: `${radius / 7}px ${radius / 6}px`
            }}>
                {
                    image ? image : text
                }
            </p>
        </div>
    )
}

export default Avatar
