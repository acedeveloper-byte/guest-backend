const express = require('express');
const {
  getallblogs,
  createblogs,
  updateBlogs,
} = require('../controller/blogs/blogsmain');
const router = express.Router();

router.get('/get-all-blogs', getallblogs);
router.post('/create-new-blog', createblogs);
router.put('/update-blog/:blog_id', updateBlogs);

module.exports = router;
