const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const tollBooth = require("./routes/tollBooth.route");
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use("/api/tollBooth", tollBooth);

module.exports = app;