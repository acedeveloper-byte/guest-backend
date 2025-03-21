const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String },
    status: { type: Boolean, required: true },
    content: { type: String, required: true }
}, { timestamps: true })


const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;