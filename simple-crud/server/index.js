const express = require('express') //Instance of the express library
const app = express() //Creating an app from the instance
const nodemailer = require('nodemailer')
const mysql = require('mysql2') //Setting up MySQL. Note that we need mysql2
const cors = require('cors') //Cross-origin resource sharing
const { stepperClasses } = require('@mui/material')
require('dotenv').config() //.env file in this folder holds private information
const basicAuth = require('express-basic-auth')
const cookieParser = require('cookie-parser')
var Venmo = require('venmo')
var client_id = process.env.VENMO_CLIENT_ID
var client_secret = process.env.VENMO_SECRET
var venmo = new Venmo(client_id, client_secret)
const open = require('open')

app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'))

// cors
app.use(
  cors({
    origin: ['https://www.ospankys.live'],
  }),
)

app.use(express.json())

// logs in to website if these credentials are entered
app.use('/login', (req, res) => {
  if (req.body.username == 'spankys' && req.body.password == 'spankys22') {
    res.send({
      token: 'spankys',
    })
  } else {
    console.log('Error - incorrect credentials')
    res.send('')
  }
})

var object = {
  user: 'mattschoess',
}

// venmo pay route
app.post('/pay', (req, res) => {
  venmo.pay(object, function (error, link) {
    if (error) {
      console.log(error)
    } else {
      open(link, function (err) {
        if (err) throw err
      })
      console.log(link)
    }
  })
})

const current = new Date()

// email authorization
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
})

const db = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')

// inserts order into database
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

// shows orders and sends them back to client
app.get('/orders', (req, res) => {
  db.query('SELECT * FROM orders22', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

// shows inventory and sends back to client
app.get('/inventory', (req, res) => {
  db.query('SELECT * FROM inventory', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

// sends incomplete orders to user
app.get('/openorders', (req, res) => {
  db.query('SELECT * FROM orders22 WHERE completed = 0', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

// counts open orders to determine number in line
app.get('/countopenorders', (req, res) => {
  db.query('SELECT * FROM orders22 WHERE completed = 0', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.send(result)
    }
  })
})

// updates order in db if changed from client
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

// updates inventory if table is changed 
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

// update quantity of order given certain id
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

// mark order as completed
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

// delete order given certain id
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
    : console.log(`=== Server is ready to take messages: ${success} ===`)
})

// email route
app.post('/send', function (req, res) {
  const message =
    'Hello ' +
    req.body.nickname +
    ',\n Your order is ready for pickup!\n\n Order details:\n\n Order item: ' +
    req.body.item +
    '\n Quantity: ' +
    req.body.qty +
    '\n Email: ' +
    req.body.phone +
    '\n There are ' +
    req.body.numOpen +
    ' orders ahead of you.\n Thank you for your business!'

  let mailOptions = {
    from: process.env.EMAIL,
    to: req.body.phone,
    subject: 'Order ready for pickup',
    text: message,
  }

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log('Error ' + err)
    } else {
      console.log('Email sent successfully')
    }
  })
})

// sends email confirmation
app.post('/sendconf', function (req, res) {
  const message =
    'Hello ' +
    req.body.nickname +
    ',\n Here is your order confirmation:\n\n Order details:\n\n Order item: ' +
    req.body.item +
    '\n Quantity: ' +
    req.body.qty +
    '\n Email: ' +
    req.body.phone +
    '\n There are ' +
    req.body.numOpen +
    ' orders ahead of you.'

  let mailOptions = {
    from: process.env.EMAIL,
    to: req.body.phone,
    subject: 'Order confirmation',
    text: message,
  }

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log('Error ' + err)
    } else {
      console.log('Email sent successfully')
    }
  })
})

// cancels order and sends email about cancellation
app.post('/sendcancel', function (req, res) {
  const message =
    'Hello ' +
    req.body.nickname +
    ',\n Your order has been canceled.\n\n Reason:\n\n' +
    req.body.message

  let mailOptions = {
    from: process.env.EMAIL,
    to: req.body.phone,
    subject: 'Order cancelled',
    text: message,
  }

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log('Error ' + err)
    } else {
      console.log('Email sent successfully')
    }
  })
})

app.listen(3000, () => {
  console.log('Yay, your server is running in port 3000')
})
