import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../constants.js";
import jwt from "jsonwebtoken";


const UserSchema = new mongoose.Schema({


    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    refreshToken: String,
    refreshTokenExpires: Date,
    profileUrl : {type: String, unique: true},


    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: {type: String, unique: true},

    role : {type: String,enum:["professional", "student"]},
    
    headline: { type: String, maxlength: 220 },
    profilePictureUrl: String,
    bannerImageUrl: String,
    about: { type: String, maxlength: 2600 },


    location: {
        country: String,
        state: String,
        city: String,
    },

    phone: String,
    website: String,
    birthday: Date,

    isActive: { type: Boolean, default: true },
    isDeactivated: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    lastSeenAt: Date,

    privacySettings: {
        profileVisibility: { type: String, enum: ["Public", "Connections", "Private"], default: "Public" },
    },



    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    connectionsCount: { type: Number, default: 0 },
    profileViewsCount: { type: Number, default: 0 },
    searchAppearancesCount: { type: Number, default: 0 },

    educations : [{ type: mongoose.Schema.Types.ObjectId, ref: "Education" }],
    experiences : [{ type: mongoose.Schema.Types.ObjectId, ref: "Experience" }],
    projects : [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    skills :[{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    certificates : [{ type: mongoose.Schema.Types.ObjectId, ref: "Certificate" }],
    awards : [{ type: mongoose.Schema.Types.ObjectId, ref: "Award" }],
    languages : [{ type: mongoose.Schema.Types.ObjectId, ref: "Language" }],

    posts : [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],


    
 
},
{ 
    timestamps: true,
    toJSON:{virtuals: true},
    toObject:{virtuals: true},
});



UserSchema.virtual("fullName").get(function (){
    return `${this.firstName} ${this.lastName}`;
});



UserSchema.pre("save",async function(){
    if(this.isModified("passwordHash")){
        this.passwordHash= await bcrypt.hash(this.passwordHash,SALT_ROUNDS);
    }
});

UserSchema.pre("save",async function(){
    if(!this.isNew || this.username) return;

    let username = this.firstName.toLowerCase();
    if(this.lastName){
        username +=`-${this.lastName.toLowerCase()}`;
    }
    username = username.replace(/\s+/g,"-");
    let finalUsername = username;
    while(await this.constructor.exists({username:finalUsername})){
        finalUsername = `${username}-${10000+Math.floor(Math.random()*900000)}`;
    }

    this.username = finalUsername;
    this.profileUrl = `CareerCradle.com/u/${finalUsername}`;
});


UserSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.passwordHash);
}


UserSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            firstName:this.firstName,
            lastName:this.lastName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
}

UserSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
}


const User = mongoose.model("User",UserSchema);

export default User;