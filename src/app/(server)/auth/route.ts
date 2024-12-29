import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Token, VerifyUser } from "../../interface/user";
import { DBconection } from "@/lib/DBconnect";
import { User } from "@/models/user";

export async function GET(request: NextRequest) {
  /*****************Get Token***************************************/
  const token = request.cookies.get("session-token")?.value;
  /*****************Verify Token***********************************/
  try {
    const verify = (await jwt.verify(
      token as string,
      process.env.SECRET_TOKEN as string
    )) as Token;
    if (verify) {
      DBconection();
      let user = await User.findById(verify.id).select(
        "-password -createdAt -updatedAt"
      );

      /*****************Find user***********************************/
      if (user) {
        return NextResponse.json({ success: true, user });
      }
      return NextResponse.json({ success: false });
    }
    return NextResponse.json({ success: true, verify });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
