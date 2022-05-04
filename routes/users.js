//[Section] Dependecies and Modules
const exp = require('express');
const controller = require('../controllers/users');
const auth = require('../auth');

//[Section] Functionalities
const route = exp.Router();

route.post('/register', (req, res) => {
	let userData = req.body;
	controller.registerUser(userData).then(outcome => {
		res.send(outcome);
	});
});

route.post('/check-email', (req, res) => {
		controller.checkEmailExist(req.body).then(outcome => {
			res.send(outcome);
		});
	});

route.post('/login', (req, res) => {
	 	let data = req.body;
	 	controller.loginUser(data).then(outcome => {
	 		res.send(outcome);
	 	});
	 });		

route.put('/:userId/set-as-admin', auth.verify ,(req, res) => {
		let token = req.headers.authorization;
		let payload = auth.decode(token);
		let isAdmin = payload.isAdmin;
		let id = req.params.userId;
		(isAdmin) ?controller.setAsAdmin(id).then(outcome => res.send(outcome))
		: res.send('Unauthorized User');
	});

route.put('/:userId/set-as-user', auth.verify ,(req, res) => { 
		let token = req.headers.authorization;
		let isAdmin = auth.decode(token).isAdmin;
		let id = req.params.userId;
		(isAdmin) ? controller.setAsNonAdmin(id).then(result =>res.send(result))
		: res.send('Unauthorized User');
		
	});

//[Section] Expose Route Sytem
	module.exports = route;
