import mongoose, { models } from "mongoose";
import bcrypt from "bcrypt";
let UserSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

/*********************Hashing password*******************/

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password") || this.isNew) {

      this.password = await bcrypt.hash(this.password, 10);
      next();
    }
  } catch (error: any) {
    next(error);
  }
});

/*********************Examination Email*******************/

// UserSchema.pre("save", async function (next) {
//   let user = this;
//   if (user.isModified("email") || user.isNew) {
//     let existingUser: any = await mongoose.models.User.findOne({email :user.email

//     });
//     if (existingUser) {
//       return next(new Error("Email already exists"));
//     } 
//   }
// });
export const User = models.user || mongoose.model("user", UserSchema);
