import {
    JOIN_ROOM,
    SEND_MESSAGE,
    RECEIVE_MESSAGE,
    USER_JOINED_ROOM,
    USER_LEAVE_ROOM,
    USER_LIST,
    SET_NICKNAME,
    REMOVE_LAST_MESSAGE,
    OTHER_IS_TYPING,
    FADE_LAST_MESSAGE
} from '../actions/actionTypes';


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

        case REMOVE_LAST_MESSAGE:
            let lastMessage = state.messages.findLast(x => x.author === action.payload.author);
            lastMessage.removed = true;
            lastMessage.message = `Message deleted by ${action.payload.author}!`;
            return {
                ...state,
            }

        case FADE_LAST_MESSAGE:
            let fadeMessage = state.messages.findLast(x => x.author === action.payload.author);
            fadeMessage.fade = true;
            return {
                ...state,
            }

        case OTHER_IS_TYPING:
            let exist = state.usersTyping.find(x => x.user === action.payload.user);
            if (!exist) {
                state.usersTyping = [...state.usersTyping, action.payload];
            }
            let usersTypeing = state.usersTyping.map(x => x.user === action.payload.user ? { ...x, typing: action.payload.typing } : x);
            let typing = usersTypeing.some(x => x.typing == true);
            return {
                ...state,
                usersTyping: usersTypeing,
                typing: typing,
            }
        default:
            return state;
    }
};

export default reducer;