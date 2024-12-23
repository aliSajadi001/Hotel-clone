import { DBconection } from "@/lib/DBconnect";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    DBconection();
    let { email }: { email: string } = await request.json();
    /************************Find old user**********************/
    let user = await User.findOne({ email: email });
    if (user) {
      return NextResponse.json({
        success: true,
        message: "Signin successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "The user note found , pleas register",
      });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
