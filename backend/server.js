require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose').set('debug', true)
const app = express()
const VerifyToken = require('./middlewares/VerifyToken')
const isAdmin = require('./middlewares/isAdmin')
const cors = require('cors')
const sockets = require('./libs/Sockets')
const user = require('./functions/user.js')
const form = require('./functions/form.js')

mongoose.connect(process.env.DB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
var allowedOrigins = ['http://localhost:8080', 'http://localhost:8080/']
app.use(cors({
  exposedHeaders: ['Content-Length', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-access-token', 'x-access-token-viewas', 'cache-control'],
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.'
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, cache-control')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Content-Type', 'application/json')
  res.header('Vary', 'Origin')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

const server = app.listen(3000)
sockets.init(server)


app.post('/user', user.register)
app.post('/user/login', user.login)
app.post('/user/admin', isAdmin, user.makeAdmin)
app.get('/user/authenticated', VerifyToken, user.authenticated)
app.post('/user/logout', VerifyToken, user.logout)
app.get('/user/search', isAdmin, user.search)

app.get('/forms', VerifyToken, form.list)
app.get('/form/search', isAdmin, form.search)
app.get('/forms/admin', isAdmin, form.adminList)
app.post('/form', VerifyToken, form.add)
app.get('/form/:code', VerifyToken, form.single)
app.put('/form/:code', VerifyToken, form.update)
app.put('/form/verify/:code', isAdmin, form.verify)
