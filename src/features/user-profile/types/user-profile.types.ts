export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  profileImage?: string;
}

export interface UserProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
}
