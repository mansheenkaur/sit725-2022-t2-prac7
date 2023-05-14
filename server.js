const express = require("express");
const app = express();
const cors = require("cors");
require('./dbConnection');

let router = require('./route/route');
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static("public")); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
  })
);

io.on('connection', (socket) => {
  console.log('the user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
  }, 1000);
});


var port = process.env.port || 3000;

http.listen(port, () => {
  console.log("app listening to:" + port);
});
