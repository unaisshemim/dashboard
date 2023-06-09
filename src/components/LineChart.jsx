import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { styled } from "styled-components";
import SelectSmall from "./Filter";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart() {
  const [chart, setChart] = useState([]);
  const [country,setCountry]=useState([]);
  const [query,setQuery]=useState()
  const filterTitle="Country"
 
  const handleQuery= async(e)=>{
   setQuery(e)
    await fetchData(e)
  }
 

  const fetchData = async (countryValue) => {
    try {
      const response = await axios.get(`http://localhost:3001/Data/time`,{
        params:{
          country:countryValue
        }
      });
      setChart(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCountry=async()=>{
    try {
      const response=await axios.get('http://localhost:3001/Data/country')
      setCountry(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchCountry()
    fetchData(null);

  }, []);
  const labels = chart.map((value) => value.end_year);
  const datas = chart.map((value) => value.totalLikelihood);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "End Year",
          font:{
            weight:'bold'
          }
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Likelihood",
          font:{
            weight:'bold'
          }
        },
      },
    },
  };

  //   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: datas,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const Container = styled.div`
      
      background-color: white;
      border: 1px solid #eef0f6;
      box-shadow: 0 1px 3px rgba(22, 21, 21, 0.24);
      flex: 1;
      margin-left:19px;

      `;

  return (
    <Container>
      <SelectSmall margin={82} filterTitle={filterTitle} query={handleQuery} data={country} styl/>
      <Line options={options} data={data} style={{ marginTop: "74px" }} />
    </Container>
  );
}
