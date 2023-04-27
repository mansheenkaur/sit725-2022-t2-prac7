const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://admin:admin@cluster0.9e7k8zc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

client.connect((err) => {
  if (!err) {
    console.log("DB Connected");
  } else {
    consol.error(err);
  }
});

module.exports = client;
