export const DATABASE_NAMES = {
  RESTAURANTS: 'restaurants',
  RESTAURANT_REVIEWS: 'restaurant_reviews',
};

export const RESTAURANT_REVIEW_WITH_WRITER_SELECT = `
  *,
  writer:users!restaurant_reviews_user_id_fkey (
    id,
    nickname,
    email
  )
`;

export const RESTAURANT_NAMES = 'id, name, status';
