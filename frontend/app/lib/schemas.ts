import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid Email address"),
  password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z
  .object({
    email: z.string().email("Invalid Email address"),
    password: z.string().min(8, "Password must be 8 character"),
    name: z.string().min(3, "Name must be at least 3 character"),
    confirmPassword: z.string().min(8, "Password must be 8 character"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password does not match",
  });
