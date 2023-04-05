const express = require('express');
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



const cardList = [
  {
    title: "Kitten 2",
    image: "images/kitten-2.jpg",
    link: "About Kitten 2",
    desciption: "Demo desciption about kitten 2",
  },
  {
    title: "Kitten 3",
    image: "images/kitten-3.jpg",
    link: "About Kitten 3",
    desciption: "Demo desciption about kitten 3",
  },
];

const cors = require('cors');

app.use(cors({
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with']
}));


app.get("/api/cats", (req, res) => {
  res.json({ statusCode: 200, data: cardList, message: "Success" });
});

var port = process.env.port || 3000;

app.listen(port, () => {
  console.log("app listening to:" + port);
});