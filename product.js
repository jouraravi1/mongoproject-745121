const express = require('express');
const mongo = require('mongodb');
const app = express();
var bodyParser=require("body-parser");

app.use(express.json());

app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
}));
 
//get

app.get('/api/product_show',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("company");
      dbo.collection("product").find({}).toArray( function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
  });
});

});

                                                                                                                  
//POST

app.post('/api/product_insert',(req,res)=>{
    console.log('i am here');
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
      var myobj = {prod_id : p_id, prod_name : name, quantity :quantity}
      dbo.collection("product").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      });
dbo.collection("product").find({}).toArray(function(err, result) {
if (err) throw err;
console.log(result);
res.send(result)
db.close();
});
});
});


//Delete

app.delete('/api/product3',(req,res)=>{
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
  var myobj = {prod_id : p_id, prod_name : name, quantity :quantity}
  dbo.collection("product").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
	res.send("1 document deleted");
    console.log("1 document deleted");
    db.close();
  });
});
});

//Put
app.put('/api/product4',(req,res)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("company");
  var myquery = {"prod_id" : " 106" };
  var newvalues = { $set: {"prod_id" : " 277"  }};
  dbo.collection("product").updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
    console.log("1 document updated");
    res.send("1 document updated");
    db.close();
  });
});
});

const port=process.env.PORT || 8081;
app.listen(port, () => console.log(`listening on the port ${port}..`));
