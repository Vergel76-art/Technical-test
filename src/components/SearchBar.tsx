import type { ChangeEvent } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);
  return (
    <div className="w-full md:w-1/2">
      <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search Patients</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search by name"
        className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
    </div>
  );
}