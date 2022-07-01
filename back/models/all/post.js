import mongoose from 'mongoose';
let Post = mongoose.model('Post', {
    title: String,
    description: String,
    blocks: [],
});

export default Post;

