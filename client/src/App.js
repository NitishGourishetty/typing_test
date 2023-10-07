import React, { useState, useEffect, useRef } from 'react';
import CardBody from './components/card';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from './components/form';
import Word from './components/Word'
import Timer from './components/Timer'
import { Button } from 'bootstrap';
import './App.css'
import Graph from './components/Graph';



const API_BASE = "http://localhost:5001"


// function Word(props) {
//   const { text, active } = props
//   return <span >{props.text} </span>
// }

function App() {
  //all the text from the database
  const[text, setText] = useState([{_id: '0', title: 'mystery', text: "This is a quick typing test!"}]);  //default values in case database inactive
  //to add text for the user (coming in a different feature)
  const[newText, setNewText] = useState(""); //potentially for adding text
  //to generate a new random text to pull from the database
  const[currentText, setCurrentText] = useState(text[0].text.split(' '));
  //to track the users typing
  const[userInput, setUserInput] = useState('');
  //to monitor which word the user is on
  const[activeWordIndex, setActiveWordIndex] = useState(0); 
  //to check currentWords
  const[correctWordArray, setCorrectWordArray] = useState([]);
  //for timer
  const[startCounting, setStartCounting] = useState(false);
  //wpm states
  const[stats, setStats] = useState([80, 90, 90, 100, 40, 30, 100]);

  let data = {
    // labels,
    datasets: [
      {
        label: 'Average WPM',
        data: [70, 50, 30, 40, 80, 90],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  useEffect(() => {
      getTexts(); 
      getWPM();
      const index = (Math.floor(Math.random() * (text.length))); //to generate a random index
      setCurrentText(text[index].text.split(' '))
      console.log(text);   
      console.log(currentText); 

  }, []); //on mount 

  const getWPM = () => {
    fetch(API_BASE + "/wpm")
      .then(res => res.json())
      .then(data => {
        const wpmList = [];
          for(let i = 0; i < data.length; i++) { //add accuracy another time
            wpmList.push(data[i].wpm);
          }
        setStats(wpmList)}
        
        )
      .catch(err => console.error("Error: ", err)); 
  } 
  

  //fetching from the backend
  const getTexts = () => {
    fetch(API_BASE + "/texts")
      .then(res => res.json())
      .then(data => {setText(data)})
      .catch(err => console.error("Error: ", err)); 
  } 
  
  // if I have time I will implement and use this later
  const addText = async () => {
    const data = await fetch(API_BASE + "/texts", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newText
      })
    })
    console.log(data);
  }

  function processInput(value) {
    //stopping functionality
    if(activeWordIndex === currentText.length) {
      return;  
    }

    //word count and timer
    setStartCounting(true);

    //check if at end
    if(value.endsWith(' ')) { //the user has finished a word
      if(activeWordIndex === currentText.length - 1) {
        setStartCounting(false);
      }
      setActiveWordIndex(index => index + 1);
      setUserInput('');
          const word = value.trim()
      setCorrectWordArray(data => {
        const newResult = [...data]
        newResult[activeWordIndex] = word === currentText[activeWordIndex];
        return newResult
      })
    } else {
      setUserInput(value);
    }


  } 

  function reset() {
    console.log("reset");
    getTexts();
    getWPM();
    
    //console.log(stats);

    const index = (Math.floor(Math.random() * (text.length))); //to generate a random index
    setCurrentText(text[index].text.split(' '))
    setActiveWordIndex(0);
    setStartCounting(false);
    setUserInput('');
    setCorrectWordArray([]);
  }

  function calculateAverageWPM() {
    let sum = 0;
        for(let i = 0; i < stats.length; i++) {
          sum += stats[i];
        }
      return Math.floor(sum/stats.length);
  }

        
  return (
    <div>
      <CardBody>
      <Timer startCounting = {startCounting} correctWords = {correctWordArray.filter(Boolean).length} totalWords = {correctWordArray.length} reset = {reset}></Timer>
      <h3>All Attempts Average WPM: { 
        calculateAverageWPM()
      } </h3>
      </CardBody>
      
       {/* <Form type = "text" value={userInput} onChange={(e) => processInput(e.target.value)}></Form> */}
       

       <CardBody >{currentText.map((word, index) => {
          return <Word 
          text = {word}
          active={index === activeWordIndex}
          correct = {correctWordArray[index]}
        />

       })}</CardBody> 

<input className = "form" size="lg" type="text" placeholder="Start Typing" 
        value={userInput} 
        onChange={(e) => processInput(e.target.value)}/>

        <button className = "button-2" title='reset'
          onClick={reset}>
            reset
        </button>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
       <Graph className = "form" data={stats}> </Graph>
       </div>
     
       

    </div>  

  
        
);
}

export default App;
