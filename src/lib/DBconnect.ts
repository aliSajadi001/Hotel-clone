import mongoose from "mongoose";

let DATABASEURL = process.env.NEXT_PUBLIC_MONGODB_URL || "";
if (!DATABASEURL) {
  throw new Error("Database url note found");
}

export const DBconection = async () => {
  try {
    mongoose.connect(DATABASEURL).then(() => {
      console.log("mongodb connected-------------");
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error in mongodb connection");
  }
};
