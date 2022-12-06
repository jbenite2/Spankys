import React from 'react'
import './EmployeeInfo.css'
import Button from '@mui/material/Button';
import {BrowswerRouter, Switch, Routes, Route, useNavigate} from 'react-router-dom';

function EmployeeInfo() {

  const navigate = useNavigate();
  const navigateBack = () => {
		navigate('/employee');
	}


  return (
    <div className="page-inventory">
      <Button onClick={navigateBack} sx={{ color: 'white', backgroundColor: 'orange', borderColor: 'orange' }} variant="outlined">Back</Button>
      <div className="header-info">
        <h1>Employee Information:</h1>
      </div>

      <div className="row">
        <div className="clm">
          <img
            src={require('../assets/rocco.jpg')}
            alt="Rocco"
            height="300"
          ></img>
          <h3 className="empinfo"> Justin "Rocco" Pajak</h3>
          <h3 className="empinfo">Class: Senior</h3>
          <h3 className="empinfo">Section: 3B</h3>
        </div>
        <div className="clm">
          <img
            src={require('../assets/mino.jpg')}
            alt="Mino"
            height="300"
          ></img>
          <h3 className="empinfo"> Gilberto "Mino" Cerda </h3>
          <h3 className="empinfo">Class: Junior</h3>
          <h3 className="empinfo">Section: 3B</h3>
        </div>
        <div className="clm">
          <img
            src={require('../assets/hacker.jpg')}
            alt="Hacker"
            height="300"
          ></img>
          <h3 className="empinfo"> Matthew "Hacker" Schoessling</h3>
          <h3 className="empinfo">Class: Senior</h3>
          <h3 className="empinfo">Section: 4B</h3>
        </div>
      </div>
      <div className="row">
        <div className="clm">
          <img
            src={require('../assets/turbo.jpg')}
            alt="Turbo"
            height="300"
          ></img>
          <h3 className="empinfo"> Brendan "Turbo" Noland </h3>
          <h3 className="empinfo">Class: Sophomore</h3>
          <h3 className="empinfo">Section: 4A</h3>
        </div>
        <div className="clm">
          <img
            src={require('../assets/biggie.png')}
            alt="Biggie Cheese"
            height="300"
          ></img>
          <h3 className="empinfo"> Colby "Biggie Cheese" Rossman </h3>
          <h3 className="empinfo">Class: Junior</h3>
          <h3 className="empinfo">Section: 1A</h3>
        </div>
        <div className="clm">
          <img
            src={require('../assets/nilla.png')}
            alt="Nilla"
            height="300"
          ></img>
          <h3 className="empinfo"> Kevin "Nilla" Lance</h3>
          <h3 className="empinfo">Class: Junior</h3>
          <h3 className="empinfo">Section: 3B</h3>
        </div>
      </div>
    </div>
  )
}

export default EmployeeInfo
