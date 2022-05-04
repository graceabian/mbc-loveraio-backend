//[SECTION] Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


//[SECTION] Environtment Variables Setup
dotenv.config();
const port = process.env.PORT;
const credentials = process.env.MONGO_URL;

//[SECTION] Sever Setup
const app = express();
	app.use(express.json());

//[SECTION] Database Connect
mongoose.connect(credentials);
const db = mongoose.connection;
	db.once('open', () => console.log(`Connected to MongoDb Atlas`))

//[SECTION] Server Routes
//[SECTION] Server Response

app.get('/',(req, res) => {
	res.send(`MBC/loveRadio Project Deployed Succesfully`);
});
app.listen(port, () => {
	console.log(`API is now running on $(port)`);
})