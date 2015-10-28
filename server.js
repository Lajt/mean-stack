var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	config = require('./config'),
	path = require('path');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



mongoose.connect(config.database, function(err){
	if(err){
		throw err;
	}
	console.log('DB connected successfully.');
});

app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
	next();
});

app.use(morgan('dev'));

app.use(express.static('public'));

/*app.get('/', function(req,res){
	res.send('Hello World!');
});*/
app.get('*', function(req,res){
	res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
});


var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);




app.listen(config.port, function(err){
	if(err){
		throw err;
	}
	console.log('http://localhost:'+ config.port);
});