//[SECTION] Dependecies and Modules
	const User = require('../model/User');
	const bcrypt = require('bcrypt');
	const auth = require('../auth');

//[SECTION] Functionalites [Create] 
module.exports.registerUser = (data) => {
	let fName = data.firstName;
	let lName = data.lastName;
	let email = data.email;
	let passW = data.password;

	let newUser = new User({
		firstName: fName,
		lastName: lName,
		email: email,
		password: bcrypt.hashSync(passW, 10),
	});
	return newUser.save().then((user, err) =>
		 {
		 	if (user) {
		 		return user;
		 	} else {
		 		return false;
		 	}
		 });
	};
	
module.exports.checkEmailExist = (reqBody) => {
	return User.find({email: reqBody.email}).then(result => {
		if (result.length > 0) {
			return 'Email Already Exist';
		} else {
			return 'Email is Still Available';
		};
	});
};	
	
module.exports.loginUser = (reqBody) => {
	return User.findOne({email: reqBody.email}).then(result => { 
		let uPassW = reqBody.password;
		if (result === null) {
			return 'Email Does Not Exist';
		} else { 
			let passW = result.password;
			const isMatched = bcrypt.compareSync(uPassW, passW);
			if (isMatched) {
				let dataUser = result.toObject();
				return {accessToken: auth.createAccessToken(dataUser)}
				
			} else {
				return 'Password Does Not Match. Check Credentials!';
			}
		};
	});
};

//[SECTION] Functionalites [Retrieve] 
	module.exports.getAllUser = () => {
		return User.find({}).then(user => {
			return user;
		});
	};

//[SECTION] Functionalites [Update] 
module.exports.setAsAdmin = (userId) => {
	let updates = {
		isAdmin: true
	}
	return User.findByIdAndUpdate(userId, updates).then((admin, err) => {
		if (admin) {
			return true;
		} else {
			return 'Updates Failed to implement';
		}
	});
};

module.exports.setAsNonAdmin = (userId) => {
	let updates = {
		isAdmin: false
	}
	return User.findByIdAndUpdate(userId, updates).then((user, err) => {
		if (user) {
			return true; 
		} else {
			return 'Failed to update user';
		};
	});
};



