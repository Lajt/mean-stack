var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');
	
// user schema
var UserSchema = new Schema({
	name: String,
	username: { type: String, required: true, index: { unique: true}},
	password: { type: String, required: true, select: false}
});

UserSchema.pre('save', function(next){
	var user = this;
	
	// hash the password only if the password has been changed or user is new
	if(!user.isModified('password')) return next();

	// generate salt
	bcrypt.hash(user.password, null, null, function(err, hash){
		if(err) return next(err);
			// change password to hashed version
			user.password = hash;
			next();
	});
});

UserSchema.methods.comparePassword = function(password){
	var user = this;
	
	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);