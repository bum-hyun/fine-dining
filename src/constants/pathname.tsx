const ROUTE_KEYS = {
  HOME: '',
  ADMIN: 'admin',
};

export const ROUTE_PATHS = {
  HOME: ROUTE_KEYS.HOME,
  ADMIN: {
    ROOT: `/${ROUTE_KEYS.ADMIN}`,
    LIST: `/${ROUTE_KEYS.ADMIN}/list`,
    EDIT: `/${ROUTE_KEYS.ADMIN}/edit`,
  },
};
