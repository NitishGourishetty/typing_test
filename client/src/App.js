import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import Axios from 'axios';

function App() {
  const [text, setText] = useState({
    title: "",
    body: "",
    author: "",
  });
  //setText({title:"", position:"", author:""})
  return (


    <h1>Hi</h1>


  );
}

export default App;
