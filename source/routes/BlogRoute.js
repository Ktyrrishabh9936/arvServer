const express = require('express');
const router = express.Router();
const multer = require('multer');
const blogController = require('../controllers/BlogController');
const authenticate = require('../middleware/authenticate');
const upload = multer({
        storage:multer.diskStorage({
                filename:function(req,file,cb){
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                        cb(null,uniqueSuffix+file.originalname)
                }
        })
      });
router.post('/createBlog',authenticate,upload.single('coverImage'),blogController.createBlog);

module.exports = router;