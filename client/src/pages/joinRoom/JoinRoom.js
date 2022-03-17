import React, { useContext, useRef, useState } from 'react'
import { Container } from '../../components'
import Avatar from '../../components/Avatar/Avatar'
import Card from '../../components/Card/Card'
import InputField from '../../components/InputField/InputField'
import { RiLoginCircleLine } from 'react-icons/ri';
import Button from '../../components/Button/Button'
import { AppContext } from '../../context/AppContext'
import { onJoinChat } from '../../store/actions/actions'

export const JoinRoom = () => {

    const [nickname, setnickname] = useState('')

    const { dispatch, socket } = useContext(AppContext);

    const onJoinClick = () => {
        onJoinChat({ nickname: nickname }, dispatch, socket);
    };

    return (
        <Container center top={100}>
            <Card color="#e3f1f280" width={350} height={350} textAlign='center' round={20} elevation={5} >
                <Container center height={100} top={50}>
                    <Avatar text="K" radius={80} image={<RiLoginCircleLine />} />
                </Container>
                <Container center height={180} top={20}>
                    <InputField value={nickname} onChange={(e) => setnickname(e.target.value)} placeholder='Enter nickname' style={{
                        borderRadius: '8px 0 0 8px'
                    }} />
                    <Button label='Join' onClick={onJoinClick} />
                </Container>
            </Card>
        </Container>
    )
}
