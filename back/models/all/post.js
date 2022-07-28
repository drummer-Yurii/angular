import mongoose from 'mongoose';
const { Schema } = mongoose;
const block = new Schema({
    file: String,
    fileId: String,
    type: String,
});
let Post = mongoose.model('Post', {
    title: String,
    description: String,
    blocks: [block],
});

export default Post;

