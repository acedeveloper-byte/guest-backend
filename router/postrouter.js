const express = require("express")
const uploadpost = require("../middleware/postMulter")
const { createpost, getpost, getthisdone } = require("../controller/post-management")

const postrouter = express.Router()


postrouter.post("/create-new-post", uploadpost.single("file"), createpost)
postrouter.get("/fetch-all-post", getpost)



module.exports = postrouter