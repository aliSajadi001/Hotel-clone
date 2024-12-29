import { DBconection } from "@/lib/DBconnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { User } from "@/models/user";

interface UserDate {
  email: string;
  password: string;
  username: string;
}

export async function POST(request: NextRequest) {
  try {
    DBconection();
    let { email, password, username }: UserDate = await request.json();
    console.log(email, password, username )
    if (!email || !password || !username) {
      return NextResponse.json({
        success: false,
        message: "All fields are raquired",
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
      let user =  new User({password :hash , email , username})
        await user.save()
      console.log(user)
      /****************Creating token********************/
      let token = await jwt.sign(
        { id: user?._id },
        process.env.SECRET_TOKEN as string,
        {
          expiresIn: 1 * 24 * 60 * 60,
        }
      );
      (await cookies()).set("session-token", token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60,
      });

      return NextResponse.json({
        success: true,
        message: "Create user successfully",
        user: {
          email: user?.email,
          username : user?.username,
          _id: user?._id,
        },
      });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
