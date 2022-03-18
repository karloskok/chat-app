import React, { useEffect, useState } from 'react';
import { RiTimerLine } from "react-icons/ri";

const Counter = ({ delay, onExpire, children }) => {
    const [counter, setCounter] = useState(delay);

    useEffect(() => {
        if (counter <= 0) {
            onExpire();
        }

        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <>
            {
                counter > 0 ?
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: '10px',
                    }}><RiTimerLine size={20} />
                        <span style={{
                            marginLeft: '5px'
                        }}>
                            {counter}
                        </span>
                    </div> :
                    <>{children}</>
            }
        </>
    );
}

export default Counter
