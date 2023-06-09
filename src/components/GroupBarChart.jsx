import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import styled from "styled-components";
import SelectSmall from "./Filter";

const Container = styled.div`
 
border: 1px solid #eef0f6;
box-shadow: 0 1px 3px rgba(22, 21, 21, 0.24);
margin: 60px;
padding-top: 1%;
padding-bottom: 80px;
`;

const GroupBarChart = () => {
  const filterTitle = "End Year";
  const [endYear, setEndYear] = useState([]);
  let [query, setQuery] = useState();

  const handleQuery = async (e) => {
    setQuery(e);
    await fetchData(e);
  };

  const [chart, setChart] = useState([]);


  const fetchEndYear=async()=>{
    try {
      const response=await axios.get('http://localhost:3001/Data/pestle')
      setEndYear(response.data)
     
    } catch (error) {
      console.log(error)
    }
  } 
  


  const fetchData = async (e) => {
    try {
      const response = await axios.get("http://localhost:3001/Data/groupchart",{
        params:{
          end_year:e
        }
      });
      setChart(response.data.filter((value) => value !== ""));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEndYear()
    fetchData(null);
  }, []);

  const label = chart.map((value) => value.sector);
  const inten = chart.map((value) => value.totalIntensity);
  const relavn = chart.map((value) => value.totalRelavance);

  const data = {
    labels: label, // Add your data labels here
    datasets: [
      {
        label: "Intensity",
        data: inten, // Add your intensity data here
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Relavance",
        data: relavn, // Add your relavance data here
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };
  console.log(endYear)
  return (
    <Container>
      <SelectSmall margin={90} filterTitle={filterTitle} query={handleQuery} data={endYear}/>
      <Bar data={data} options={options} />
    </Container>
  );
};

export default GroupBarChart;
