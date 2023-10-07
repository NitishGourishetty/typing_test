import React from "react";
import { useEffect, useState } from "react"


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

    

  const API_BASE = "http://localhost:5001"
  let labels = [];
 
  
  
  export default function Graph(props) {
    let displayedData = {
        labels,
        datasets: [
            {
              label: 'Average WPM',
              data: props.data,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
          ],
    }
    //console.log(displayedData);
    useEffect(() => {
            labels.push(" ");
        displayedData = {
            labels,
            datasets: [
                {
                  label: 'Average WPM',
                  data: props.data,
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],
        }
    }, [props.data])
    
    
    return  <div style={{height: "750px", width: "750px"}}> <Line data={displayedData} /> </div> 

  }
  