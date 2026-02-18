import { useState, useMemo } from 'react';
import { Handshake, Search } from 'lucide-react';
import { useData } from '../context/DataContext';
import FilterPanel from '../components/matching/FilterPanel';
import MatchCard from '../components/matching/MatchCard';

const defaultFilters = {
  sectors: [],
  minScore: 0,
  maxFunding: 'any',
  shortlistedOnly: false,
  searchQuery: '',
};

export default function Matching() {
  const { entrepreneurs } = useData();
  const [filters, setFilters] = useState(defaultFilters);
  const [sortBy, setSortBy] = useState('score');

  function handleFilterChange(updates) {
    setFilters(prev => ({ ...prev, ...updates }));
  }

  const filtered = useMemo(() => {
    let result = entrepreneurs.filter(e => {
      if (filters.sectors.length > 0 && !filters.sectors.includes(e.sector)) return false;
      if (e.agencyScore.percentage < filters.minScore) return false;
      if (filters.maxFunding !== 'any' && e.fundingNeeded > filters.maxFunding) return false;
      if (filters.shortlistedOnly && !e.isShortlisted) return false;
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        if (!e.name.toLowerCase().includes(q) && !e.businessName.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    result.sort((a, b) => {
      if (sortBy === 'score') return b.agencyScore.percentage - a.agencyScore.percentage;
      if (sortBy === 'funding') return a.fundingNeeded - b.fundingNeeded;
      if (sortBy === 'profit') return b.monthlyProfit - a.monthlyProfit;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [entrepreneurs, filters, sortBy]);

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Handshake size={20} className="text-primary-500" />
          </div>
          <h1 className="text-2xl font-bold text-warm-900">Investor Matching</h1>
        </div>
        <p className="text-warm-500 text-sm mt-1">
          Shortlisted ventures aligned with funder criteria, backed by verified data
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 shrink-0">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={() => setFilters(defaultFilters)}
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
              <div className="flex items-center gap-2 bg-white border border-warm-200 rounded-lg px-3 py-2 flex-1 sm:flex-initial sm:w-64">
                <Search size={14} className="text-warm-400" />
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange({ searchQuery: e.target.value })}
                  placeholder="Search by name..."
                  className="text-sm bg-transparent outline-none w-full text-warm-700"
                />
              </div>
              <span className="text-sm text-warm-400 whitespace-nowrap">{filtered.length} match(es)</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-warm-200 rounded-lg px-3 py-2 bg-white text-warm-700"
            >
              <option value="score">Highest Score</option>
              <option value="funding">Lowest Funding</option>
              <option value="profit">Highest Profit</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(e => (
                <MatchCard key={e.id} entrepreneur={e} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-warm-200 p-16 text-center">
              <Handshake size={40} className="mx-auto text-warm-300 mb-3" />
              <p className="text-warm-500 font-medium mb-1">No matches found</p>
              <p className="text-warm-400 text-sm">Try adjusting your filters to see more entrepreneurs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
