import { JOIN_ROOM, SEND_MESSAGE, RECEIVE_MESSAGE } from '../actions/actionTypes';


const reducer = (state, action) => {

    switch (action.type) {
        case JOIN_ROOM:
            return {
                ...state,
                user: action.payload,
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