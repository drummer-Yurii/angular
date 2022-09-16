interface Post {
    title: String,
    description: String,
    img: String,
    _id: String,
    blocks: [any]
};
interface User {
    username:String,
    phone:Number,
    email:String,
    age:Number,
    facebookPage:String,
    firstName: String,
    lastName: String,
    password:  String,
    authToken: String,
    role: String,
};
interface App {
    the:String,  
    companyName:String,
    phone:Number,
    email:String,
    facebookPage:String,
    pages: {
        about: {
            articles: [any]
        }
    }
};

export type { Post, User, App }