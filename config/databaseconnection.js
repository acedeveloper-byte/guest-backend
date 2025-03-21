const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://acedatabasedev:wondeveloperinace@cluster0.o0gpy.mongodb.net/ace?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB successfully!");
});

module.exports = db;
