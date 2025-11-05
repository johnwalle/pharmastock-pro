'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = '' }: SearchBarProps) {
  const [term, setTerm] = useState(initialValue);

  useEffect(() => {
    setTerm(initialValue); // sync when props change
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(term.trim());
  };

  return (
    <div className="flex flex-col items-center gap-3 mb-6">
      <h1 className="text-2xl font-semibold text-center text-gray-800">Stock Search & Management</h1>
      <p className="text-sm text-gray-500 text-center">
        Find and manage your pharmacy inventory
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xl border rounded-md overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500"
      >
        <input
          type="text"
          placeholder="Search by Brand, Generic, or Batch"
          className="flex-1 px-4 py-2 text-sm outline-none"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 px-4 flex items-center justify-center text-white hover:bg-green-700"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
