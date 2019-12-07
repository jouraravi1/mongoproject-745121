const express = require('express');
const mongo = require('mongodb');
const app = express();
app.use(express.json());
var bodyParser=require("body-parser");

app.use(express.json());

app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
//get
app.get('/api/warehouse_get',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("company");
      dbo.collection("warehouse").find({}).toArray( function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
  });
});

});

//post

app.post('/api/product2',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
var p_id= req.body.p_id,
        name=req.body.p_name,
        quantity=req.body.p_quantity;
        
        console.log(p_id);
        console.log(name);
        console.log(quantity);

MongoClient.connect(url, function(err, db) {
if (err) throw err;
var dbo = db.db("company");
var myobj = {warehouse_id:"206",location:"Toronto",supplier_id:"C001"}
dbo.collection("warehouse").insertOne(myobj, function(err, res) {
if (err) throw err;
console.log("Number of documents inserted: " + res.insertedCount);
db.close();
});
dbo.collection("warehouse").find({}).toArray(function(err, result) {
if (err) throw err;
console.log(result);
res.send(result)
db.close();
});
});
});


//Delete



 app.delete('/api/warehouse1',(req,res)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("company");
  var myquery = {warehouse_id:"206",location:"Toronto",supplier_id:"C001"};
  dbo.collection("warehouse").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
	res.send("1 document deleted");
    console.log("1 document deleted");
    db.close();
  });
});
});


 
// Put

app.put('/api/warehouse2',(req,res)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("company");
  var myquery = {"warehouse_id" : "A222" };
  var newvalues = { $set: {"warehouse_id" : "B122"  }};
  dbo.collection("warehouse").updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
    console.log("1 document updated");
    res.send("1 document updated");
    db.close();
  });
});
});
const port=process.env.PORT || 8081;
app.listen(port, () => console.log(`listening on the port ${port}..`));