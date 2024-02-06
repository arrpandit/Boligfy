const { Schema,model } = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const {createTokenForuser} = require('../utils/authentication')

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        required: true,
        // unique: true
    },
    profileImageURL: {
        type: String,
        default: "/images/default.png"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
},
    { timestamp: true }
);

userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return;
    const salt = randomBytes(16).toString();
    const hashPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex")

    this.salt = salt;
    this.password = hashPassword
    next();
})

//virtual function
userSchema.static("matchPasswordAndGenerateToken", async function(email,password){
    const user = await this.findOne({email});
    if(!user){
        throw new Error("User not found")
    }

    const salt  =user.salt;
    const hashPassword = user.password;

    const userProvidedhashPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex")

    if(hashPassword !== userProvidedhashPassword){
        throw new Error("Incorrect password")
    }

    const token = createTokenForuser(user);
    return token;



})



const User = model('user', userSchema);

module.exports = User