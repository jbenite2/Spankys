import React from 'react'
import './EmployeeInfo.css'

function EmployeeInfo() {
  return (
    <div className="page">
      <div className="header">
        <h1>Employee Information:</h1>
      </div>

      <div className="row">
        <div className="clm">
          <img src={require('../assets/rocco.jpg')} height="300"></img>
          <h3> Justin "Rocco" Pajak</h3>
          <h3>Class: Senior</h3>
          <h3>Section: 3B</h3>
        </div>
        <div className="clm">
          <img src={require('../assets/mino.jpg')} height="300"></img>
          <h3> Gilberto "Mino" Cerda </h3>
          <h3>Class: Junior</h3>
          <h3>Section: 3B</h3>
        </div>
        <div className="clm">
          <img src={require('../assets/hacker.jpg')} height="300"></img>
          <h3> Matthew "Hacker" Schoessling</h3>
          <h3>Class: Senior</h3>
          <h3>Section: 4B</h3>
        </div>
      </div>
      <div className="row">
        <div className="clm">
          <img src={require('../assets/turbo.jpg')} height="300"></img>
          <h3> Brendan "Turbo" Noland </h3>
          <h3>Class: Sophomore</h3>
          <h3>Section: 4A</h3>
        </div>
        <div className="clm">
          <img src={require('../assets/mino.jpg')} height="300"></img>
          <h3> Colby "Biggie Cheese" Rossman </h3>
          <h3>Class: Junior</h3>
          <h3>Section: 1A</h3>
        </div>
        <div className="clm">
          <img src={require('../assets/hacker.jpg')} height="300"></img>
          <h3> Kevin "Nilla" Lance</h3>
          <h3>Class: Junior</h3>
          <h3>Section: 3B</h3>
        </div>
      </div>
    </div>
  )
}

export default EmployeeInfo
