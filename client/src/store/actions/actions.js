import { JOIN_ROOM } from './actionTypes'

export const onJoinChat = async (user, dispatch, socket) => {
    try {
        await socket.current.emit(JOIN_ROOM, user.nickname);
        dispatch({ type: JOIN_ROOM, payload: user });
    } catch (error) {
        console.log(error);
    }
}