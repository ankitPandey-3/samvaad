import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profileImage:{
        type: String
    },
    status:{
        type: String,
        enum: ['Offline', 'Online', 'Delete'],
        default: 'Offline'
    },
    friendsList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt:{
        type: Date,
        default: Date.now
    },
    refreshToken:{
        type: String
    }
},{timestamps: true});


userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
} );

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
;}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};

userSchema.methods.defaultProfileImage = function() {
    const imageNumber = Math.floor(Math.random() * 5);
    this.profileImage = `/uploads/Default${imageNumber}.png`;
    return this.save();
};

export const User = mongoose.model('User', userSchema);