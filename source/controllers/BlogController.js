const Blog = require('../models/BlogModel');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createBlog = async (req, res) => {
        console.log('Request body:', req.body);
      
        const user = req.user;
        const file = req.file.path;
      
        try {
          const result = await cloudinary.uploader.upload(file, {
            folder: 'Arevei/Blog/CoverImage',
          });
      
          const blog = new Blog({
            userID: '66c5b185bc91c5464d9c4406',
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
      

module.exports = {
  createBlog,
};
