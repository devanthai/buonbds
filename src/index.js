const express = require('express');
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const Routers = require('./routers');

const session = require('express-session')
const { createClient } = require("redis");
let RedisStore = require("connect-redis")(session)
let redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error)
app.set('trust proxy', 1)
dotenv.config()
const { PORT } = require('./config/main');

const sessionEx = session({
  secret: 'bdddddddddddssssssssssssssssssssssssss',
  store: new RedisStore({ client: redisClient }),
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 2400 * 60 * 60 * 1000,
    // secure: true
  }
})

app.use(sessionEx)
mongoose.connect(process.env.DB_CONNECT, {}, () => console.log('Connected to db'));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(bodyParser.json({ limit: '30mb' }))
app.use(express.static('public'))
app.set("view engine", "ejs")
app.set("views", "./views")
const server = require('http').createServer(app);
app.use("/", Routers)
server.listen(PORT, () => console.log(`Start server in PORT ${PORT}`));