import mongoose from 'mongoose';
const { Schema } = mongoose;
const blockInner = new Schema({
    file: String,
    fileId: String,
    type: String,
});
const block = new Schema({
    file: String,
    fileId: String,
    fileIdList: [blockInner],
    type: String,
});
let Post = mongoose.model('Post', {
    title: String,
    description: String,
    blocks: [block],
});

export default Post;

