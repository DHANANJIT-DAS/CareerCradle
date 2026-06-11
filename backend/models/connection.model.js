import mongoose from "mongoose";


const ConnectionRequestSchema = new mongoose.Schema({

    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Withdrawn", "Rejected"],
        default: "Pending",
    },
    note: { type: String, maxlength: 300 }, 
    respondedAt: Date,

},{ timestamps: true });




const ConnectionSchema = new mongoose.Schema({
    // Always store with userA < userB to avoid duplicates
    userA: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userB: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    connectedAt: { type: Date, default: Date.now },
    connectionRequest: { type: mongoose.Schema.Types.ObjectId, ref: "ConnectionRequest" },

},{ timestamps: true });




const FollowSchema = new mongoose.Schema({

    follower: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    followeeId: { type: mongoose.Schema.Types.ObjectId, required: true },
    followeeType: { type: String, enum: ["User", "Company"], required: true },
    followedAt: { type: Date, default: Date.now },

},{ timestamps: true });


const ConnectionRequest = mongoose.model("ConnectionRequest",ConnectionRequestSchema);
const Connection = mongoose.model("Connection",ConnectionSchema);
const Follow = mongoose.model("Follow",FollowSchema);


export {ConnectionRequest,Connection,Follow};
