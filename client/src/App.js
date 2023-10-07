import { useState, useEffect } from 'react';

const API_BASE = "http://localhost:5001"

function App() {
  const[text, setText] = useState([]);
  //const[newText, setNewText] = useState(""); //potentially for adding text



  useEffect(() => {
    getTexts();
    console.log(text);
    
  }, []); //on mount

  const getTexts = () => {
    fetch(API_BASE + "/texts")
      .then(res => res.json())
      .then(data => setText(data))
      .catch(err => console.error("Error: ", err));
  } 



  return (
    <h1>Hi</h1>
  );
}

export default App;
