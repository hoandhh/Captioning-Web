// Auth
export const LOGIN_API = "auth/login";

// Accounts
export const PROFILE_API = "users/profile";
export const ACCOUNT_LIST = (page, perPage, filters) => {
  let queryParams = new URLSearchParams({
    page: page,
    per_page: perPage,
  });

  if (filters.role) queryParams.append("role", filters.role);
  if (filters.is_active !== null)
    queryParams.append("is_active", filters.is_active);

  return `/admin/users?${queryParams.toString()}`;
};
export const CHANGE_PASSWORD = "auth/change-password";
export const TOGGLE_STATUS = (id) => `admin/users/change-status/${id}`;
export const TOGGLE_ROLE = (id) => `admin/users/change-role/${id}`;
export const DELETE_ACCOUNT = (id) => `admin/users/${id}`;
// Image
export const UPLOAD_IMAGE = "image-caption/upload";
export const SAVE_CAPTION_IMAGE = (idImage) =>
  `image-caption/caption/${idImage}`;
