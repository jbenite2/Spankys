import './Employee.css'

import React from 'react';
import logo from '../assets/Spankys.png'
import Button from '@mui/material/Button';


import {Routes, Route, useNavigate} from 'react-router-dom';



function Employee(){

	const navigate = useNavigate();
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
		<Button onClick={navigateBack} sx={{ color: 'black', backgroundColor: 'orange', borderColor: 'orange' }}>Back</Button>
	 <div className="header">
	<h1 className="header">Employee page</h1>
	 </div>
	 
	 <div className="buttons">
		 <Button onClick={navigateToOrders} variant='outlined'
  			sx={{ color: 'black', backgroundColor: 'orange', borderColor: 'orange' }}>Manage orders</Button>
	 <Button onClick={navigateToInventory} variant='outlined'
  			sx={{ color: 'black', backgroundColor: 'orange', borderColor: 'orange' }}>Check inventory</Button>
	 <Button onClick={navigateToEmployees} variant='outlined'
  			sx={{ color: 'black', backgroundColor: 'orange', borderColor: 'orange' }}>Employee information</Button>
	 </div>
	 </div>

	 )
}

  
export default Employee;
