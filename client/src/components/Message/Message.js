import React from 'react'
import moment from "moment";
import ReactEmoji from 'react-emoji';
import './message.css';
import { emoji } from './emoji';

const Message = ({ message }) => {

    function parseEmoji(message) {
        let decodeMessage = message.toString();
        for (let i = 0; i < emoji.length; i++) {
            decodeMessage = decodeMessage.replaceAll(emoji[i].key, emoji[i].value);
        }
        return decodeMessage;
    }
    message.message = parseEmoji(message.message);

    const ownMessage = message.own ? 'own' : '';
    const fadeMessage = message.fade ? 'fade' : '';
    const highlight = message.highlight ? 'highlight' : '';
    const darkGrey = message.think ? 'darkgrey' : '';

    return (
        <div>
            <div className={`message-container ${ownMessage}`}>
                <div className={`message-bubble ${ownMessage} ${fadeMessage} ${highlight}`}>
                    <span className={`${highlight} ${darkGrey} ${ownMessage}`} >
                        {ReactEmoji.emojify(message.message)}
                    </span>
                </div>

            </div>
            <div className={`message-info ${ownMessage}`}>
                <span className="message-info-time" >
                    {moment(message.time).format("LT")}{" "}
                </span>
                <span className="message-info-author">
                    {` (${message.author})`}
                </span>
            </div>
        </div>
    )
}

export default Message
