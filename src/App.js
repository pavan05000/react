import React from "react";
import { Routes,Route } from "react-router-dom";
import Login from "./ScreenPages/Login";
import Body from "./ScreenPages/Body";
import Department from './Components/Department';
import Designation from './Components/Designation';
import EmployeeReg from './Components/EmployeeReg';
import EmployeeView from './Components/EmployeeView';
import PayslipView from './Components/PaySlipsView';
import PaySlipReg from './Components/PaySlipReg';
import RelievingReg from './Components/RelievingReg';
import RelievingView from './Components/RelivingView'; 
import Otp from "./ScreenPages/Otp";
import SampleLogin from "./ScreenPages/SampleLogin";
import Xyz from './Components/xyz'
import UserReg from "./Components/UserReg";
import UsersView from "./Components/UsersView";
import FileViewer from "./Components/FileViewer";
import ProtectedRoutes from "./ScreenPages/Protected";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/otp" element={<Otp/>}></Route>
        <Route element={<ProtectedRoutes/>}> 
        <Route path="/main" element={<Body/>}></Route>
        <Route path="/department" element={<Department/>}></Route>
        <Route path="/designation" element={<Designation/>}></Route>
        <Route path="/employeeview" element={<EmployeeView/>}></Route>
        <Route path="/employeeRegistration" element={<EmployeeReg/>}></Route>
        <Route path="/payslipview/" element={<PayslipView/>}> </Route>
        <Route path="/payslipRegistration" element={<PaySlipReg/>}></Route>
        <Route path="/payslip" element={<FileViewer/>}></Route>
        <Route path="/relievingview" element={<RelievingView/>}></Route>
        <Route path="/relievingRegistration" element={<RelievingReg/>}></Route>
        <Route path="/xyz" element={<Xyz/>}></Route> 
        <Route path="/usersRegistration" element={<UserReg/>}></Route>
        <Route path="/usersView"  element={<UsersView/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
