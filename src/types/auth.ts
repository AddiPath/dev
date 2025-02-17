export interface EmergencyContact {
  name: string;
  mobile: string;
  landline: string;
  relationship: string;
}

export interface EmergencyID {
  fullName: string;
  mobile: string;
  doctorName: string;
  dateOfBirth: string;
  emergencyContact: EmergencyContact;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  emergencyId?: EmergencyID;
  isForumBanned?: boolean;
}

export interface AuthCredentials {
  email: string;
  password: string;
}