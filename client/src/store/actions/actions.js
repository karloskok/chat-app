import {
    JOIN_ROOM,
    SEND_MESSAGE,
    RECEIVE_MESSAGE,
    USER_JOINED_ROOM,
    USER_LEAVE_ROOM,
    USER_LIST,
    SET_NICKNAME,
    REMOVE_LAST_MESSAGE,
} from './actionTypes'

export const onJoinChat = async (user, dispatch, socket) => {
    try {
        await socket.current.emit(JOIN_ROOM, user.nickname);
        dispatch({ type: JOIN_ROOM, payload: user });
    } catch (error) {
        console.log(error);
    }
}

export const UserJoinedRoom = (user, dispatch) => {
    try {
        dispatch({ type: USER_JOINED_ROOM, payload: user });
    } catch (error) {
        console.log(error);
    }
};

export const UserListChange = (users, dispatch) => {
    try {
        dispatch({ type: USER_LIST, payload: users });
    } catch (error) {
        console.log(error);
    }
};

export const UserLeaveRoom = (user, dispatch) => {
    try {
        dispatch({ type: USER_LEAVE_ROOM, payload: user });
    } catch (error) {
        console.log(error);
    }
};

const setNickname = async (messageData, dispatch, socket) => {
    let rest = messageData.message.replace('/nick ', '');

    await socket.current.emit(SET_NICKNAME, rest);
    dispatch({ type: SET_NICKNAME, payload: rest });
};
const changeColorToDarkGrey = async (messageData, dispatch, socket) => {
    messageData.think = true;
    let rest = messageData.message.replace('/think ', '');
    messageData.message = rest;
    await socket.current.emit(SEND_MESSAGE, messageData);
    dispatch({ type: SEND_MESSAGE, payload: messageData });
};
const removeLastMessage = async (messageData, dispatch, socket) => {

    // await socket.current.emit(REMOVE_LAST_MESSAGE, messageData);
    dispatch({ type: REMOVE_LAST_MESSAGE, payload: messageData });
};


const ParseMessage = (messageData, dispatch, socket) => {
    let parsed = false;
    let message = messageData.message;
    if (message.startsWith('/nick ')) {
        setNickname(messageData, dispatch, socket);
        parsed = true;
    } else if (message.startsWith('/think ')) {
        changeColorToDarkGrey(messageData, dispatch, socket);
        parsed = true;
    } else if (message.startsWith('/oops')) {
        removeLastMessage(messageData, dispatch, socket);
        parsed = true;
    }
    return parsed;
}

export const AddMessage = async (messageData, dispatch, socket) => {
    try {
        if (ParseMessage(messageData, dispatch, socket)) {
            return;
        }

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