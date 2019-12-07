const express = require('express');
const mongo = require('mongodb');
const app = express();
app.use(express.json());

//get
app.get('/api/customer1',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("company");
      dbo.collection("customer").find({}).toArray( function(err, result) {
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

app.post('/api/customer2',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("company");
var myobj = {"customer_id" : "A001", "customer_name" : "Navdeep", "Contact" : "4168887974"}
dbo.collection("customer").insertOne(myobj, function(err, res) {
if (err) throw err;
console.log("Number of documents inserted: " + res.insertedCount);
db.close();
});
dbo.collection("customer").find({}).toArray(function(err, result) {
if (err) throw err;
console.log(result);
res.send(result)
db.close();
});
});
});

//delete
app.delete('/api/customer3',(req,res)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("company");
  var myquery = {"customer_id" : "A001", "customer_name" : "Navdeep", "Contact" : "4168887974"};
  dbo.collection("customer").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
	res.send("1 document deleted");
    console.log("1 document deleted");
    db.close();
  });
});
});

//put

app.put('/api/customer4',(req,res)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("company");
  var myquery = {"customer_id" : "C002"};
  var newvalues = { $set: {"customer_id" : "D7788" }};
  dbo.collection("cust").updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
    console.log("1 document updated");
    res.send("1 document updated");
    db.close();
  });
});
});