const blogsModel = require('../../schema/blogsModel');

const getallblogs = async (req, res) => {
  try {
    const getAllBlogs = await blogsModel.find({});
    if (!getAllBlogs > 0) {
      res.status(200).json({
        baseResponse: {
          message: 'No Blogs Found yet',
          status: 'EMPTY',
        },
        response: [],
      });
    } else {
      res.status(200).json({
        baseResponse: {
          message: 'abba dabbs',
          status: 'OK',
        },
        response: getAllBlogs,
      });
    }
  } catch (error) {
    res.status(200).json({
      baseResponse: {
        message: 'abba dabbs working wrong',
        status: 'ERROR',
      },
      response: req.body,
    });
  }
};

const createblogs = (req, res) => {
  try {
    const {
      meta_title,
      focus_keywords,
      meta_description,
      category,
      blog_url,
      blog_image_tag,
      title_tag_h1,
      blog_description,
    } = req.body;

    const newBlog = new blogsModel({
      meta_title,
      focus_keywords,
      meta_description,
      category,
      blog_url,
      blog_image_tag,
      title_tag_h1,
      blog_description,
    });

    res.status(200).json({
      baseResponse: {
        message: 'abba dabbs',
        status: 'OK',
      },
      response: newBlog.save(),
    });
  } catch (error) {
    res.status(200).json({
      baseResponse: {
        message: 'abba dabbs working wrong',
        status: 'ERROR',
      },
      response: [],
    });
  }
};

const updateBlogs = async (req, res) => {
  try {
    const { blog_id } = req.params; // Blog ID from request params
    const {
      meta_title,
      focus_keywords,
      meta_description,
      category,
      blog_url,
      blog_image_tag,
      title_tag_h1,
      blog_description,
    } = req.body;

    // Find and update the blog post
    const updatedBlogs = await blogsModel.findByIdAndUpdate(
      { _id: blog_id },
      {
        meta_title,
        focus_keywords,
        meta_description,
        category,
        blog_url,
        blog_image_tag,
        title_tag_h1,
        blog_description,
      },
      { new: true } // Return the updated document
    );

    res.status(200).json({
      baseResponse: {
        message: 'Blog updated successfully',
        status: 'OK',
      },
      response: updatedBlogs,
    });
  } catch (error) {
    res.status(500).json({
      baseResponse: {
        message: 'Something went wrong',
        status: 'ERROR',
      },
      response: [],
    });
  }
};

module.exports = {
  getallblogs,
  createblogs,
  updateBlogs,
};
