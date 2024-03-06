const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uploadMiddleware  = require("./index")

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use('/uploads', express.static('uploads'))

app.post('/', uploadMiddleware, (req, res) => {
  res.json(req.images)
})


app.listen(process.env.PORT || 8000, () => console.log('server is run'));