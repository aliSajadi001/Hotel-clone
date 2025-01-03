import { Listing } from "@/models/list";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    let allList = await Listing.find({});
    if (allList) {
      return NextResponse.json({ succss: true, allList });
    } else {
      return NextResponse.json({ message: "Something went wrong" });
    }
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" });
  }
}
