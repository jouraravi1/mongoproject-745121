const express = require('express');
const mongo = require('mongodb');
const app = express();
app.use(express.json());

app.get('/api/students', (req,res)=> {
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("mydb");
dbo.collection("students").find({}, { projection: { _id: 0, firstName: 1, lastName: 1 } }).toArray(function(err, result) {
if (err) throw err;
console.log(result);
res.send(result);
db.close();
});
});
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port ${port}..`));