const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const {connectDB} = require('./config/db');

dotenv.config();

connectDB()

const app=express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true
}));
app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use(require('./routes/index'));

app.get('/', (req, res) => {
  res.send({
    error: false,
    message: "WELCOME FINANCE TRACKER API PROJECT",
    user: req.user,
  });
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});