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
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data = {
    // labels,
    datasets: [
      {
        label: 'Average WPM',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  
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
    
    
    return  <Line data={displayedData} />

  }
  