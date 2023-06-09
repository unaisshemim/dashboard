import React, { useEffect, useState } from 'react'
import axios from 'axios'


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import SelectSmall from './Filter';

const Container=styled.div`
border: 1px solid #eef0f6;
box-shadow: 0 1px 3px rgba(22, 21, 21, 0.24);
margin: 60px;

`


function BarChart() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
        );

let [label,setLabel]=useState([])
let [sector,setSector]=useState([])
let [query,setQuery]=useState()

const handleQuery= async(e)=>{
  setQuery(e)
  await fetchData(e)
}


const fetchData=async(sectorValue)=>{
  try {
       //const encodedSectorValue = qs.stringify({ sector: sectorValue });
      const response=await axios.get('http://localhost:3001/Data/publications', {
        params: {
          sector: sectorValue // Replace with the actual sector value
        }
      })
     setLabel(response.data)
  } catch (error) {
      console.log(error)
  }
}
const fetchSector=async()=>{
  try {
    const response=await axios.get('http://localhost:3001/Data/sectors')
    setSector(response.data)
   
  } catch (error) {
    console.log(error)
  }
}
useEffect(()=>{
  fetchSector()
    fetchData(null);
  },[])
  

 const filterTitle="Sector"
  
  //title
  
  const titleByCountry={};
  
  label.forEach(item=>{
      const {country}=item;
      if(titleByCountry.hasOwnProperty(country)){
          titleByCountry[country]+=1
        }else{
            titleByCountry[country]=1
        }
    })
    delete titleByCountry[""];
    
    const arr = Object.entries(titleByCountry).map(([country, value]) => ({ country, value }));
    

    const labels=arr.map(e=>e.country); 
    const values=arr.map(e=>e.value)

    

   

    const generateUniqueColors = (count) => {
      const colors = [];
      for (let i = 0; i < count; i++) {
        const hue = (360 / count) * i;
        const color = `hsl(${hue}, 70%, 50%)`;
        colors.push(color);
      }
      return colors;
    };
    const colors = generateUniqueColors(labels.length);
//<oncha=>( fetchData(usa))>
 const data = {
    labels,
    datasets: [
      {
        label: 'Publications',
        data: values,
        backgroundColor: colors,
      },
      
    ],
  };
   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'No of publications per country',
      },
      
    },
  };

  return (
    <Container>
      <SelectSmall margin={85}   data={sector} filterTitle={filterTitle} query={handleQuery}/>
    <Bar options={options} data={data} />
    </Container>
  )
}

export default BarChart