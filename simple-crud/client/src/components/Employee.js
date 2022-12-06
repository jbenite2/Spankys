import './Employee.css'

import React, {useState} from 'react';
import logo from '../assets/Spankys.png'
import Button from '@mui/material/Button';
import Login from './Login.js';
import {BrowswerRouter, Switch, Routes, Route, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import ReactDOM from "react-dom";
import graphic from '../assets/graphic.png';



  


function Employee(){

	const navigate = useNavigate();
	const [token, setToken] = useState();
	if(!token) {
		return <Login setToken={setToken} />
	}


	

	const navigateToOrders = () => {
		 navigate('/Order');
	}

	const navigateToInventory = () => {
		 navigate('/Inventory');
	}

	const navigateToEmployees = () => {
		 navigate('/EmployeeInfo');
	}

	const navigateToShifts = () => {
		 navigate ('/Shifts');
	}

	const navigateBack = () => {
		navigate('/');
	}




    return (


	<div className="page">
		<Button onClick={navigateBack} sx={{ color: 'white', backgroundColor: 'orange', borderColor: 'orange' }}>Back</Button>
	 <div className="header">
	<h1 className="header-employee">Employee dashboard</h1>
	 </div>
	 
	 <div className="buttons">
		 <Button onClick={navigateToOrders} variant='outlined'
  			sx={{ color: 'white', backgroundColor: 'orange', borderColor: 'orange' }}>Manage orders</Button>
	 <Button onClick={navigateToInventory} variant='outlined'
  			sx={{ color: 'white', backgroundColor: 'orange', borderColor: 'orange' }}>Check inventory</Button>
	 <Button onClick={navigateToEmployees} variant='outlined'
  			sx={{ color: 'white', backgroundColor: 'orange', borderColor: 'orange' }}>Employee information</Button>
	 </div>
	 <div className="image-employee">
	 <img src={graphic} alt="food graphic" className="logo-employee"/>
	 </div>
	 </div>

	 )
}

  
export default Employee;
