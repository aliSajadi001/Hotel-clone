import { DBconection } from "@/lib/DBconnect";
import { User } from "@/models/user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(request: NextRequest) {
  try {
    DBconection();
    let { email }: { email: string } = await request.json();
    /************************Find old user**********************/
    let user = await User.findOne({ email: email });
    if (user) {
      let token = await jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
        expiresIn: 1 * 24 * 60 * 60,
      });
      (await cookies()).set("session-token", token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60,
      });
      return NextResponse.json({
        success: true,
        message: "Signin successfully",
        user: {
          email: user.email,
          _id: user._id,
        },
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
