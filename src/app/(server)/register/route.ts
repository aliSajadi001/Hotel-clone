import { DBconection } from "@/lib/DBconnect";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface UserDate {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    DBconection();
    let { email, password }: UserDate = await request.json();
    console.log(email , password)
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Email and password is raquired",
      });
    }
    /****************hashing password********************/
    let hash = await bcrypt.hash(password, 10);
    /****************Find old user***********************/
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "Email already exists",
      });
    } else {
      /****************Creating newUser********************/
      let user = new User({ email, password: hash });
      await user.save();
      /****************Creating token********************/
      let token = await jwt.sign({ id: user?._id }, process.env.SECRET_TOKEN as string, {
        expiresIn: 1 * 24 * 60 * 60 ,
      });
      (await cookies()).set("session-token", token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 ,
      });

      return NextResponse.json({
        success: true,
        message: "Create user successfully",
        user: {
          email: user?.email,
          _id: user?._id,
        },
      });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
