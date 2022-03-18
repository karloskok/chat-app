import React, { useContext, useEffect, useRef, useState } from 'react'
import { Container } from '../../components'
import Avatar from '../../components/Avatar/Avatar'
import Card from '../../components/Card/Card'
import reducer from '../../store/reducer/reducer'
import { RiSendPlaneFill } from 'react-icons/ri'
import SendInputField from '../../components/InputField/SendInputField';
import { RECEIVE_MESSAGE, USER_JOINED_ROOM, USER_LEAVE_ROOM, USER_LIST, REMOVE_LAST_MESSAGE, OTHER_IS_TYPING, FADE_LAST_MESSAGE } from '../../store/actions/actionTypes';
import { AppContext } from '../../context/AppContext';
import { AddMessage, ReceiveMessage, UserJoinedRoom, UserLeaveRoom, UserListChange, removeOtherLastMessage, UserTyping, OtherUserTyping, fadeOtherLastMessage } from '../../store/actions/actions'
import Message from '../../components/Message/Message'
import InfoMessage from '../../components/InfoMessage/InfoMessage'
import Dots from '../../components/Dots/Dots'

export const Chat = () => {

    const scrollRef = useRef();
    const { user, users, messages, typing, dispatch, socket } = useContext(AppContext);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        socket.current.on(RECEIVE_MESSAGE, (data) => {
            ReceiveMessage(data, dispatch);
        });

        socket.current.on(USER_JOINED_ROOM, (data) => {
            UserJoinedRoom(data, dispatch);
        });

        socket.current.on(USER_LEAVE_ROOM, (data) => {
            UserLeaveRoom(data, dispatch);
        });

        socket.current.on(USER_LIST, (data) => {
            UserListChange(data, dispatch);
        });

        socket.current.on(REMOVE_LAST_MESSAGE, (data) => {
            removeOtherLastMessage(data, dispatch);
        });

        socket.current.on(FADE_LAST_MESSAGE, (data) => {
            fadeOtherLastMessage(data, dispatch);
        });

        socket.current.on(OTHER_IS_TYPING, (data) => {
            OtherUserTyping(data, dispatch);
        });

    }, [socket.current]);

    useEffect(() => {
        UserTyping({ user: user.nickname, typing: newMessage != "" }, socket);
    }, [newMessage]);

    const Validate = () => {
        let valid = true;
        if (newMessage == '') {
            valid = false;
        }
        return valid;
    }

    const handleSubmitMessage = async (e) => {
        e.preventDefault();
        if (!Validate()) {
            return;
        }

        const messageData = {
            author: user.nickname,
            message: newMessage,
            time: new Date(),
            own: true,
        }
        AddMessage(messageData, dispatch, socket);
        setNewMessage("");
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmitMessage(event);
        }
    }
    const getUsersList = () => {
        let name = user.nickname;
        let usersText = users.map(x => x.user).join(', ');
        if (usersText != '') {
            return `${name} - ${usersText}`;
        } else {
            return name;
        }
    }

    return (
        <Container center height={'100vh'}>
            <Card width={'80%'} height={600} textAlign='center' round={20} elevation={5} >
                <Card.Header>
                    <Container top='10px' style={{
                        padding: 0,
                        paddingLeft: '20px',
                    }}>
                        <Avatar text="K" radius={50} />
                        <Container top={15} style={{
                            padding: '15px 70px',
                            textAlign: 'left',
                            textTransform: 'uppercase',
                            color: '#777777',
                            fontSize: '1em',
                            letterSpacing: '3px',
                            fontWeight: '400',
                        }}>
                            <div style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {
                                    getUsersList()
                                }
                            </div>
                        </Container>
                    </Container>
                </Card.Header>

                <Card.Body>
                    <Card.Scroll>
                        <div style={{ height: '50px' }}></div>
                        <InfoMessage message={`Welcome ${user.nickname}!`} />
                        {
                            messages.map((m, i) => {
                                if (m.info) {
                                    return (
                                        <InfoMessage key={i} message={m.message} />
                                    )
                                } else if (m.removed) {
                                    return (
                                        <InfoMessage key={i} message={m.message} />
                                    )
                                } else {
                                    return (
                                        <Message key={i} message={m} />
                                    )
                                }
                            })
                        }
                        <div ref={scrollRef}></div>
                        <div style={{ height: '40px' }}></div>
                    </Card.Scroll >
                    <Dots typing={typing} />
                </Card.Body>

                <Card.Footer>
                    <Card.Split>
                        <SendInputField onKeyDown={handleKeyPress} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                        <button onClick={handleSubmitMessage} style={{
                            width: '40px',
                            height: '30px',
                            alignSelf: "center",
                            color: '#6ac07099',
                            backgroundColor: "transparent",
                            border: 'none'
                        }}>
                            <RiSendPlaneFill size={25} />
                        </button>
                    </Card.Split>

                </Card.Footer>

            </Card>
        </Container>
    )
}