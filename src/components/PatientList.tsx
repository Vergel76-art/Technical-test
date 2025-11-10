import { useQuery, useApolloClient } from '@apollo/client/react';
import { useCallback, useMemo, useState } from 'react';
import { GET_PATIENTS } from '../graphql/queries';
import type { PatientsResponse, Patient, PatientStatus } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { SearchBar } from './SearchBar';
import { FilterControls } from './FilterControls';
import { PaginationControls } from './PaginationControls';
import { PatientRow } from './PatientRow';
import { PatientForm } from './PatientForm';

const PAGE_SIZE = 5;

export function PatientList() {
  const { data, loading, error } = useQuery<PatientsResponse>(GET_PATIENTS);
  const client = useApolloClient();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<PatientStatus | 'All'>('All');

  const debouncedSearch = useDebounce(search, 250);

  const patients = data?.patients.items ?? [];

  const filtered = useMemo<Patient[]>(() => {
    const s = debouncedSearch.toLowerCase();
    return patients.filter((p: Patient) => {
      const matchesSearch = !s || p.name.toLowerCase().includes(s);
      const matchesStatus = status === 'All' || p.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [patients, debouncedSearch, status]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageClamped = Math.min(page, totalPages);
  const start = (pageClamped - 1) * PAGE_SIZE;
  const pageItems: Patient[] = filtered.slice(start, start + PAGE_SIZE);

  const handleAdd = useCallback((p: Patient) => {
    const current = client.readQuery<PatientsResponse>({ query: GET_PATIENTS });
    const items = current?.patients.items ?? [];
    client.writeQuery<PatientsResponse>({
      query: GET_PATIENTS,
      data: {
        patients: {
          total: (current?.patients.total ?? items.length) + 1,
          items: [p, ...items],
        },
      },
    });
    // Reset to first page to show the new patient
    setPage(1);
  }, [client]);

  if (loading) {
    return <div className="p-6 text-gray-700">Loading patients...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-600">Error loading patients: {error.message}</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Patient Management Dashboard</h1>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} />
        <FilterControls status={status} onChange={(s) => { setStatus(s); setPage(1); }} />
        <div className="flex items-end justify-end">
          <PaginationControls page={pageClamped} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />
        </div>
      </section>

      <section className="rounded-lg border bg-white shadow-sm">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Age</th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Gender</th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Last Visit</th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((p: Patient) => <PatientRow key={p.id} patient={p} />)}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-gray-600">No patients found</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-medium">Add New Patient</h2>
        <PatientForm onAdd={handleAdd} />
      </section>
    </div>
  );
}