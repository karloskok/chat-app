import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import moment from "moment";

const Message = ({ message }) => {
    const { user } = useContext(AppContext);
    return (
        <div>

            <div style={{
                padding: '10px 10px 0',
                display: 'flex',
                justifyContent: message.author === user.nickname ? 'right' : 'left'
            }}>
                <div style={{
                    width: 'fit-content',
                    padding: '10px 20px',
                    backgroundColor: message.author === user.nickname ? '#79C7C5' : '#b2b2b2',
                    borderRadius: message.author === user.nickname ? '10px 10px 0 10px' : '10px 10px 10px 0',
                    maxWidth: '60%',
                    textAlign: 'start'
                }}>

                    <span style={{
                        fontSize: 'larger',
                        color: "white",
                        textAlign: message.author === user.nickname ? 'right' : 'left'
                    }}>{message.message}</span>
                </div>

            </div>
            <div style={{
                padding: '0 20px',
                display: 'flex',
                justifyContent: message.author === user.nickname ? 'right' : 'left',
                widows: '100%'
            }}>
                <span style={{
                    fontSize: 'small'
                }}>
                    {moment(message.time).format("LT")}{" "}
                </span>
                <span style={{
                    fontSize: 'small'
                }}>
                    {message.author}
                </span>
            </div>
        </div>
    )
}

export default Message
