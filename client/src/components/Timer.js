import { useEffect, useState } from "react"

function Timer(props) {
    const [timeElapsed, setTimeElapsed] = useState(0)

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
        }
    }, [props.startCounting])

    const minutes = timeElapsed / 60;
    return <div>
        <p>Time: {timeElapsed}</p>
        <p>Speed: {(Math.floor(props.correctWords/minutes)) || 0} WPM</p>
    </div>
    
    
}

export default Timer