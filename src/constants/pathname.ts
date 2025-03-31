const ROUTE_KEYS = {
  HOME: '',
  ADMIN: 'admin',
  RESTAURANT: 'restaurant',
};

export const ROUTE_PATHS = {
  HOME: `/${ROUTE_KEYS.HOME}`,
  ADMIN: {
    ROOT: `/${ROUTE_KEYS.ADMIN}`,
    LIST: `/${ROUTE_KEYS.ADMIN}/list`,
    EDIT: `/${ROUTE_KEYS.ADMIN}/edit`,
  },
  RESTAURANT: {
    ROOT: `/${ROUTE_KEYS.RESTAURANT}`,
    DETAIL: `/${ROUTE_KEYS.RESTAURANT}/[restaurantId]`,
    REVIEW: `/${ROUTE_KEYS.RESTAURANT}/[restaurantId]/review`,
  },
};
