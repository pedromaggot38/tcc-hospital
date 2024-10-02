import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: z.enum(["root", "admin", "journalist"]),
  isBlocked: z.boolean(),
  name: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  image: z.string().nullable(),
  createdAt: z.date(),
});

export type User = z.infer<typeof userSchema>;

export const articleSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  slug: z.string(),
  published: z.boolean().default(false),
  content: z.string().optional(),
  createdAt: z.date(),
  user: userSchema,
});

export type Articles = z.infer<typeof articleSchema>;
