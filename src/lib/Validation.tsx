"use client";

import { z } from "zod";

export const registerValidation = z.object({
  password: z.string().min(6).max(50),
  email: z.string().email({ message: "Email is not valid" }),
});

export const profileValidation = z.object({
  password: z.string().min(6).max(50),
  email: z.string().email({ message: "Email is not valid" }),
});

export const searchValidation = z.object({
text : z.string()
});