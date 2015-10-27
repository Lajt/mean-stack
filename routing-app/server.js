var express = require('express'),
 	app = express(),
	path = require('path');
	 
app.use(express.static('public'));

app.get('*', function(req,res){
	res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.listen(8080, function(err){
	if(err) throw err;
	console.log('listening on port 8080');
});