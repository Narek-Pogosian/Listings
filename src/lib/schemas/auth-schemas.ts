import { roleEnum } from "@/server/db/schema";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().trim(),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password needs to be atleast 6 characters long" }),
});

const baseSchema = loginSchema.extend({
  confirmPassword: z
    .string()
    .trim()
    .min(6, { message: "Password needs to be at least 6 characters long" }),
  role: z.enum(roleEnum),
});

const userSchema = baseSchema.extend({
  role: z.literal("USER"),
  name: z.string().trim().min(1, { message: "Name is required" }),
});

const employerSchema = baseSchema.extend({
  role: z.literal("EMPLOYER"),
  company: z.string().trim().min(1, { message: "Company is required" }),
});

export const registerSchema = z
  .discriminatedUnion("role", [userSchema, employerSchema])
  .refine((vals) => vals.password === vals.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
