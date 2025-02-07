// Users Schema and Model Creation
const mongoose = require("mongoose");

const eventsSchemaModel = new mongoose.Schema({
    userId:String,
    eventName: String,
    description: String,
    date:String,
    attendees:[String]
});

module.exports = mongoose.model("events", eventsSchemaModel);