import z from "zod";

const registerSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is Required"),
});
const workspaceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  color: z.string().min(1, "Color is required"),
});

export { registerSchema, loginSchema ,workspaceSchema};
