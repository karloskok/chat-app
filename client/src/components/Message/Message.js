import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import moment from "moment";

const Message = ({ message }) => {
    const { user } = useContext(AppContext);
    const isDarkGreyColor = message.think;

    return (
        <div>

            <div style={{
                padding: '10px 10px 0',
                display: 'flex',
                justifyContent: message.own ? 'right' : 'left'
            }}>
                <div style={{
                    width: 'fit-content',
                    padding: '10px 20px',
                    backgroundColor: message.own ? '#95ee87ad' : '#bfbfbfb8',
                    borderRadius: message.own ? '10px 10px 0 10px' : '10px 10px 10px 0',
                    maxWidth: '60%',
                    textAlign: 'start'
                }}>

                    <span style={{
                        fontSize: 'larger',
                        color: isDarkGreyColor ? 'darkgrey' : "balck",
                        textAlign: message.own ? 'right' : 'left'
                    }}>{message.message}</span>
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
                    {` ${message.author}`}
                </span>
            </div>
        </div>
    )
}

export default Message
