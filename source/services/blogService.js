const Blog = require('../models/BlogModel');

const findBlogByUserID = (userID)=>  Blog.find({user:userID})
const findBlogByBlogID = (userID)=>  Blog.findById(userID).populate('user')
const findlatestBlog = ()=>  Blog.find().sort({ createdAt: -1 })

module.exports = {findBlogByUserID,findBlogByBlogID,findlatestBlog}