var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	port = process.env.PORT || 8080;
	
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/lajtapp', function(err){
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

app.get('/', function(req,res){
	res.send('Hello World!');
});

// api

var apiRouter = express.Router();

apiRouter.use(function(req,res,next){
	console.log('New request to api captured though middleware');
	next();
});

apiRouter.get('/', function(req,res){
	res.json({message: 'welcome to api!'});
});

apiRouter.route('/users')
	.post(function(req,res){
		var user = new User();
		user.name = req.body.name;
		user.username = req.body.username;
		user.password = req.body.password;
		
		user.save(function(err){
			if(err){
				if(err.code == 11000){
					return res.json({success: false, message: 'A user with that '
					+'username already exists. '});
				}
				else{
					return res.send(err);
				}
			}
			res.json({message: 'User created!'});
		});
	})
	.get(function(req,res){
		User.find(function(err,users){
			if(err) res.send(err);
			res.send(users);
		})
	});
	
apiRouter.route('/users/:user_id')
	.get(function(req,res){
		User.findById(req.params.user_id, function(err,user){
			if(err) res.send(err);
			
			res.json(user);
		});
	})
	.put(function(req,res){
		User.findById(req.params.user_id, function(err, user){
			if(err) res.send(err);
			
			if(req.body.name) user.name = req.body.name;
			if(req.body.username) user.username = req.body.username;
			if(req.body.passowrd) user.password = req.body.password;
			
			user.save(function(err){
				if(err) res.send(err);
				
				res.json({ message: 'User updated!'});
			})
		});
	})
	.delete(function(req, res){
		User.remove({
			_id: req.params.user_id
		}, function(err){
			if(err) res.send(err);
			res.json({message: 'Successfully deleted!'});
		});
	});

app.use('/api', apiRouter);

app.listen(port, function(err){
	if(err){
		throw err;
	}
	console.log('http://localhost:'+ port);
});