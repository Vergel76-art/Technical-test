import { gql } from '@apollo/client';

export const GET_PATIENTS = gql`
  query GetPatients {
    patients {
      total
      items {
        id
        name
        age
        gender
        status
        lastVisit
      }
    }
  }
`;

// UI-only stub: Secure Login mutation
export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
      expiresAtEpochMs
      subject
      roles
      __typename
    }
  }
`;

// UI-only stub: Create Video Consultation Session mutation
export const CREATE_CONSULTATION_SESSION = gql`
  mutation CreateConsultationSession($appointmentId: ID!) {
    createConsultationSession(appointmentId: $appointmentId) {
      id
      appointmentId
      roomId
      sfuRegion
      status
      turnServers
      __typename
    }
  }
`;