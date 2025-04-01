// Auth
export const LOGIN_API = "auth/login";

// Accounts
export const PROFILE_API = "users/profile";
export const ACCOUNT_LIST = (page, perPage, filterKey, filterValue) => {
  if (filterKey !== undefined && filterValue !== undefined) {
    return `/admin/users?page=${page}&per_page=${perPage}&${filterKey}=${filterValue}`;
  } else {
    return `/admin/users?page=${page}&per_page=${perPage}`;
  }
};
export const TOGGLE_STATUS = (id) => `/admin/users/change-status/${id}`;
export const TOGGLE_ROLE = (id) => `/admin/users/change-role/${id}`;
export const DELETE_ACCOUNT = (id) => `/admin/users/${id}`;
// Image
export const UPLOAD_IMAGE = "image-caption/upload";
export const SAVE_CAPTION_IMAGE = (idImage) =>
  `image-caption/caption/${idImage}`;
