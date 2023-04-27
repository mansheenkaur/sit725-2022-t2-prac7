const express = require("express");
const app = express();
const cors = require("cors");
require('./dbConnection');

let router = require('./route/route');

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
  })
);

var port = process.env.port || 3001;

app.listen(port, () => {
  console.log("app listening to:" + port);
});
