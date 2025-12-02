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

// Administrator Resources
export interface AdministratorResource {
  administratorId: string;
  firstName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  email: string;
  userId: string;
}

export interface UpdateAdministratorResource {
  firstName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
}

// Farmer Resources
export interface FarmerResource {
  farmerId: string;
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  email: string;
  userId: string;
  cooperativeId: string;
}

export interface UpdateFarmerResource {
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
}
