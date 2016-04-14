var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

db.serialize(function(){
	db.each("SELECT * from data", function(err, row){
		console.log(row)
	})
})