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

export interface CooperativeResource {
  cooperativeId: string;
  cooperativeName: string;
  members: MemberSummaryResource[];
  administrators: AdministratorSummaryResource[];
}
