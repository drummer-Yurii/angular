import mongoose from 'mongoose';
let App = mongoose.model('App', {
  the: String,
  companyName: String,
  phone: Number,
  email: String,
  country: String,
  city: String,
  adress: String,
  facebookPage: String,
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
});

export default App;

