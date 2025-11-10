export type PatientStatus = 'Active' | 'Inactive' | 'Critical' | 'Recovering';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  status: PatientStatus;
  lastVisit: string; // ISO date string
}

export interface PatientsResponse {
  patients: {
    total: number;
    items: Patient[];
  };
}

// ----- Additional types for UI-only stubs (Secure Login, Start Video) -----

export type UserRole = 'Patient' | 'Clinician' | 'Admin';

export interface AuthToken {
  accessToken: string;
  expiresAtEpochMs: number;
  subject: string; // user id
  roles: UserRole[];
}

export interface ConsultationSession {
  id: string;
  appointmentId: string;
  roomId: string;
  sfuRegion: string;
  status: 'SCHEDULED' | 'LIVE' | 'ENDED';
  turnServers: string[];
}

export interface LoginResponse {
  login: AuthToken;
}

export interface CreateConsultationSessionResponse {
  createConsultationSession: ConsultationSession;
}