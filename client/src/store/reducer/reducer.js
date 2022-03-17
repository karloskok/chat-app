import { JOIN_ROOM, SEND_MESSAGE, RECEIVE_MESSAGE, USER_JOINED_ROOM, USER_LEAVE_ROOM, USER_LIST, SET_NICKNAME } from '../actions/actionTypes';


const reducer = (state, action) => {

    switch (action.type) {
        case JOIN_ROOM:
            return {
                ...state,
                user: action.payload,
            }

        case USER_LIST:
            let otherUsers = action.payload.filter(x => x.user != state.user.nickname);
            return {
                ...state,
                users: otherUsers,
            }

        case SET_NICKNAME:
            return {
                ...state,
                user: { ...state.user, nickname: action.payload },
            }

        case USER_JOINED_ROOM:
        case USER_LEAVE_ROOM:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            }

        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            }

        case RECEIVE_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            }
        default:
            return state;
    }
};

export default reducer;