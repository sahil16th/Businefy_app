const express = require('express');
const app = express();
const connectDB = require('./MongoDB/db');
const userRouter = require('./Routes/route');
const cors = require('cors')

const port = 8080;
connectDB();
   
app.use(cors());
app.use(express.json());
app.use('/', userRouter);

app.listen(port, ()=>{
    console.log("Serever is running on port no. 8080");
})