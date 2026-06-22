import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    institute:{type: mongoose.Schema.Types.ObjectId},
    instituteName: String, 
    instituteLogoUrl : String,
    instituteLocation: String,
    degree: String,        
    fieldOfStudy: String,  
    startDate: Date,
    endDate: Date,
    isCurrentlyStudy: { type: Boolean, default: false },
    grade: String,
    description: { type: String, maxlength: 1000 },
    skills: [{type: mongoose.Schema.Types.ObjectId, ref: "Skill"}],
    mediaUrls: [String],


},{ timestamps: true });



const ExperienceSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    organization: { type: mongoose.Schema.Types.ObjectId},
    title: { type: String, required: true },
    employmentType: {
        type: String,
        enum: ["Full-time", "Part-time", "Contract", "Internship", "Freelance", "Apprenticeship", "Seasonal"],
        default: "Full-time",
    },
    organizationName: String,
    organizationLocation: String,
    organizationLogoUrl: String,
    locationType: { type: String, enum: ["On-site", "Hybrid", "Remote"],default: "On-site" },
    isCurrentRole: { type: Boolean, default: false },
    startDate: Date, 
    endDate: Date,
    duration: Number,
    description: { type: String, maxlength: 2000 },
    skills: [{type: mongoose.Schema.Types.ObjectId, ref: "Skill"}],
    mediaUrls: [String],

},{ timestamps: true });



const UserSkillSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    skill: String,
    endorsementsCount: { type: Number, default: 0 },
    reference: {type: mongoose.Schema.Types.ObjectId}

},{ timestamps: true });


const CertificationSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    certificateId: String,
    issuingOrganization: { type: mongoose.Schema.Types.ObjectId},
    issuingOrganisationName: String,
    issuingOrganizationLogo: String,
    issueDate: Date,
    expirationDate: Date,
    doesExpire: { type: Boolean, default: true },
    certificateUrl: String,
    description : { type: String, maxlength: 1000 },
    skills: [{type: mongoose.Schema.Types.ObjectId, ref: "Skill"}],

},{ timestamps: true });



const ProjectSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    organization:{type: mongoose.Schema.Types.ObjectId},
    organizationName: String,
    organizationLogo: String,
    name: { type: String, required: true },
    description: { type: String, maxlength: 2000 },
    startDate: Date,
    endDate: Date,
    isOngoing: { type: Boolean, default: false },
    projectUrl: String,
    contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    skills: [{type: mongoose.Schema.Types.ObjectId, ref: "Skill"}],
    mediaUrls: [String],
    

},{ timestamps: true });




const AwardSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    issuer: {type: mongoose.Schema.Types.ObjectId},
    issuerName: String,
    issuerLogo: String,
    issueDate: Date,
    description: { type: String, maxlength: 2000 },
    attachedUrl : [String],

},{ timestamps: true });


const LanguageSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    language: { type: String, required: true },
    proficiency: {
        type: String,
        enum: ["Elementary", "Limited Working", "Professional Working", "Full Professional", "Native or Bilingual"],
    },
    
},{ timestamps: true });


const Education = mongoose.model("Education",EducationSchema);
const Experience = mongoose.model("Experience",ExperienceSchema);
const Skill = mongoose.model("Skill",UserSkillSchema);
const Certificate = mongoose.model("Certificate",CertificationSchema);
const Project = mongoose.model("Project",ProjectSchema);
const Award = mongoose.model("Award",AwardSchema);
const Language = mongoose.model("Language",LanguageSchema);

export {Education,Experience,Skill,Certificate,Project,Award,Language};