import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema({
    fullName : {
        type : String,
        required : true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlenght:6 ,
    },
    bio:{
        type:String,
        default: "",
    },
    profilePic:{
        type:String,
        default: "",
    },
    nativeLanguage:{
        type:String,
        deafult:"",
    },
    learningLanguage:{
        type:String,
        default:"",
    },
    location:{
        type:String,
    },
    isOnboarded:{
        type:Boolean,
        default:false,
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ]
},{timestamps:true});


// pre hook - password hashing before saving it to schema

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();

    try{
    const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    }catch(error){
        next(error);
    }
});
userSchema.methods.matchPassword = async function (enteredPassword){
    const isPasswordCorrect = await bcrypt.compare(enteredPassword,this.password);
    return isPasswordCorrect;
}
const User = mongoose.model("User",userSchema);
export default User;