import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db-connect";
import profile, {ProfileDocument} from "@/models/profiles";
import { ObjectId } from "mongodb";
import { NextApiRequest } from "next";



export async function POST(req: NextRequest) {
  // Connect to MongoDB
  await dbConnect();
 

  const data: ProfileDocument  = await req.json();

  try {
    const newProfile = new profile(data);

    const savedProfile: ProfileDocument =  await newProfile.save();

    return NextResponse.json({
      message: "Profile created successfully",
      cache: 'no-store',
      data: savedProfile,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to create a Profile",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
    try {
        await dbConnect();
        
        const profiles = await profile.find();
        console.log(profiles);
        return NextResponse.json({ data: profiles });
    } catch (error) {
        return NextResponse.json({ error });
    }
}







