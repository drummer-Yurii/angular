import mongoose from 'mongoose';
const { Schema } = mongoose;
const article = new Schema({
  fileId: String,
  fileName: String,
  title: String,
  subtitle: String,
  p: String
});
let App = mongoose.model('App', {
  the: String,
  companyName: String,
  phone: Number,
  email: String,
  country: String,
  city: String,
  adress: String,
  facebookPage: String,
  instagram: String,
  tiktok: String,
  youtube: String,
  ui: {
    firstScreen: {
      waves: {
        w1: String,
        w2: String,
        w3: String,
        w4: String
      }
    },
    common: {
      bg: String,
    },
    post: {
      bg: String,
      br: Number
    }
  },
  pages: {
    about: {
        articles: [article],
        firstText: String,
    }
}
});

export default App;

