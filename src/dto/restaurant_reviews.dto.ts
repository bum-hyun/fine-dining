import { z } from 'zod';

// IRestaurantReviewWriter
export const RestaurantReviewWriterSchema = z.object({
  id: z.string(),
  email: z.string(),
  nickname: z.string(),
});

// IRestaurantReview
export const RestaurantReviewSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  restaurant_id: z.number().nullable(),
  title: z.string().nullable(),
  editor_html: z.string().nullable(),
  editor_object: z.object({
    blocks: z.array(
      z.object({
        id: z.string(),
        type: z.string(),
        data: z.record(z.union([z.string(), z.number()])),
      })
    ),
    time: z.number(),
    version: z.string(),
  }),
  updated_at: z.string().nullable(),
  deleted_at: z.string().nullable(),
  files: z.array(z.string()),
  text: z.string(),
  writer: RestaurantReviewWriterSchema,
  restaurant: z.object({
    id: z.number(),
    name: z.string(),
    tags: z.array(z.string()),
  }),
});

// IPostRestaurantReview
export const PostRestaurantReviewSchema = z.object({
  restaurant_id: z.number(),
  title: z.string(),
  editor_html: z.string(),
  editor_object: RestaurantReviewSchema.shape.editor_object,
  user_id: z.string(),
  files: z.array(z.string()),
  text: z.string(),
});

// IPutRestaurantReview
export const PutRestaurantReviewSchema = PostRestaurantReviewSchema.extend({
  id: z.number(),
});

// IUser
export const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  nickname: z.string(),
  avatar_url: z.string(),
  role: z.string().optional(),
  id: z.string(),
  provider: z.string().optional(),
});

// Infer Types
export type TRestaurantReview = z.infer<typeof RestaurantReviewSchema>;
export type TPostRestaurantReview = z.infer<typeof PostRestaurantReviewSchema>;
export type TPutRestaurantReview = z.infer<typeof PutRestaurantReviewSchema>;
