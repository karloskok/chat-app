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
        <div className="card-header">
            {children}
        </div>
    )
};

const Body = function ({ children }) {
    return (
        <div className="card-body">
            {children}
        </div>
    )
}

const Scroll = function ({ children }) {
    return (
        <div className="card-scroll">
            {children}
        </div>
    )
}

const Footer = function ({ children }) {
    return (
        <div className="card-footer">
            {children}
        </div>
    )
};

const Split = function ({ children }) {
    return (
        <div className="card-split">
            {children}
        </div>
    )
};

Card.Header = Header;
Card.Body = Body;
Card.Scroll = Scroll;
Card.Footer = Footer;
Card.Split = Split;


export default Card;