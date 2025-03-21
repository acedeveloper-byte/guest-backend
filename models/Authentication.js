const mongoose = require("mongoose")

const authschema = new mongoose.Schema({

    user_name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String, required: true },
    password: {
        type: String, required: true
    }
}, { timestamps: true })


const authModel = mongoose.model("auth", authschema);

module.exports = authModel;