import {
    JOIN_ROOM,
    SEND_MESSAGE,
    RECEIVE_MESSAGE,
    USER_JOINED_ROOM,
    USER_LEAVE_ROOM,
    USER_LIST,
    SET_NICKNAME,
    REMOVE_LAST_MESSAGE,
    TYPING,
    OTHER_IS_TYPING,
    FADE_LAST_MESSAGE
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

const highlightMesage = async (messageData, dispatch, socket) => {
    messageData.highlight = true;
    let rest = messageData.message.replace('/highlight ', '');
    messageData.message = rest;
    await socket.current.emit(SEND_MESSAGE, messageData);
    dispatch({ type: SEND_MESSAGE, payload: messageData });
};

const removeMyLastMessage = async (messageData, dispatch, socket) => {
    await socket.current.emit(REMOVE_LAST_MESSAGE, messageData);
    dispatch({ type: REMOVE_LAST_MESSAGE, payload: messageData });
};

export const removeOtherLastMessage = async (messageData, dispatch, socket) => {
    dispatch({ type: REMOVE_LAST_MESSAGE, payload: messageData });
};


const fadeMyLastMessage = async (messageData, dispatch, socket) => {
    await socket.current.emit(FADE_LAST_MESSAGE, messageData);
    dispatch({ type: FADE_LAST_MESSAGE, payload: messageData });
};
export const fadeOtherLastMessage = async (messageData, dispatch, socket) => {
    dispatch({ type: FADE_LAST_MESSAGE, payload: messageData });
};

const countdown = async (messageData, dispatch, socket) => {
    let [command, count, ...rest] = messageData.message.split(" ");
    rest = rest.join(" ");
    messageData.countdown = true;
    messageData.count = count;
    messageData.message = rest;
    await socket.current.emit(SEND_MESSAGE, messageData);
    dispatch({ type: SEND_MESSAGE, payload: messageData });
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
    } else if (message.startsWith('/highlight ')) {
        highlightMesage(messageData, dispatch, socket);
        parsed = true;
    } else if (message.startsWith('/oops')) {
        removeMyLastMessage(messageData, dispatch, socket);
        parsed = true;
    } else if (message.startsWith('/fadelast')) {
        fadeMyLastMessage(messageData, dispatch, socket);
        parsed = true;
    } else if (message.startsWith('/countdown ')) {
        countdown(messageData, dispatch, socket);
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


export const UserTyping = async (data, socket) => {
    try {
        await socket.current.emit(TYPING, data);
    } catch (error) {
        console.log(error);
    }
};

export const OtherUserTyping = async (data, dispatch) => {
    try {
        dispatch({ type: OTHER_IS_TYPING, payload: data });
    } catch (error) {
        console.log(error);
    }
};
