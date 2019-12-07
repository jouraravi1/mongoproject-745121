const express = require('express');
const mongo = require('mongodb');
const app = express();
app.use(express.json());

//get
app.get('/api/supplier1',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("company");
      dbo.collection("supplier").find({}).toArray( function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
  });
});

});

const port=process.env.PORT || 8081;
app.listen(port, () => console.log(`listening on the port ${port}..`));

//POST

app.post('/api/supplier2',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("company");
var myobj = {"supplier_id" : "A001", "supplier_name" : "Harsh", "Contact" : "6478883243"}
dbo.collection("supplier").insertOne(myobj, function(err, res) {
if (err) throw err;
console.log("Number of documents inserted: " + res.insertedCount);
db.close();
});
dbo.collection("supplier").find({}).toArray(function(err, result) {
if (err) throw err;
console.log(result);
res.send(result)
db.close();
});
});
});


//delete
app.delete('/api/supplier3',(req,res)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("company");
  var myquery = {"supplier_id" : "A001", "supplier_name" : "Harsh", "Contact" : "6478883243"};
  dbo.collection("supplier").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
	res.send("1 document deleted");
    console.log("1 document deleted");
    db.close();
  });
});
});

//put

app.put('/api/supplier4',(req,res)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("company");
  var myquery = {"supplier_id" : " 106" };
  var newvalues = { $set: {"supplier_id" : " A1001" }};
  dbo.collection("supplier").updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
    console.log("1 document updated");
    res.send("1 document updated");
    db.close();
  });
});
});