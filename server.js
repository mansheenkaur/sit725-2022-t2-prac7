const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://admin:admin@cluster0.9e7k8zc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
let dbCollection;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
  })
);

app.get("/api/cats", (req, res) => {
  getAllCats((err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, data: result, message: "Successfull" });
    }
  });
});

function dbConnection(collectionName) {
  client.connect((err) => {
    dbCollection = client.db().collection(collectionName);
    if (!err) {
      console.log("DB Connected");
      console.log(dbCollection);
    } else {
      consol.error(err);
    }
  });
}

app.post("/api/cats", (req, res) => {
  let cat = req.body;
  insert(cat, (err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({
        statusCode: 200,
        data: result,
        message: "Successfully Added",
      });
    }
  });
});

function insert(cat, callback) {
  dbCollection.insertOne(cat, callback);
}

function getAllCats(callback) {
  dbCollection.find().toArray(callback);
}

var port = process.env.port || 3000;

app.listen(port, () => {
  console.log("app listening to:" + port);
  dbConnection("Cats");
});
