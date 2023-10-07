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

  useEffect(() => {
      getTexts(); 
      const index = (Math.floor(Math.random() * (text.length))); //to generate a random index
      setCurrentText(text[index].text.split(' '))
      console.log(text);   
      console.log(currentText); 

  }, []); //on mount 

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
    } else {
      setUserInput(value);
    }

    const word = value.trim()
      setCorrectWordArray(data => {
        const newResult = [...data]
        newResult[activeWordIndex] = word === currentText[activeWordIndex];
        return newResult
      })
  } 

  function reset() {
    console.log("reset");
    getTexts();
    const index = (Math.floor(Math.random() * (text.length))); //to generate a random index
    setCurrentText(text[index].text.split(' '))
    setActiveWordIndex(0);
    setStartCounting(false);
    setUserInput('');
    setCorrectWordArray([]);
  }
        
  return (
    <div>
      <Timer startCounting = {startCounting} correctWords = {correctWordArray.filter(Boolean).length}></Timer>
       {/* <Form type = "text" value={userInput} onChange={(e) => processInput(e.target.value)}></Form> */}
       <input className = "form" size="lg" type="text" placeholder="Start Typing" 
        value={userInput} 
        onChange={(e) => processInput(e.target.value)}/>

        <button title='reset'
          onClick={reset}>
        </button>

       <CardBody >{currentText.map((word, index) => {
          return <Word 
          text = {word}
          active={index === activeWordIndex}
          correct = {correctWordArray[index]}
        />

       })}</CardBody> 
    </div>  
);
}

export default App;
