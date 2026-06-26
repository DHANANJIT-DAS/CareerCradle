import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    institute:{ type: mongoose.Schema.Types.ObjectId, ref: "Organization"},
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
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill"}],
    media: [{
        url: String,
        publicId: String,
        mediaType: { type: String, enum: ["image", "video", "document"] },
        fileName: String,
        thumbnailUrl: String,
        duration: Number,
        mimeType: String,
        size: String,
        title: String,
        description: String,
    }],


},{ timestamps: true });



const ExperienceSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization"},
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
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill"}],
    media: [{
        url: String,
        publicId: String,
        mediaType: { type: String, enum: ["image", "video", "document"] },
        fileName: String,
        thumbnailUrl: String,
        duration: Number,
        mimeType: String,
        size: String,
        title: String,
        description: String,
    }],

},{ timestamps: true });



const SkillSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    skillName: String,
    endorsementsCount: { type: Number, default: 0 },
    reference: { type: mongoose.Schema.Types.ObjectId,  refPath: "targetModel" },
    targetModel: { type: String, enum: ["Education", "Experience", "Certificate", "Project"] }

},{ timestamps: true });


const CertificationSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    certificateId: String,
    issuingOrganization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization"},
    issuingOrganisationName: String,
    issuingOrganizationLogo: String,
    issueDate: Date,
    expirationDate: Date,
    doesExpire: { type: Boolean, default: true },
    certificateUrl: String,
    certificateMediaInfo: {
        url: String,
        publicId: String,
        mediaType: { type: String, enum: ["image"] },
        fileName: String,
        thumbnailUrl: String,
        duration: Number,
        mimeType: String,
        size: String,
    },
    description : { type: String, maxlength: 1000 },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill"}],

},{ timestamps: true });



const ProjectSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    organization:{ type: mongoose.Schema.Types.ObjectId, ref: "Organization"},
    organizationName: String,
    organizationLogo: String,
    name: { type: String, required: true },
    description: { type: String, maxlength: 2000 },
    startDate: Date,
    endDate: Date,
    isOngoing: { type: Boolean, default: false },
    projectUrl: String,
    contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill"}],
    media: [{
        url: String,
        publicId: String,
        mediaType: { type: String, enum: ["image", "video", "document"] },
        fileName: String,
        thumbnailUrl: String,
        duration: Number,
        mimeType: String,
        size: String,
        title: String,
        description: String,
    }],
    

},{ timestamps: true });




const AwardSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    issuer: { type: mongoose.Schema.Types.ObjectId, ref: "Organization"},
    issuerName: String,
    issuerLogo: String,
    issueDate: Date,
    description: { type: String, maxlength: 2000 },
    media: [{
        url: String,
        publicId: String,
        mediaType: { type: String, enum: ["image", "video", "document"] },
        fileName: String,
        thumbnailUrl: String,
        duration: Number,
        mimeType: String,
        size: String,
        title: String,
        description: String,
    }],

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
const Skill = mongoose.model("Skill",SkillSchema);
const Certificate = mongoose.model("Certificate",CertificationSchema);
const Project = mongoose.model("Project",ProjectSchema);
const Award = mongoose.model("Award",AwardSchema);
const Language = mongoose.model("Language",LanguageSchema);

export { Education, Experience, Skill, Certificate, Project, Award, Language };