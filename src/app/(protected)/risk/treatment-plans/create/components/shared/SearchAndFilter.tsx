// /app/risk/treatment-plans/create/components/shared/SearchAndFilter.tsx
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Risk } from '../../types';

interface SearchAndFilterProps {
  risks: Risk[];
  onFilteredRisksChange: (filteredRisks: Risk[]) => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  risks,
  onFilteredRisksChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, filterStatus);
  };

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    applyFilters(searchTerm, status);
  };

  const applyFilters = (term: string, status: string) => {
    const filtered = risks.filter(risk => {
      const matchesSearch = risk.title.toLowerCase().includes(term.toLowerCase()) ||
                           risk.category.toLowerCase().includes(term.toLowerCase());
      const matchesFilter = status === 'all' || risk.status === status;
      return matchesSearch && matchesFilter;
    });
    onFilteredRisksChange(filtered);
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search risks..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <select
        value={filterStatus}
        onChange={(e) => handleFilterChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Status</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
};