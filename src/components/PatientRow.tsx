import type { Patient, CreateConsultationSessionResponse } from '../types';
import { useMutation } from '@apollo/client/react';
import { CREATE_CONSULTATION_SESSION } from '../graphql/queries';

export function PatientRow({ patient }: { patient: Patient }) {
  const [startSession, { data, loading, error }] = useMutation<
    CreateConsultationSessionResponse,
    { appointmentId: string }
  >(CREATE_CONSULTATION_SESSION);

  const onStartVideo = () => {
    // Demo: derive a stable appointment id from patient id
    startSession({ variables: { appointmentId: `appt-${patient.id}` } });
  };

  return (
    <tr className="border-b">
      <td className="px-3 py-2">{patient.name}</td>
      <td className="px-3 py-2">{patient.age}</td>
      <td className="px-3 py-2">{patient.gender}</td>
      <td className="px-3 py-2">
        <span className="rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
          {patient.status}
        </span>
      </td>
      <td className="px-3 py-2">{new Date(patient.lastVisit).toLocaleDateString()}</td>
      <td className="px-3 py-2">
        <button
          onClick={onStartVideo}
          disabled={loading}
          className="px-2 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-700 disabled:bg-green-300"
        >
          {loading ? 'Starting…' : 'Start Video'}
        </button>
        {error ? (
          <div className="mt-1 text-xs text-red-600">{error.message}</div>
        ) : data ? (
          <div className="mt-1 text-xs text-green-700">
            Session: {data.createConsultationSession.id}
          </div>
        ) : null}
      </td>
    </tr>
  );
}