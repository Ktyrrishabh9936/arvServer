const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    headline: {type: String, required: true},
    subHeadline: {type: String,required: true},
    content: {type: String, required: true},
    coverImage: {type: String},
},{
        timestamps:true
    });


module.exports = mongoose.model('blog', BlogSchema);