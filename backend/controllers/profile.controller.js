import User from "../models/user.model.js";
import {Education, Experience, Skill } from "../models/profile.modal.js";

function sanitiseString (val) {
    return typeof val === "string" ? val.trim() : "";
}


export const getProfile = async (req,res) => {

    const username = req.params.username;
    const viewerId = req.user._id;

    try{

        const user = await User.findOne({username});

        await user.populate([
            {
                path: "educations",
                
            },
            {
                path: "experiences"
            },
            {
                path: "skills",
            },
            {
                path: "projects",
            },
            {
                path: "certificates"
            },
            {
                path: "awards",
            },
            {
                path: "languages",
            },
            {
                path: "posts",
            },
            {
                path: "profileViewers",
            }
        ]);

        if(!user || !user.isActive){
            return res.status(404).json({
                success: false,
                message: "Profile not found."
            });
        }

        const isOwn = viewerId && viewerId === user._id;

        if(!isOwn){
            await User.updateOne(
                {_id: user._id},
                {
                    $inc: {profileViewsCount: 1},
                }
            )
        }

        return res.status(200).json({
            success: true,
            data: {...user.toObject(), isOwn},
            message: "Profile sent successfully."
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

