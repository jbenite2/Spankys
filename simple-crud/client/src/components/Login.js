import React, { useState } from 'react'
import './Login.css'
import PropTypes from 'prop-types'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

async function loginUser(credentials) {
  return fetch('http://api.spankys.live:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = await loginUser({
      username,
      password,
    })
    setToken(token)
  }

  const navigate = useNavigate()
  const navigateHome = () => {
    navigate('/')
  }

  return (
    <div className="whole-page">
      <Button
        onClick={navigateHome}
        sx={{ color: 'white', backgroundColor: 'orange', borderColor: 'white' }}
        variant="outlined"
      >
        Home
      </Button>
      <div className="login-wrapper">
        <h1 className="title">Please Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p className="labels">Username</p>
            <input type="text" onChange={(e) => setUserName(e.target.value)} />
          </label>
          <label>
            <p className="labels">Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div>
            <button type="submit" className="labelsb">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
}
