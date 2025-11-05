'use client';
import { ChangeEvent } from 'react';

interface FilterBarProps {
  onActionChange: (action: string) => void;
}

export const FilterBar = ({ onActionChange }: FilterBarProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <select onChange={(e) => onActionChange(e.target.value)} className="border px-3 py-2 rounded">
        <option value="All">All Actions</option>
        <option value="Add">Add</option>
        <option value="Edit">Edit</option>
        <option value="Delete">Delete</option>
        <option value="View">View</option>
      </select>
    </div>
  );
};
