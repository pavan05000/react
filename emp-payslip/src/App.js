import './App.css';
import { Routes,Route } from 'react-router-dom';
import Login from './ScreenPages/Login';
import Otp from './ScreenPages/Otp';
import Payslips from './ScreenPages/Payslips';
import Body from './ScreenPages/Body';
import ProtectedRoutes from './ScreenPages/Protected';
import SlipViewer from './ScreenPages/SlipViewer';

function App() {
  return (
     <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/otp' element={<Otp/>}></Route>
      <Route element={<ProtectedRoutes/>}>
      <Route path='/main' element={<Body/>}></Route>
      <Route path='/emppayslip' element={<Payslips/>}></Route>
      <Route path='/payslip' element={<SlipViewer/>}></Route>
      </Route>
     </Routes>
  );
}

export default App;
