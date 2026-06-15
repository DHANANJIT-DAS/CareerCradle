import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({

    type: { type: String, enum: ["Direct", "Group"], default: "Direct" },
    
    name:        { type: String, trim: true },
    avatarUrl:   { type: String },
    description: { type: String },
    createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    participants: [{
        user:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        role:       { type: String, enum: ["Admin", "Member"], default: "Member" },
        joinedAt:   { type: Date, default: Date.now },
        leftAt:     { type: Date, default: null },
        isMuted:    { type: Boolean, default: false },
        unreadCount: { type: Number, default: 0 },
        lastReadMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
        lastReadAt: { type: Date, default: null },
        isArchived:     { type: Boolean, default: false }
    }],

    lastMessage: {type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    lastActivityAt: { type: Date, default: Date.now },
    isArchived:     { type: Boolean, default: false },

}, { timestamps: true });

ConversationSchema.index({ "participants.user": 1, lastActivityAt: -1 });
ConversationSchema.index({ type: 1, "participants.user": 1 });

const Conversation = mongoose.model("Conversation", ConversationSchema);

export default Conversation;