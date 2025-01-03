import { List } from "@/app/interface/list";
import { DBconection } from "@/lib/DBconnect";
import { Listing } from "@/models/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    DBconection()
    const body: List = await request.json();
    let list = await new Listing(body).save();
    return NextResponse.json({
      success: true,
      message: " List creation was successful",
      list
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.messge });
  }
}
