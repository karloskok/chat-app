import { JoinRoom } from './pages/joinRoom/JoinRoom';
import { Chat } from './pages/chat/Chat';
import './App.css';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';

function App() {

    const { user } = useContext(AppContext);

    return (
        <>
            {
                user ? <Chat /> : <JoinRoom />
            }
        </>
    );
}

export default App;
