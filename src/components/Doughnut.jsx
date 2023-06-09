import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import styled from 'styled-components'
import SelectSmall from "./Filter";
ChartJS.register(ArcElement, Tooltip, Legend);

const Container = styled.div`
background-color: white;
border: 1px solid #eef0f6;
box-shadow: 0 1px 3px rgba(22, 21, 21, 0.24);
flex: 1;  
margin-left: 20px;


`;



export default function DoughnutChart() {
  const [chart, setChart] = useState([]);
  const [topic,setTopic]=useState([]);
  const filterTitle="Topic"
  let [query,setQuery]=useState()
  const handleQuery= async(e)=>{
    setQuery(e)
    await fetchData(e)
  }


  const fetchTopic=async()=>{
    try {
      const response=await axios.get('http://localhost:3001/Data/topics')
      setTopic(response.data)
     
    } catch (error) {
      console.log(error)
    }
  } 
  
  const fetchData = async (topicValue) => {
    try {
      const response = await axios.get("http://localhost:3001/Data/sector",{
        params:{
          topic:topicValue
        }
      });
      setChart(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
   fetchTopic();
    fetchData();
  }, []);

  const sectorData = chart.map((value) => value.sector);
  const valueData = chart.map((value) => value.value);

  //colors
  const colors = [];
  const borderColors = [];
  for (let i = 0; i < sectorData.length; i++) {
    const hue = (300 / sectorData.length) * i;
    const saturation = 200 + Math.random() * 20; // Adjust the saturation range as needed
    const lightness = 50 + Math.random() * 10; // Adjust the lightness range as needed

    const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`;
    const border = `hsla(${hue}, ${saturation}%, ${lightness}%, 1)`;

    colors.push(color);
    borderColors.push(border);
  }
  const data = {
    labels: sectorData,
    datasets: [
      {
        label: "# of Votes",
        data: valueData,
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };



  return (
    <Container>
      <SelectSmall margin={70} filterTitle={filterTitle} query={handleQuery} data={topic}/>
      <Doughnut data={data} style={{padding:'80px '}} />
    </Container> 
  );
}
 

