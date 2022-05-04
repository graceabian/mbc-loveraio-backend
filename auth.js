
//[SECTION] Environment Variable  Setup
	dotenv.config();
	let secret = process.env.SECRET;

//[SECTION] Fuctionalities
module.exports.createAccessToken = (authUser) => {
	let userData = {
		id: authUser._id,		
		email: authUser.email,
		isAdmin: authUser.isAdmin
	} 
	return jwt.sign(userData, secret, {});
	};

module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;
		if (typeof token !== 'undefined') {
		token = token.slice(7, token.length)
			jwt.verify(token, secret, (err, payload) => {
			if (err) {
				return res.send({auth: 'Auth Failed'});
			} else {
				next()
			};
		});
	} else {
		return res.send({auth: "Authorization Failed, Check Token"});
	};
};

module.exports.decode = (accessToken) => {
	if (typeof accessToken !== 'undefined') {
		accessToken = accessToken.slice(7, accessToken.length);
		return jwt.verify(accessToken, secret, (err, verified) => {
			if (err) {
				return null;
			} else {
				return jwt.decode(accessToken, {complete: true}).payload
			}
		})
	} else {
		return null;
	}
		
};