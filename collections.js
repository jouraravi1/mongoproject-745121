const express = require('express');
const app = express();
app.use(express.json());



app.get('/api/company',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
		
		
	

		
	 if (err) throw err;
      var dbo = db.db("company");
	  
	 
      dbo.listCollections().toArray( function(err, result_1){
      if (err) throw err;
		console.log(result_1);
		//res.send(result_1);
 
      db.close();
	  });

  
});

});

const port=process.env.PORT || 8081;
app.listen(port, () => console.log(`listening on the port ${port}..`));



