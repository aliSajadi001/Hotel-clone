import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(request: NextRequest) {
  let { email, password } = await request.json();
  try {
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Email and password is rsquired",
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    } else {
      let hash = await bcrypt.hash(password, 10);
      let newUser = await User.findOneAndUpdate(
        { email },
        { password: hash },
        { new: true }
      );
      if (newUser) {
        return NextResponse.json({
          success: true,
          message: "Update successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: error });
  }
}
