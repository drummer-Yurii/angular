import mongoose from 'mongoose';
let App = mongoose.model('App',{
    the:{
        type: String,
    },
    companyName:String,
    phone:Number,
    email:String,
    facebookPage:String,
});

export default App;

