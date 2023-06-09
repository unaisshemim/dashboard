const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//imports files models

const Data=require('./routes/data')

//middleware
app.use(cors());
dotenv.config();
app.use(express.json());


//server mongoDB

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("server connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/Data',Data)

//server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
