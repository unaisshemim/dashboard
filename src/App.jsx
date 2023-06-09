import { styled } from "styled-components";
import "./App.scss";

import BarChart from "./components/BarChart";
import DoughnutChart from "./components/Doughnut";
import GroupBarChart from "./components/GroupBarChart";
import LineChart from "./components/LineChart";
import PrimarySearchAppBar from "./components/Navbar";
import ScatterChart from "./components/ScatterChart";
import Sidebar from "./components/Sidebar";
// import StackedChart from "./components/StackedChart";

const GraphLine = styled.div`
display: flex;
margin-right: "70px";
margin-left:"70px"


`
function App() {
  return (
    <div className="mainContainer">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <PrimarySearchAppBar />
        <div className="graphContainer">
          <BarChart />
          <GraphLine style={{backgroundColor:"transparent",marginLeft:'40px',marginRight:'80px'}} >
            <LineChart />
            <DoughnutChart />
          </GraphLine>
          {/* <StackedChart/> */}
          <GroupBarChart />
          {/* <HorizontalChart/> */}
          <ScatterChart />
        </div>
      </div>
    </div>
  );
}

export default App;
