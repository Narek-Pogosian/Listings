import { experienceLevelEnum, remoteTypeEnum } from "@/server/db/schema";
import z from "zod";

export const createListingSchema = z.object({
  title: z.string(),
  description: z.string(),
  city: z.string(),
  remote: z.enum(remoteTypeEnum),
  salaryMin: z.number(),
  salaryMax: z.number(),
  currency: z.string(),
  experienceLevel: z.enum(experienceLevelEnum),
  expiresAt: z.date().optional(),
  saveAsDraft: z.boolean(),
  skills: z.array(z.string()),
});

export type CreateListingSchemaType = z.infer<typeof createListingSchema>;
