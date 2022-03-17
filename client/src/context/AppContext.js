import { createContext, useEffect, useReducer, useRef } from "react";
import reducer from "../store/reducer/reducer";
import io from 'socket.io-client';


const INITIAL_STATE = {
    user: null,
    messages: [],
    users: [],
    usersTyping: [],
    typing: false,
};

export const AppContext = createContext(INITIAL_STATE);
export const AppContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const socket = useRef();

    useEffect(() => {
        socket.current = io.connect("http://localhost:8080");
    }, []);

    return (
        <AppContext.Provider
            value={{
                user: state.user,
                users: state.users,
                messages: state.messages,
                typing: state.typing,
                usersTyping: state.usersTyping,
                socket,
                dispatch,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};