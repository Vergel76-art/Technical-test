import { useState } from 'react';
import type { Patient, PatientStatus } from '../types';

interface Props {
  onAdd: (p: Patient) => void;
}

export function PatientForm({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [status, setStatus] = useState<PatientStatus>('Active');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (age === '' || age <= 0) e.age = 'Valid age is required';
    return e;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eMap = validate();
    setErrors(eMap);
    if (Object.keys(eMap).length) return;
    const newPatient: Patient = {
      id: `${Date.now()}`,
      name: name.trim(),
      age: Number(age),
      gender,
      status,
      lastVisit: new Date().toISOString().slice(0, 10),
    };
    onAdd(newPatient);
    setName('');
    setAge('');
    setGender('Male');
    setStatus('Active');
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Patient name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={age}
            onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
          />
          {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={gender}
            onChange={(e) => setGender(e.target.value as 'Male' | 'Female' | 'Other')}
          >
            {['Male', 'Female', 'Other'].map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={status}
            onChange={(e) => setStatus(e.target.value as PatientStatus)}
          >
            {['Active', 'Inactive', 'Critical', 'Recovering'].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <button type="submit" className="rounded bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700">Add Patient</button>
      </div>
    </form>
  );
}