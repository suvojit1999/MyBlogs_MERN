import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
    email: {type:String, required:true}, // String is shorthand for {type: String}
    title: {type:String, required:true},
    content: {type:String, required:true},
    imageUrl: {type:String, default:'https://www.netspaceindia.com/wp-content/uploads/2021/09/blog.jpg'},
    date: { type: Date, default: Date.now },
    user: {type:String, required:true},
    status: {type:String, default: 'Not Accepted Yet'}
  });

const postData = mongoose.model('Post', postSchema)
export default postData