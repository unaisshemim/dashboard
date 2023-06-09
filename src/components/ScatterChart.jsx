import React, { useEffect, useState } from "react";
import axios from "axios";
import { Scatter } from "react-chartjs-2";
import { Colors } from "chart.js";
import { Chart as ChartJS } from "chart.js";
import { styled } from "styled-components";
import SelectSmall from "./Filter";



ChartJS.register(Colors);
const Container=styled.div`
 
border: 1px solid #eef0f6;
box-shadow: 0 1px 3px rgba(22, 21, 21, 0.24);
margin: 60px;
padding-top: 1%;
padding-bottom: 3%;
`
function ScatterChart() {
  const filterTitle = "Pestle";
  const [pestle, setPestle] = useState([]);
  let [query, setQuery] = useState();

  const handleQuery = async (e) => {
    setQuery(e);
    await fetchData(e);
  };
  const [chart, setChart] = useState([]);
  
  const fetchPestle=async()=>{
    try {
      const response=await axios.get('http://localhost:3001/Data/pestle')
      setPestle(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchData = async (pestleValue) => {
    try {
      const response = await axios.get("http://localhost:3001/Data/region",{
        params:{
          pestle:pestleValue
        }
      });
      setChart(response.data.filter((value) => value.region !== ""));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPestle()
    fetchData(null);
  }, []);

  //colors

  const colors = [];
  const borderColors = [];
  const hueStep = 360 / chart.length;
  
  for (let i = 0; i < chart.length; i++) {
    const hue = i * hueStep;
    const saturation = 50 + Math.random() * 50; // Adjust the saturation range as needed
    const lightness = 50 + Math.random() * 10; // Adjust the lightness range as needed
  
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    const border = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  
    colors.push(color);
    borderColors.push(border);
  }
  


  // const colors = ChartJS.helpers.color.generateColors({
  //     count: chart.length,
  //     scheme: 'brewer.Paired12', // You can use different color schemes
  //   });
  //   console.log(colors.backgroundColor)

  const scatterData = chart.map((item, index) => ({
    label: item.region,
    data: [{ x: item.totalRelevance, y: item.totalIntensity }],
    backgroundColor: colors[index],
    borderColor: borderColors[index],
  }));



  const data = {
    datasets: scatterData,
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Region",
        },
      },
      y: {
        title: {
          display: true,
          text: "Relavance",
        },
      },
    },
  };
  console.log(chart)
  return (
    <Container>
      <SelectSmall margin={90} filterTitle={filterTitle} query={handleQuery} data={pestle} />
      <Scatter data={data} options={options} />
    </Container>
  );
}

export default ScatterChart;
