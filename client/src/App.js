import React, { useState, useEffect, useRef } from 'react';
import CardBody from './components/card';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from './components/form';



const API_BASE = "http://localhost:5001"

function App() {

  const[text, setText] = useState([{_id: '0', title: 'mystery', text: "This is a quick typing test!"}]);  //default values in case database inactive
  const[newText, setNewText] = useState(""); //potentially for adding text
  
  useEffect(() => {
      getTexts(); 
      console.log(text);

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

  return (
       <div>
          <Form></Form>
          <CardBody >{JSON.stringify(text[0].text)}</CardBody> 
       </div>
       


  );
}

export default App;
