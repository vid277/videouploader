//make an express server
const express = require('express');

/**
 * 
 * Cross-origin resource sharing is a mechanism that allows restricted 
 * resources on a web page to be requested from another domain outside
 * the domain from which the first resource was served. 
 * 
 **/
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

//import the routes
const { readdirSync } = require("fs");

app.use(cors());
app.use(express.json());

//connect to mongodb
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log("DB connected"))
.catch((err) => console.log(err));

//routes
readdirSync("./routes").map((file) => 
app.use("/", require(`./routes/${file}`)));

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=> console.log(`App listening on port: ${PORT}`))