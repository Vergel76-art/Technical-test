import type { PatientStatus } from '../types';

interface Props {
  status: PatientStatus | 'All';
  onChange: (status: PatientStatus | 'All') => void;
}

const options: Array<PatientStatus | 'All'> = ['All', 'Active', 'Inactive', 'Critical', 'Recovering'];

export function FilterControls({ status, onChange }: Props) {
  return (
    <div className="w-full md:w-1/3">
      <label htmlFor="status" className="block text-sm font-medium text-gray-700">Filter by Status</label>
      <select
        id="status"
        value={status}
        onChange={(e) => onChange(e.target.value as PatientStatus | 'All')}
        className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}