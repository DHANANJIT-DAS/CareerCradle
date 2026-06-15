import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema({


    receiver:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    type: {
        type:     String,
        enum: ["ConnectionRequest","ConnectionAccepted","ConnectionRejected","ProfileView","PostLike","PostComment","PostRepost", "Mention"],
        required: true,
    },


    message: { type: String, required: true, maxlength: 500 },
 
   
    isRead: { type: Boolean, default: false, index: true },
    readAt: { type: Date,    default: null },

    actorSnapshot: {
        name: { type: String, required: true },
        avatarUrl: { type: String, default: null },
        headline: { type: String, default: null },
        profileUrl: { type: String, default: null },
    },


},{timestamps: true});


notificationSchema.index({ receiverId: 1, createdAt: -1 });
notificationSchema.index({ receiverId: 1, isRead: 1, createdAt: -1 });


notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 90 });


notificationSchema.methods.markAsRead = function () {
    this.isRead = true;
    this.readAt = new Date();
    return this.save();
};


const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;