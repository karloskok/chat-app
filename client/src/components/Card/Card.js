import React from 'react';
import './card.css';

const Card = ({ children, width, height, textAlign, round, color, elevation }) => {
    return (
        <div className="card" style={{
            width: width,
            height: height,
            textAlign: textAlign,
            borderRadius: round ? round : 0,
            backgroundColor: color,
            boxShadow: elevation ? `-${elevation}px ${elevation}px ${elevation * 2}px rgb(119 119 119 / 50%)` : 'none'
        }}>
            {children}
        </div>
    )
}

const Header = function ({ children }) {
    return (
        <div style={{
            width: '100%',
            height: '70px',
            backgroundColor: '#F9FBFF',
            borderRadius: '20px 20px 0 0',
        }}>
            {children}
        </div>
    )
};

const Body = function ({ children }) {
    return (
        <div style={{
            width: '100%',
            height: '460px',
            backgroundColor: '#9ff0c259',
            position: 'relative'
        }}>
            {children}
        </div>
    )
}

const Scroll = function ({ children }) {
    return (
        <div style={{
            overflowY: "scroll",
            height: '100%',
            padding: '0 20px',
        }}>
            {children}
        </div>
    )
}

const Footer = function ({ children }) {
    return (
        <div style={{
            width: '100%',
            height: '70px',
            backgroundColor: '#F9FBFF',
            borderRadius: '0 0 20px 20px',
        }}>
            {children}
        </div>
    )
};

const Split = function ({ children }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            padding: '10px',
        }}>
            {children}
        </div>
    )
};

Card.Header = Header;
Card.Body = Body;
Card.Scroll = Scroll;
Card.Footer = Footer;
Card.Split = Split;


export default Card