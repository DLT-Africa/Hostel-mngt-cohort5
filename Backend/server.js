require("dotenv").config();
const mongoose = require("mongoose")
const connectDb =  require("./config/db")
const errorHandler = require("./middleware/errormiddleware")
const express = require("express");
const cors = require("cors")
const app  = express();





const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin");
    next()
})

app.use(cors({

    origin: ["http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
}))


app.get("/", (req, res) => console.log("Hello Teady!"))


connectDb();

app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Database Connected");

    app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
})

