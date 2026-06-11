import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({

    author: { type: mongoose.Schema.Types.ObjectId, required: true,refPath: "authorType", },
    authorType: { type: String, enum: ["User", "Company"], required: true },

    contentType: {
        type: String,
        enum: ["Text", "Image", "Video", "Document", "Article" ],
        default: "Text",
    },

    contentText: { type: String, maxlength: 3000 },


    media: [
        {
            url: String,
            mediaType: { type: String, enum: ["image", "video", "document"] },
            altText: String,
            thumbnailUrl: String,
            duration: Number, // seconds, for video
            mimeType: String,
        },
    ],


    article: {
        title: String,
        subtitle: String,
        coverImageUrl: String,
        body: String, // rich HTML / markdown
        slug: String,
    },


    
    visibility: {
        type: String,
        enum: ["Public", "Connections", "GroupMembers", "OnlyMe"],
        default: "Public",
    },


    taggedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    taggedCompanies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
    hashtags: [String],
 

    
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    repostsCount: { type: Number, default: 0 },
    viewsCount:{type: Number, default: 0 },

    likedBy:  [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    repostBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    savedBy:  [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    

    isEdited: { type: Boolean, default: false },
    editHistory: [
        {
            text: String,
            editedAt: Date,
        },
    ],
 


},{ timestamps: true });


const Post = mongoose.model("Post",PostSchema);

export default Post;