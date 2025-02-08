// Users Schema and Model Creation
const mongoose = require("mongoose");

const eventsSchemaModel = new mongoose.Schema({
    userId:String,
    ownerName:String,
    eventName: String,
    category:String,
    description: String,
    dateAndTime:{
        date:String,
        time:String
    },
    imageUrl:String,
    attendees:[{ name: String }]
});

module.exports = mongoose.model("events", eventsSchemaModel);