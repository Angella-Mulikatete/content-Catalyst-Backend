// import mongoose, { Schema, model } from 'mongoose';
import mongoose, {Document, Schema, Model, Date} from "mongoose"


export interface ProfileDocument extends Document {
  name: string;
  profilePhoto?: string; // Optional since profilePhoto might not always be provided
  bio: any[]; // Using any[] for flexibility with block structure
  projects: {
    name: string;
    description: any[]; // Using any[] for flexibility with block structure
    coverImage?: string; // Optional since coverImage might not always be provided
  }[];
  articles: {
    name: string;
    articleLink: string;
    articleCoverImage?: string; // Optional since articleCoverImage might not always be provided
  }[];
  video: any[]; // Using any[] for flexibility with block structure
  coverImage?: string; // Optional since coverImage might not always be provided
  skills: {
    skill: string;
    proficiencyLevel: string;
  }[];
  social: {
    name: string;
    link: string;
  }[];
  pitch: {
    video: any[]; // Using any[] for flexibility with block structure
    coverImage?: string; // Optional since coverImage might not always be provided
  }[];
  slideImage: string[];
}


const profileSchema = new Schema<ProfileDocument>({
  name: { type: String, required: true },
  profilePhoto: { type: String }, // Assuming image URLs are stored as strings
  bio: [{ type: mongoose.Schema.Types.Mixed }], // Array of block objects (can be customized based on block structure)
  projects: [
    {
      name: { type: String, required: true },
      description: [{ type: mongoose.Schema.Types.Mixed }], // Array of block objects
      coverImage: { type: String }, // Assuming image URLs are stored as strings
    },
  ],
  articles: [
    {
      name: { type: String, required: true },
      articleLink: { type: String, required: true },
      articleCoverImage: { type: String }, // Assuming image URLs are stored as strings
    },
  ],
  video: [{ type: mongoose.Schema.Types.Mixed }], // Array of block objects (can be customized based on block structure)
  coverImage: { type: String }, // Assuming video cover image URL is stored as string
  skills: [
    {
      skill: { type: String, required: true },
      proficiencyLevel: { type: String, required: true },
    },
  ],
  social: [
    {
      name: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
  pitch: [
    {
      video: [{ type: mongoose.Schema.Types.Mixed }], // Could be an array of block objects or YouTube URLs
      coverImage: { type: String }, // Assuming pitch cover image URL is stored as string
    },
  ],
  slideImage: [{ type: String }], // Assuming slide image URLs are stored as strings
});


//creating a anew profile model

let profile:Model<ProfileDocument>;

try{
  profile = mongoose.model("profile") as Model<ProfileDocument>;
}catch{
  profile = mongoose.model<ProfileDocument>("profile", profileSchema);
}

export default profile;