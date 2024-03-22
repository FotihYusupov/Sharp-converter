const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const uploadMiddleware  = require("./index")
const path = require("path")
const fs = require("fs")

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use('/uploads', express.static('uploads'))

app.get('/zip/:filename', (req, res) => {
  const { filename } = req.params;
  
  const zipFilePath = path.join(__dirname, 'zip', filename);
  console.log(zipFilePath);
  if (fs.existsSync(zipFilePath)) {
    res.download(zipFilePath)
  } else {
    res.status(404).send('Zip file not found.');
  }
});

app.post('/', uploadMiddleware, (req, res) => {
  res.json(req.images)
})


app.listen(process.env.PORT || 8000, () => console.log('server is run'));