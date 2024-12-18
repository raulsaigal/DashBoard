import React from "react";
import Navbar from './Dashboard/Navbar';
import Sidebar from './Dashboard/Sidebar';
import Widgets from './Dashboard/Widgets';
import Charts from './Dashboard/Charts';



const Dashboard = () => {
  return (
    <>
    <div>
      <Navbar />
      <Sidebar />
      <Widgets />
      <Charts />
    </div>

    
    </>
    
  );
};

export default Dashboard;