import mongoose from 'mongoose';
let App = mongoose.model('App',{
    companyName:String,
    phone:Number,
    email:String,
    facebookPage:String,
});

export default App;

