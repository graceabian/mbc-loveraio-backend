//[SECTION] Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


//[SECTION] Environtment Variables Setup
dotenv.config();
const port = process.env.PORT;

//[SECTION] Sever Setup
const app = express();
	app.use(express.json());

//[SECTION] Database Connect
//[SECTION] Server Routes
//[SECTION] Server Response

app.get('/',(req, res) => {
	res.send(`MBC/loveRadio Project Deployed Succesfully`);
});
app.listen(port, () => {
	console.log(`API is now running on $(port)`);
})