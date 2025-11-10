import type { MockedResponse } from '@apollo/client/testing';
import { GET_PATIENTS, LOGIN, CREATE_CONSULTATION_SESSION } from './graphql/queries';
import type { PatientsResponse, Patient, LoginResponse, CreateConsultationSessionResponse } from './types';

const seedPatients: Patient[] = [
  { id: '1', name: 'Alice Johnson', age: 34, gender: 'Female', status: 'Active', lastVisit: '2025-09-18' },
  { id: '2', name: 'Bob Smith', age: 58, gender: 'Male', status: 'Recovering', lastVisit: '2025-08-03' },
  { id: '3', name: 'Catherine Lee', age: 46, gender: 'Female', status: 'Inactive', lastVisit: '2025-07-11' },
  { id: '4', name: 'David Kim', age: 29, gender: 'Male', status: 'Active', lastVisit: '2025-10-01' },
  { id: '5', name: 'Elena Garcia', age: 39, gender: 'Female', status: 'Critical', lastVisit: '2025-11-01' },
  { id: '6', name: 'Frank Wu', age: 62, gender: 'Male', status: 'Recovering', lastVisit: '2025-06-22' },
  { id: '7', name: 'Grace Park', age: 51, gender: 'Female', status: 'Active', lastVisit: '2025-10-20' },
  { id: '8', name: 'Henry Adams', age: 73, gender: 'Male', status: 'Inactive', lastVisit: '2025-05-02' },
  { id: '9', name: 'Isabella Rossi', age: 27, gender: 'Female', status: 'Active', lastVisit: '2025-09-30' },
  { id: '10', name: 'Jack Thompson', age: 44, gender: 'Male', status: 'Recovering', lastVisit: '2025-08-29' },
  { id: '11', name: 'Karen Nguyen', age: 36, gender: 'Female', status: 'Critical', lastVisit: '2025-10-05' },
  { id: '12', name: 'Liam O’Brien', age: 33, gender: 'Male', status: 'Active', lastVisit: '2025-09-12' },
  { id: '13', name: 'Mia Patel', age: 48, gender: 'Female', status: 'Inactive', lastVisit: '2025-07-17' },
  { id: '14', name: 'Noah Wilson', age: 41, gender: 'Male', status: 'Recovering', lastVisit: '2025-06-30' },
  { id: '15', name: 'Olivia Chen', age: 26, gender: 'Female', status: 'Active', lastVisit: '2025-11-03' },
];

const typedItems: Patient[] = seedPatients.map((p) => ({ ...p }));

const baseResult: PatientsResponse = {
  patients: {
    total: typedItems.length,
    // Apollo adds __typename to queries; include it in results for robust matching
    items: typedItems.map((p) => ({ ...p })),
  },
};

// Additional mock responses for UI-only stubs
const loginSuccess: LoginResponse = {
  login: {
    accessToken: 'demo-token-abc123',
    expiresAtEpochMs: Date.now() + 60 * 60 * 1000,
    subject: 'user-demo',
    roles: ['Clinician'],
  },
};

const makeSession = (appointmentId: string, idSuffix: string): CreateConsultationSessionResponse => ({
  createConsultationSession: {
    id: `session-${idSuffix}`,
    appointmentId,
    roomId: `room-${idSuffix}`,
    sfuRegion: 'us-east-1',
    status: 'SCHEDULED',
    turnServers: ['turn:turn.example.com:3478'],
  },
});

// Build per-patient session mocks (duplicate each for StrictMode)
const sessionMocks: MockedResponse[] = typedItems.flatMap((p) => {
  const apptId = `appt-${p.id}`;
  const result1 = { data: makeSession(apptId, p.id) };
  const result2 = { data: makeSession(apptId, p.id) };
  return [
    { request: { query: CREATE_CONSULTATION_SESSION, variables: { appointmentId: apptId } }, result: result1 },
    { request: { query: CREATE_CONSULTATION_SESSION, variables: { appointmentId: apptId } }, result: result2 },
  ];
});

// Provide multiple identical mocks to satisfy React StrictMode double-render and multiple clicks
export const mocks: MockedResponse[] = [
  // Patients list (twice)
  { request: { query: GET_PATIENTS }, result: { data: baseResult } },
  { request: { query: GET_PATIENTS }, result: { data: baseResult } },
  // Secure Login (twice)
  {
    request: {
      query: LOGIN,
      variables: { username: 'demo', password: 'demo123' },
    },
    result: { data: loginSuccess },
  },
  {
    request: {
      query: LOGIN,
      variables: { username: 'demo', password: 'demo123' },
    },
    result: { data: loginSuccess },
  },
  // Start Video per patient
  ...sessionMocks,
];