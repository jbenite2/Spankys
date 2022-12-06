import React from 'react';
import logo from '../assets/Spankys.png'
import Button from '@mui/material/Button';
import './Home.css'
import Typography from '@mui/material/Typography';
import {Routes, Route, useNavigate} from 'react-router-dom';

  
function Home(){

	const navigate = useNavigate();

	const navigateToCustomer = () => {
		 navigate('/Customer');
	}

	const navigateEmployee =() => {
		 navigate('/employee');
	}


    return (
        <div className="page">
        <div className="home">
            
        
            <div className="choices">
            <h1 className="title">Welcome to Spanky's!</h1>
            <h4 className="text">I am a ...</h4>
                <Button className="button" onClick={navigateToCustomer} variant='outlined'
  				sx={{ color: 'white', backgroundColor: 'orange', borderColor: 'white', minWidth: '30%', padding: '10px', margin: '20px' }}>Customer</Button>
                <Button className="button" onClick={navigateEmployee} variant='outlined' 
					 sx={{ color: 'white', backgroundColor: 'orange', borderColor: 'white', minWidth: '30%', padding: '10px', margin: '20px' }}>Employee</Button>
            </div>
            <div className="choices2">
            <img src={logo} alt="spanky's logo" className="logo"></img>
            </div>
        </div>
        </div>
    );
}
  
export default Home;
