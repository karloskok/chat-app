import { JOIN_ROOM, SEND_MESSAGE, RECEIVE_MESSAGE } from './actionTypes'

export const onJoinChat = async (user, dispatch, socket) => {
    try {
        await socket.current.emit(JOIN_ROOM, user.nickname);
        dispatch({ type: JOIN_ROOM, payload: user });
    } catch (error) {
        console.log(error);
    }
}

export const AddMessage = async (messageData, dispatch, socket) => {
    try {
        await socket.current.emit(SEND_MESSAGE, messageData);
        dispatch({ type: SEND_MESSAGE, payload: messageData });
    } catch (error) {
        console.log(error);
    }
};

export const ReceiveMessage = (messageData, dispatch) => {
    try {
        dispatch({ type: RECEIVE_MESSAGE, payload: messageData });
    } catch (error) {
        console.log(error);
    }
};