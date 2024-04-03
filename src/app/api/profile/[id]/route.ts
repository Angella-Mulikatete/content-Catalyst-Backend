import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db-connect";
import profile, {ProfileDocument} from "@/models/profiles";
import { ObjectId } from "mongodb";
import { NextApiRequest } from "next";


// export const updatePost =(data: ProfileDocument, id:string)=>{
     
//     const newProfile = profile.find((newProfile:any) => newProfile.id === id);
//     if(newProfile){
//         newProfile.name = data.name;
//         newProfile.slug = data.slug;
//         newProfile.profilePhoto = data.profilePhoto;
//         newProfile.bio = data.bio;
//         newProfile.projects = data.projects;
//         newProfile.articles = data.articles;
//         newProfile.video = data.video;
//         newProfile.coverImage = data.coverImage;
//         newProfile.skills = data.skills;
//         newProfile.social = data.social;
//         newProfile.pitch = data.pitch;
//         newProfile.slideImage = data.slideImage;
//         newProfile.save();
//     }
// }

export const PUT = async (req: Request, res:NextResponse) =>{
    try{
    const id = req.url.split("/profile/")[1];
     await dbConnect();
    

    const newProfile= await req.json();
    // console.log(newProfile);
    
    const profiles =  await profile.updateMany({
        name: newProfile.name,
        slug: newProfile.slug,
        profilePhoto : newProfile.profilePhoto,
        bio : newProfile.bio,
        projects : newProfile.projects,
        articles : newProfile.articles,
        video : newProfile.video,
        coverImage : newProfile.coverImage,
        skills : newProfile.skills,
        social : newProfile.social,
        pitch : newProfile.pitch,
        slideImage : newProfile.slideImage,
        where: {id},
    })
    return NextResponse.json({message: "Success", profiles}, {status: 200})
 }catch(error){
    return NextResponse.json({message: "error", error}, {status: 500})
 } 
}




export async function GET(req: NextRequest) {

  try {
    await dbConnect();
    const id = req.url.split("/profile/")[1];
    console.log(id);
    
    //  const profiles =  profile.findById({where: {id}}).toString();
    //  const profiles = await profile.findOne({ _id: Object(id) });
    const profiles = await profile.find({ _id: Object(id) });
     console.log(profiles);
   
     
    if(!profiles)
        return NextResponse.json({message: "Not found"}, {status: 404})
    return NextResponse.json({message: "Success", profiles}, {status: 200})
  } catch (error: any) {
    console.error("Error retrieving profile:", error);
    return NextResponse.json(
      {
        message: "Failed to retrieve profile",
        error: "Server error",
      },
      { status: 500 }
    );
  }
}




//deleting a spcific profile
export const DELETE = async(req:Request, res: NextResponse) =>{
     try{
    const id = req.url.split("/profile/")[1];

    await dbConnect();
    const deleted_profile  = await profile.deleteMany({ _id: Object(id) })
    return NextResponse.json({message: "Success", deleted_profile }, {status: 200})
 }catch(error){
    return NextResponse.json({message: "error", error}, {status: 500})
 } 
}
