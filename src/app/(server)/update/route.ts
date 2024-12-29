import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(request: NextRequest) {
  let { email, password, username } = await request.json();
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    } else {
      let hash = await bcrypt.hash(password, 10);
      user.password = hash || "";
      user.username = username || "";
      await user.save();
      if (user) {
        return NextResponse.json({
          success: true,
          message: "Update successfully",
          newUser: {
            email: user.email,
            username: user.username,
            _id: user._id,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: error });
  }
}
