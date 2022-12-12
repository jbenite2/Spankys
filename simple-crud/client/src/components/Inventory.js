import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import './Inventory.css'

function Inventory() {
  const [inventoryList, setInventorylist] = useState([])
  const [currentlyEditing, setCurrentlyEditing] = useState(-2) // -2 is not an index in inventoryList, so will not be seen as currently editing
  const [dummy, setDummy] = useState(-1)

  const navigate = useNavigate()
  const navigateBack = () => {
    navigate('/Employee')
  }

  useEffect(() => {
    console.log('loaded')
  })

  const getInventory = () => {
    Axios.get('http://api.ospankys.live/inventory').then((response) => {
      setInventorylist(response.data)
      console.log(inventoryList)
    })
  }

  useEffect(() => {
    getInventory()
    console.log('inventory in')
  }, [])

  const startEditing = (i) => {
    setCurrentlyEditing(i)
  }

  const handleChange = (i) => (e) => {
    let copyList = inventoryList
    copyList[i].QuantityLeft = e.target.value
    setInventorylist(copyList)
    setDummy(Math.random() * 1000) // not ideal but trying to force it to re-render the new list
    console.log('list', inventoryList)
  }

  const handleUpdate = (food, i) => {
    console.log('update')
    Axios.put('http://api.ospankys.live/updateInventory', {
      Item: food.Item,
      QuantityLeft: food.QuantityLeft,
    }).then((response) => {
      console.log(response)
    })
    setCurrentlyEditing(-2)
  }

  return (
    <div>
      <Button
        onClick={navigateBack}
        sx={{
          color: 'white',
          backgroundColor: 'orange',
          borderColor: 'orange',
        }}
      >
        Back
      </Button>
      <h1 className="header-inventory">Inventory log</h1>

      <div className="table">
        <TableContainer
          sx={{ width: '80%', margin: 'auto', border: '3px solid lightgray' }}
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryList.map((foodItem, i) => {
                console.log(i)
                console.log('curr', currentlyEditing)
                return (
                  <TableRow
                    key={foodItem.Item}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {foodItem.Item}
                    </TableCell>
                    <TableCell>
                      {currentlyEditing == i ? (
                        <TextField
                          value={foodItem.QuantityLeft}
                          onChange={handleChange(i)}
                        />
                      ) : (
                        inventoryList[i].QuantityLeft
                      )}
                    </TableCell>
                    <TableCell>{foodItem.Price}</TableCell>
                    <TableCell>
                      {currentlyEditing == i ? (
                        <IconButton onClick={() => handleUpdate(foodItem, i)}>
                          <CheckIcon></CheckIcon>
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => startEditing(i)}>
                          <EditIcon></EditIcon>
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default Inventory
