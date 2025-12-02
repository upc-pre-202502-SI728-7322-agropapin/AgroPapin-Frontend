export interface CooperativeResource {
  cooperativeId: string;
  cooperativeName: string;
  members: MemberSummaryResource[];
  administrators: AdministratorSummaryResource[];
}

export interface MemberSummaryResource {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  userId: string;
}

export interface AdministratorSummaryResource {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  userId: string;
}

export interface MemberFieldResource {
  fieldId: string | null;
  fieldName: string;
  location: string | null;
  totalArea: number | null;
  status: string | null;
  farmerId: string;
  farmerFullName: string;
}

export interface CreateCooperativeResource {
  cooperativeName: string;
}

export interface UpdateCooperativeResource {
  name: string;
}
