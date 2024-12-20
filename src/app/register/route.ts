import { DBconection } from "@/lib/DBconnect";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(request: Request) {
  try {
    DBconection();
    let { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Email and password is raquired",
      });
    }
    User.deleteMany({});
    let hash = await bcrypt.hash(password, 10);
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "Email already exists",
      });
    }
    let user = new User({ email, password: hash });
    await user.save();
    console.log(user);
    return NextResponse.json({
      success: true,
      message: "Create user successfully",
      user,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
