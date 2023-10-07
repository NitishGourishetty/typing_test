import { useEffect, useState } from "react"

const API_BASE = "http://localhost:5001"
//all WPM calculations here, this is to send a user's WPM to the database!
const addWPM = async (currWPM, currAccuracy) => {
    const data = await fetch(API_BASE + "/wpm", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        wpm: currWPM,
        accuracy: currAccuracy
      })
    })
    console.log(data);
}

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
            clearInterval(id);
            if(props.reset === true) {
                console.log("hahahhahahaha")
            }
            setTimeElapsed(0);
           
        }
    }, [props.startCounting])

    const minutes = timeElapsed / 60;
    let currSpeed = Math.floor(props.correctWords/minutes);
    
    if(timeElapsed != 0 && isFinite(timeElapsed)) {
        //potentially make it only add once
        addWPM(currSpeed, props.correctWords / props.totalWords) //will add WPM data for every second, useful for graphing later if necessary
    }
    
    if(isFinite(currSpeed)) {
        prevCurrSpeed = currSpeed;
    } else {
        currSpeed = prevCurrSpeed;
    }


    
    
    return <div>
        <h3>Time: {timeElapsed}</h3>
        <h3>Speed: {currSpeed} WPM</h3>
        <h3>Accuracy: {Math.floor((props.correctWords / props.totalWords) * 100)}%</h3>
    </div>
    
    
}

export default Timer