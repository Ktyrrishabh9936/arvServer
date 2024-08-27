const Blog = require('../models/BlogModel');
const { findBlogByUserID, findBlogByBlogID, findlatestBlog } = require('../services/blogService');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createBlog = async (req, res) => {
      
        const user = req.user;
        const file = req.file.path;
      
        try {
          const result = await cloudinary.uploader.upload(file, {
            folder: 'Arevei/Blog/CoverImage',
          });
      
          const blog = new Blog({
            user: user._id,
            headline: req.body.headline,
            subHeadline: req.body.subHeadline,
            content: req.body.content,
            coverImage: result.secure_url,
          });
      
          await blog.save();
          return res.status(200).json(blog);
        } catch (error) {
          console.error('Upload Error:', error);
          return res.status(500).send(error);
        }
      };
      
      const getMyBlogs = async (req, res) => {
        const user = req.user;
        try {
          const myblogs = await findBlogByUserID(user._id)
          console.log(myblogs)
          return res.status(200).send(myblogs);
        } catch (error) {
          console.error(error);
          return res.status(500).send(error);
        }
      };
      const findBlog = async (req, res) => {
        try {
          const blog = await findBlogByBlogID(req.params.id);
          console.log(blog);
          return res.status(200).send(blog);
        } catch (error) {
          console.error(error);
          return res.status(500).send(error);
        }
      };
      const latestBlogs = async(req,res)=>{
        try {
            // Find the latest product by sorting createdAt in descending order
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        // Fetch products with pagination and sorting by createdAt in descending order
        const latestBlog = await Blog.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        // Get the total count of products for the frontend to know when to stop requesting more data
        const total = await Blog.countDocuments();
        res.json({ latestBlog, total });
        } catch (error) {
            console.error('Error fetching the latest product:', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
module.exports = {
  createBlog,getMyBlogs,findBlog,latestBlogs
};
