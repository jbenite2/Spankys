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
        <div className="home">
            <img src={logo} alt="spanky's logo" className="logo"></img>
            <h4 className="text">I am a ...</h4>
            <div className="choices">
                <Button onClick={navigateToCustomer} variant='outlined'
  				sx={{ color: 'black', backgroundColor: 'orange', borderColor: 'orange', minWidth: '30%', padding: '30px', margin: '20px' }}>Customer</Button>
                <Button onClick={navigateEmployee} variant='outlined' 
					 sx={{ color: 'black', backgroundColor: 'orange', borderColor: 'orange', minWidth: '30%', padding: '30px', margin: '20px' }}>Employee</Button>
            </div>
        </div>
    );
}
  
export default Home;
