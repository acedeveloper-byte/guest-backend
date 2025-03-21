const { response } = require("express")
const PostModel = require("../models/postModel")

const createpost = async (req, res) => {
    try {
        const { title, status, content, category, user_id } = req.body
        if (title && status && content && category && user_id === "") {
            return res.status(200).json({ baseResponse: { message: "BAD_REQUEST", status: 0 }, response: [] })
        }
        const newPost = new PostModel({
            title, status, content, category, user_id
        })
        if (newPost) {
            return res.status(200).json({ baseResponse: { message: "REQUEST_FULLFILLED", status: 1 }, response: await newPost.save() })
        } else {
            return res.status(200).json({ baseResponse: { message: "SOMETHING_WENT_WRONG", status: 0 }, response: [] })
        }
    } catch (error) {
        return res.status(200).json({ baseResponse: { message: "INTERNAL_SERVER_ERROR", status: 0 }, response: error.message })
    }

}

const getpost = async (req, res) => {
    try {
        const findAllPost = await PostModel.find({})
        console.log("findAllPost:", findAllPost)
        if (findAllPost.length !== 0) {
            return res.status(200).json({ baseResponse: { message: "REQUEST_FULLFILLED", status: 1 }, response: findAllPost })
        } else {
            return res.status(200).json({ baseResponse: { message: "SOMETHING_WENT_WRONG", status: 0 }, response: [] })

        }
    } catch (error) {
        return res.status(200).json({ baseResponse: { message: "SOMETHING_WENT_WRONG", status: 0 }, response: [] })
    }
}


module.exports = { createpost, getpost }