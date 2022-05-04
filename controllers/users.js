//[SECTION] dependencies and Modules
const User = require("../model/User");
const bcrypt = require("bcrypt");
const auth require("../auth");


//[SECTION] Functionalities 

module.exports.registerUser = (data) => {
	let email = data.email;
	let passW = data.password;

	let newUser = new User({
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

