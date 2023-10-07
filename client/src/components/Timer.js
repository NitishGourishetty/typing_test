import { useEffect, useState } from "react"

function Timer(props) {
    const [timeElapsed, setTimeElapsed] = useState(0)
    let prevCurrSpeed = 0;
    useEffect(() => {
        let id;
        if(props.startCounting) {
            id = setInterval(() => {
                setTimeElapsed(oldTime => oldTime + 1)
            }, 1000)
        }

        return () => {
            //to reset time
            clearInterval(id);
            setTimeElapsed(0);
        }
    }, [props.startCounting])

    const minutes = timeElapsed / 60;
    let currSpeed = Math.floor(props.correctWords/minutes);
    if(isFinite(currSpeed)) {
        prevCurrSpeed = currSpeed;
    } else {
        currSpeed = prevCurrSpeed;
    }
    
    
    return <div>
        <p>Time: {timeElapsed}</p>
        <p>Speed: {currSpeed} WPM</p>
    </div>
    
    
}

export default Timer