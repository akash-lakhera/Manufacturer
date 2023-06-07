const mongoose = require("mongoose");
const users = new mongoose.Schema({
username:String,
password:String,
address:String,
messages:Array,
type:String,
});
module.exports = mongoose.model("users", users);