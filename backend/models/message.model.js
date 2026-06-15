import mongoose from "mongoose";


const AttachmentSchema = new mongoose.Schema({
    url:       { type: String, required: true },
    publicId:  { type: String },
    type:      { type: String, enum: ["Image", "Video", "Document", "Audio"] },
    mimeType:  { type: String },
    name:      { type: String },
    size:      { type: Number },        
    duration:  { type: Number },        
    thumbnail: { type: String },        
}, { _id: false });



const MessageSchema = new mongoose.Schema({

    conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    sender:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    type: {
        type: String,
        enum: ["Text", "Image", "Video", "Document", "Audio", "GIF", "SharedPost","sharedJob", "Combined"],
        default: "Text",
    },

    content: { type: String, maxlength: 5000 },
    attachments: [AttachmentSchema],

    sharedPostId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    sharedJobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },

    
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },

    reactions: [{
        user:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        emoji: { type: String, required: true },
    }],

    
    deliveredTo: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        deliveredAt: Date,
    }],
    readBy: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        readAt: Date,
    }],

    isEdited:     { type: Boolean, default: false },
    editedAt:     { type: Date },
    isDeleted:    { type: Boolean, default: false },
    deletedAt:    { type: Date },

}, { timestamps: true });

MessageSchema.index({ conversation: 1, createdAt: -1 });
MessageSchema.index({ sender: 1 });

const Message = mongoose.model("Message", MessageSchema);


export default Message;











