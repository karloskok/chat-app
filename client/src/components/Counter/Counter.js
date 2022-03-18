import React, { useEffect, useState } from 'react'

const Counter = ({ delay, onExpire, children }) => {
    const [counter, setCounter] = useState(delay);

    // Third Attempts
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
                    <div>Countdown: {counter}</div> :
                    <>{children}</>
            }
        </>
    );
}

export default Counter
