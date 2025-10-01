import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid Email address"),
  password: z.string().min(1, "Password is required"),
});
