import { JOIN_ROOM } from '../actions/actionTypes';


const reducer = (state, action) => {

    switch (action.type) {
        case JOIN_ROOM:
            return {
                ...state,
                user: action.payload,
            }
        default:
            return state;
    }
};

export default reducer;