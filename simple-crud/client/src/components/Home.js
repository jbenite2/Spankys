import React from 'react';
import logo from '../assets/Spankys.png';
import Button from '@mui/material/Button';
import './Home.css';
import Typography from '@mui/material/Typography';
import { Routes, Route, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const navigateToCustomer = () => {
    navigate('/Customer');
  };

  const navigateEmployee = () => {
    navigate('/employee');
  };

  return (
    <div className="page">
      <div className="home">
        <div className="choices2">
          <img src={logo} alt="spanky's logo" className="logo" />
        </div>
        <div className="choices" style={{ backgroundColor: 'orange' }}>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            style={{ color: 'white' }}
          >
            Welcome to Spanky's!
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            gutterBottom
            style={{ color: 'white' }}
          >
            I am a ...
          </Typography>
          <Button
            className="button"
            onClick={navigateToCustomer}
            variant="contained"
            sx={{
              color: 'white',
              backgroundColor: 'orange',
              borderColor: 'white',
              minWidth: '100%',
              padding: '10px',
              margin: '20px',
            }}
          >
            Customer
          </Button>
          <Button
            className="button"
            onClick={navigateEmployee}
            variant="contained"
            sx={{
              color: 'white',
              backgroundColor: 'orange',
              borderColor: 'white',
              minWidth: '100%',
              padding: '10px',
              margin: '20px',
            }}
          >
            Employee
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
