// Auth
export const LOGIN_API = "auth/login";

// Accounts
export const PROFILE_API = "users/profile";
export const ACCOUNT_LIST = (page, perPage) =>
  `/admin/users?page=${page}&per_page=${perPage}`;
export const TOGGLE_STATUS = (id) => `/admin/users/status/${id}`;
// Image
export const UPLOAD_IMAGE = "image-caption/upload";
export const SAVE_CAPTION_IMAGE = (idImage) =>
  `image-caption/caption/${idImage}`;
