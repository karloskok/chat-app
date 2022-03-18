import React, { useContext, useRef, useState } from 'react'
import { Container } from '../../components'
import Avatar from '../../components/Avatar/Avatar'
import Card from '../../components/Card/Card'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'
import { AppContext } from '../../context/AppContext'
import { onJoinChat } from '../../store/actions/actions'
import Text from '../../components/Text/Text'

export const JoinRoom = () => {
    const { dispatch, socket } = useContext(AppContext);
    const [nickname, setnickname] = useState('')

    const Validate = () => {
        let valid = true;

        if (nickname == '') {
            valid = false;
        }
        return valid;
    }

    const onJoinClick = () => {
        if (Validate()) {
            onJoinChat({ nickname: nickname }, dispatch, socket);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onJoinClick();
        }
    }

    return (
        <Container center height={'100vh'}>
            <Card color="#e3f1f280" width={350} height={250} textAlign='center' round={20} elevation={5} >
                <Container center height={150}>
                    <Avatar text="K" radius={80} />
                    <Text style={{
                        marginTop: '120px',
                        textTransform: 'uppercase',
                        fontWeight: 'lighter',
                        fontSize: '1em',
                        letterSpacing: '3px',
                        color: 'rgb(119, 119, 119)',
                    }}>Live chat app</Text>
                </Container>
                <Container center height={100}>
                    <div>

                        <InputField onKeyDown={handleKeyPress} value={nickname} onChange={(e) => setnickname(e.target.value)} placeholder='Enter nickname' style={{
                            borderRadius: '8px 0 0 8px'
                        }} />
                    </div>
                    <Button label='Join' onClick={onJoinClick} />
                </Container>
            </Card>
        </Container>
    )
}
