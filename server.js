require("dotenv").config();
const express = require("express");
const cors = require("cors");

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  }

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res)=>{
    res.json("Working");
})

//Starting app
app.listen(process.env.PORT, ()=>{
    console.log("App is listening on the Port :-", process.env.PORT);
})