// Load environment variables from .env file
require("dotenv").config();
// Import required libraries
const express = require("express");
const cors = require("cors");
// Import custom modules
const ConnectDB = require("./src/config/db");
const usersSchemaModel = require("./src/models/users");
const eventsSchemaModel = require("./src/models/events");


// Define CORS options to allow cross-origin requests
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
// Initialize express app
const app = express();
// Middleware configuration
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Establish database connection
ConnectDB();

// Test route to check if the server is working
app.get("/", (req, res) => {
    res.json("Working");
})

// Route to register a new user
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const datas = {
        name: name,
        email: email,
        password: password
    }

    try {
        const response = await usersSchemaModel.find({ email: email });

        if (response.length > 0) {
            res.status(404).json("User already exists");
        } else {
            const response = await usersSchemaModel.insertMany([datas]);
            if (response.length > 0) {
                res.status(200).json(response);
            } else {
                res.status(400).json("Cannot insert data");
            }
        }

    } catch (errors) {
        res.status(400).json(errors);
    }
});
// Route to log in a user
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await usersSchemaModel.find({ email: email });

        if (response.length > 0) {

            if (response[0]?.password === password) {
                res.status(200).json(response);
            } else {
                res.status(404).json("Wrong Password");
            }
        } else {
            res.status(404).json("User not found");
        }

    } catch (errors) {
        res.status(400).json(errors);
    }
});
//Route to view all event of all users
app.get("/view-events", async (req, res) => {

    try {
        const response = await eventsSchemaModel.find();
        if (response.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(404).json("No Events data");
        }
    } catch (errors) {
        res.status(400).json(errors);
    }
});
//Route to view event of a specific user
app.post("/view-user-events-details", async (req, res) => {
    const { userId } = req.body;

    try {
        const response = await eventsSchemaModel.find({ userId: userId });
        if (response.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(404).json("No Events data");
        }
    } catch (errors) {
        res.status(400).json(errors);
    }
});
//Route to view specific event
app.post("/view-specific-events-details", async (req, res) => {
    const { _id } = req.body;

    try {
        const response = await eventsSchemaModel.find({ _id: _id });
        if (response.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(404).json("No Events data");
        }
    } catch (errors) {
        res.status(400).json(errors);
    }
});
//Route to add event
app.post("/add-event", async (req, res) => {
    const { userId, ownerName, eventName,category, dateAndTime, description, date, imageUrl, attendees } = req.body;
    const datas = {
        userId: userId,
        ownerName:ownerName,
        eventName: eventName,
        category:category,
        dateAndTime:dateAndTime,
        description: description,
        date: date,
        imageUrl:imageUrl,
        attendees: attendees
    }

    try {
        const response = await eventsSchemaModel.insertMany([datas]);
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json("Cannot insert data");
        }
    } catch (errors) {
        res.status(400).json(errors);
    }
});
//Route to edit event
app.put("/edit-event", async (req, res) => {
    const data = req.body;
    const { _id, ...allData } = req.body;

    try {
        if (!data.attendees) {
            const response = await eventsSchemaModel.findOneAndUpdate(
                { _id: _id },
                { $set: allData },
                { new: true });
            if (response) {
                res.status(200).json(response);
            } else {
                res.status(404).json("Cannot edit event data");
            }
        } else {
            const response = await eventsSchemaModel.findOneAndUpdate(
                { _id: _id },
                { $push: allData },
                { new: true });
            if (response) {
                res.status(200).json(response);
            } else {
                res.status(404).json("Cannot edit event data");
            }
        }
    } catch (errors) {
        res.status(400).json(errors);
    }
});
//Route to remove event
app.delete("/remove-event", async (req, res) => {
    const { id } = req.body;

    try {
        const response = await eventsSchemaModel.findOneAndDelete({_id:id});
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json("Cannot remove event");
        }
    } catch (errors) {
        res.status(400).json(errors);
    }
})

// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
    console.log("App is listening on the Port :-", process.env.PORT);
})