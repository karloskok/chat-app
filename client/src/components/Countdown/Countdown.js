import React from 'react'
import Counter from '../Counter/Counter';
import InfoMessage from '../InfoMessage/InfoMessage';

const Countdown = ({ message }) => {
    const url = message.message.startsWith('http') ? message.message : `http://${message.message}`;
    const counterExpired = () => {
        message.end = true;
        window.open(url, '_blank');
    };

    if (message.own != true) {
        message.start = true;
        return (
            <Counter delay={message.count} onExpire={counterExpired} >
                <div style={{
                    paddingTop: '10px',
                }}>
                    <span>{`Opened ${message.message} in a new window.`}</span>
                </div>
            </Counter>
        )
    } else {
        return (
            <InfoMessage message={`In ${message.count} sec the other members will open ${message.message} in a new window.`} />
        )
    }
}

export default Countdown
