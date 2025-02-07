// Users Schema and Model Creation
const mongoose = require("mongoose");

const usersSchemaModel = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model("users", usersSchemaModel);