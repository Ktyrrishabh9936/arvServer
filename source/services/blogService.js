const Blog = require('../models/BlogModel');

const findBlogByUserID = (userID)=>  Blog.find({userID:userID})
const findBlogByBlogID = (userID)=>  Blog.findById(userID)

module.exports = {findBlogByUserID,findBlogByBlogID}