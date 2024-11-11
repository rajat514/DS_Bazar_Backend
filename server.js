require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const PORT = process.env.PORT || 5002
const app = express();
const dbURL = process.env.DATABASE_URL

const router = require('./routes/routes');

mongoose
    .connect(dbURL)
    .then(() => console.log("MongoDB Connected"))
    .catch(() => console.log("MongoDB Error"));


const corsOptions = {
    origin: '*', // Restrict to this domain
    // methods: ['GET', 'POST', 'PUT'], // Only allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};
app.use(cors(corsOptions));
app.options('*', cors());

app.use((req, res, next) => {
    req.body = {
        ...req.body,
        ...req.file
    }
    next()
});

app.use(
    fileUpload()
);

app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
    console.log(`server start at Port no-${PORT}`)
})


