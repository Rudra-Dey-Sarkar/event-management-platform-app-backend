// Creating Database Connection
const mongoose = require("mongoose");

const ConnectDB = async ()=>{
try{
    await mongoose.connect();
    console.log("Database connected successfully");
}catch(error){
    console.log("Database could not connect due to :-", error);
}
}
module.exports = ConnectDB()//Exporting ConnectDB Function To Server