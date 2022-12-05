const express = require('express') //Instance of the express library
const app = express() //Creating an app from the instance
const nodemailer = require("nodemailer");
const mysql = require('mysql2') //Setting up MySQL. Note that we need mysql2
const cors = require('cors') //Cross-origin resource sharing
const { stepperClasses } = require('@mui/material')
require('dotenv').config() //.env file in this folder holds private information


app.use(cors())
app.use(express.json())




const current = new Date();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
 });

 


const db = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')

app.post('/create', (req, res) => {
  const nickname = req.body.nickname
  const item = req.body.item
  const qty = parseInt(req.body.qty)
  const date = req.body.date
  const phone = req.body.phone

  db.query(
    'INSERT INTO orders22 (nickname, item, qty, date, completed, phone) VALUES (?,?,?,?,?,?)',
    [nickname, item, qty, date, 0, phone],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('Values inserted') //Ending the request by showing a success message
      }
    },
  )
})

app.get('/orders', (req, res) => {
  db.query('SELECT * FROM orders22', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.get('/inventory', (req, res) => {
  db.query('SELECT * FROM inventory', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.get('/openorders', (req, res) => {
  db.query('SELECT * FROM orders22 WHERE completed = 0', 
  (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})



app.put('/update', (req, res) => {
  const id = req.body.id
  const item = req.body.item
  db.query(
    'UPDATE orders22 SET item = ? WHERE id = ?',
    [item, id],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    },
  )
})

app.put('/updateInventory', (req, res) => {
  const Item = req.body.Item
  const QuantityLeft = req.body.QuantityLeft
  db.query(
    `UPDATE inventory SET QuantityLeft = ${QuantityLeft} WHERE Item = "${Item}"`,
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    },
  )
})

app.put('/updateq', (req, res) => {
  const id = req.body.id
  const qty = parseInt(req.body.qty)
  db.query(
    'UPDATE orders22 SET qty = ? WHERE id = ?',
    [qty, id],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    },
  )
})

app.put('/complete', (req, res) => {
  const id = req.body.id
  const completed = parseInt(req.body.completed)
  db.query(
    'UPDATE orders22 SET completed = ? WHERE id = ?',
    [1, id],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    },
  )
})

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  db.query('DELETE FROM orders22 WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})


transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`=== Server is ready to take messages: ${success} ===`);
 });


 app.post("/send", function (req, res) {

  const message = 'Hello '+(req.body.nickname)+',\n Your order is ready for pickup!\n\n Order details:\n\n Order item: '+(req.body.item)+'\n Quantity: '+(req.body.qty)+'\n Email: '+(req.body.phone)+'\n Thank you for your business!'


  let mailOptions = {
    from: process.env.EMAIL,
    to: req.body.phone,
    subject: "Order ready for pickup",
    text: message,
  };
 
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
 });

  



app.listen(3001, () => {
  console.log('Yay, your server is running in port 3001')
})


 
