import "./App.css";
import Employee from "./components/Employee";
import Customer from "./components/Customer";
import Home from "./components/Home";
import Order from "./components/Order";
import EmployeeInfo from "./components/EmployeeInfo";
import Inventory from "./components/Inventory";
import Shifts from "./components/Shifts";
import Archive from "./components/OrderArchive";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

function App() {


  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/employee' element={<Employee/>}></Route>
        <Route path='/customer' element={<Customer/>}></Route>
		  <Route path='/order' element={<Order/>}></Route>
		  <Route path='/inventory' element={<Inventory/>}></Route>
		  <Route path='/employeeinfo' element={<EmployeeInfo/>}></Route>
		  <Route path='/shifts' element={<Shifts/>}></Route>
      <Route path='/orderarchive' element={<Archive/>}></Route>

      </Routes>
    </Router>
  );
}

export default App;
