import { z } from 'zod';

// TRestaurantStatus
export const RestaurantStatusSchema = z.union([z.literal('active'), z.literal('pending'), z.literal('rejected')]);

// IRestaurant
export const RestaurantSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  address: z.string().nullable(),
  email: z.string().nullable(),
  description: z.string().nullable(),
  is_only_course: z.boolean(),
  tel: z.string().nullable(),
  reservation_url: z.string().nullable(),
  tags: z.array(z.string()).nullable(),
  launch_price: z.number().nullable(),
  dinner_price: z.number().nullable(),
  thumbnail: z.string().nullable(),
  currency: z.string().nullable(),
  status: RestaurantStatusSchema,
});

// IPostRestaurant
export const PostRestaurantSchema = RestaurantSchema.omit({
  id: true,
})
  .partial({
    address: true,
    email: true,
    description: true,
    is_only_course: true,
    tel: true,
    reservation_url: true,
    tags: true,
    launch_price: true,
    dinner_price: true,
    currency: true,
    thumbnail: true,
    status: true,
  })
  .extend({
    name: z.string().nullable(),
  });

// IPutRestaurant
export const PutRestaurantSchema = PostRestaurantSchema.extend({
  id: z.number(),
});

// IGetRestaurantsParams
export const GetRestaurantsParamsSchema = z.object({
  world: z.string().optional(),
  star: z.number().optional(),
  page: z.number(),
  limit: z.number().optional(),
  status: z.union([RestaurantStatusSchema, z.literal('all')]).optional(),
});

// IGetRestaurantReviewsParams
export const GetRestaurantReviewsParamsSchema = z.object({
  restaurantId: z.number(),
  page: z.number(),
  limit: z.number().optional(),
  status: z.union([RestaurantStatusSchema, z.literal('all')]).optional(),
});

// IRestaurantName
export const RestaurantNameSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
});

// Infer Types
export type TRestaurant = z.infer<typeof RestaurantSchema>;
export type TPostRestaurant = z.infer<typeof PostRestaurantSchema>;
export type TPutRestaurant = z.infer<typeof PutRestaurantSchema>;
export type TRestaurantName = z.infer<typeof RestaurantNameSchema>;

export type TGetRestaurantsParams = z.infer<typeof GetRestaurantsParamsSchema>;
export type TGetRestaurantReviewsParams = z.infer<typeof GetRestaurantReviewsParamsSchema>;
