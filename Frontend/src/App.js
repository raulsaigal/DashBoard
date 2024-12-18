import Home from './Pages/Home';
import Login from './Pages/UserAuthentication/Login';
import Registration from './Pages/UserAuthentication/Registration';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import DashboardPage from './Pages/Dashboard/DashboardPage';
import  {DataTable }  from './Pages/AnalyticsPage/DataTable';
import Setting from './Pages/SettingPage/Setting'



function App() {
  return (
    <>
   
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<DashboardPage/>} />
        <Route path="/register" element={<Registration />} />
        <Route path="/analytics" element={<DataTable />} />
        <Route path="/settings" element={<Setting />} />
       
        

      </Routes>
    
    </>
  
  );
}

export default App;
