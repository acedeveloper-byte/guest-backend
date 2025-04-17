const mongoose = require('mongoose');

const BlogsSchema = new mongoose.Schema(
  {
    meta_title: { type: String, required: true },
    focus_keywords: { type: String, required: true },
    meta_description: { type: String, required: true },
    category: { type: String, required: true },
    blog_url: { type: String, required: true },
    blog_image_tag: { type: String, required: true },
    title_tag_h1: { type: String, required: true },
    blog_description: { type: String, required: true },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blogs', BlogsSchema);
