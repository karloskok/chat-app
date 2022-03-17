import React, { useContext, useEffect, useRef, useState } from 'react'
import { Container } from '../../components'
import Avatar from '../../components/Avatar/Avatar'
import Card from '../../components/Card/Card'
import reducer from '../../store/reducer/reducer'
import { RiSendPlaneFill } from 'react-icons/ri'
import SendInputField from '../../components/InputField/SendInputField';
import { RECEIVE_MESSAGE } from '../../store/actions/actionTypes';
import { AppContext } from '../../context/AppContext';
import { AddMessage, ReceiveMessage } from '../../store/actions/actions'
import Message from '../../components/Message/Message'

export const Chat = () => {

    const scrollRef = useRef();
    const { user, messages, dispatch, socket } = useContext(AppContext);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        socket.current.on(RECEIVE_MESSAGE, (data) => {
            ReceiveMessage(data, dispatch);
        })
    }, [socket.current])

    const handleSubmitMessage = async (e) => {
        e.preventDefault();
        const messageData = {
            author: user.nickname,
            message: newMessage,
            time: new Date()
        }
        AddMessage(messageData, dispatch, socket);
        setNewMessage("");
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmitMessage(event);
        }
    }

    return (
        <Container center top={50}>
            <Card color="#f9fbff54" width={'80%'} height={600} textAlign='center' round={20} elevation={5} >
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
                        }}>KArlo</Container>
                    </Container>
                </Card.Header>

                <Card.Body>
                    <Card.Scroll>
                        {messages.map((m, i) => (
                            <Message key={i} message={m} />
                        ))}
                        <div ref={scrollRef}></div>
                    </Card.Scroll >
                </Card.Body>

                <Card.Footer>
                    <Card.Split>
                        <SendInputField onKeyDown={handleKeyPress} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                        <button onClick={handleSubmitMessage} style={{
                            width: '40px',
                            height: '30px',
                            alignSelf: "center",
                            color: '#79c7c599',
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