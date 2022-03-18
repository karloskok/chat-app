import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import moment from "moment";
import ReactEmoji from 'react-emoji';
import './message.css';
import Counter from '../Counter/Counter';


const emoji =
    [
        {
            key: "(smile)",
            value: ":)",
        },
        {
            key: "(wink)",
            value: ";)",
        },
    ];
const Message = ({ message }) => {
    const { user } = useContext(AppContext);
    const isDarkGreyColor = message.think;
    const highlight = message.highlight;
    const fadeMessage = message.fade;
    const countdown = message.countdown;

    function parseEmoji(message) {
        let decodeMessage = message.toString();
        for (let i = 0; i < emoji.length; i++) {
            decodeMessage = decodeMessage.replaceAll(emoji[i].key, emoji[i].value);
        }
        return decodeMessage;
    }
    message.message = parseEmoji(message.message);

    const counterExpired = () => {
        let url = message.message.startsWith('http') ? message.message : `http://${message.message}`;
        message.end = true;
        window.open(url, '_blank');
    };

    if (countdown && message.own != true) {// && message.start != true) {
        message.start = true;

        return (
            <Counter delay={message.count} onExpire={counterExpired} >
                <span>{`Opened ${message.message} in a new window.`}</span>
            </Counter>
        )
        // setTimeout(() => {
        //     let url = message.message.startsWith('http') ? message.message : `http://${message.message}`;
        //     message.end = true;
        //     window.open(url, '_blank');
        // }, (message.count * 1000));

    }

    return (
        <div>

            <div style={{
                padding: '10px 10px 0',
                display: 'flex',
                justifyContent: message.own ? 'right' : 'left'
            }}>
                <div className={`message-bubble ${message.own ? 'right' : 'left'}`} style={{
                    width: 'fit-content',
                    padding: '10px 20px',
                    backgroundColor: message.own ? '#95ee87ad' : '#bfbfbfb8',
                    borderRadius: message.own ? '10px 10px 0 10px' : '10px 10px 10px 0',
                    maxWidth: '60%',
                    textAlign: 'start',
                    opacity: fadeMessage ? '0.1' : '1',
                    filter: highlight ? 'brightness(0.9)' : 'brightness(1)',
                }}>

                    <span style={{
                        fontSize: highlight ? '110%' : '100%',
                        color: isDarkGreyColor ? 'darkgrey' : "balck",
                        textAlign: message.own ? 'right' : 'left'
                    }}>{ReactEmoji.emojify(message.message)}</span>
                </div>

            </div>
            <div style={{
                padding: '0 20px',
                display: 'flex',
                justifyContent: message.own ? 'right' : 'left',
                widows: '100%'
            }}>
                <span style={{
                    fontSize: 'x-small',
                    fontStyle: 'italic'
                }}>
                    {moment(message.time).format("LT")}{" "}
                </span>
                <span style={{
                    fontSize: 'x-small',
                    whiteSpace: 'break-spaces',
                    textTransform: 'uppercase',
                }}>
                    {` (${message.author})`}
                </span>
            </div>
        </div>
    )
}

export default Message
