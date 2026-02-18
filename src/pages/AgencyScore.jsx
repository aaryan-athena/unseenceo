import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Target, ArrowLeftRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SECTORS } from '../data/mockData';
import Card from '../components/common/Card';
import ScoreCard from '../components/agency/ScoreCard';
import AgencyRadarChart from '../components/agency/RadarChart';
import ScoreBreakdown from '../components/agency/ScoreBreakdown';

export default function AgencyScore() {
  const { entrepreneurs, comparisonIds, dispatch } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('highest');
  const [sectorFilter, setSectorFilter] = useState('all');
  const selectedId = searchParams.get('id');

  const filtered = useMemo(() => {
    let result = [...entrepreneurs];
    if (sectorFilter !== 'all') result = result.filter(e => e.sector === sectorFilter);
    result.sort((a, b) => {
      if (sortBy === 'highest') return b.agencyScore.percentage - a.agencyScore.percentage;
      if (sortBy === 'lowest') return a.agencyScore.percentage - b.agencyScore.percentage;
      return a.name.localeCompare(b.name);
    });
    return result;
  }, [entrepreneurs, sortBy, sectorFilter]);

  const selectedEntrepreneur = selectedId ? entrepreneurs.find(e => e.id === selectedId) : null;
  const comparisonEntrepreneurs = comparisonIds.map(id => entrepreneurs.find(e => e.id === id)).filter(Boolean);

  function handleToggleCompare(id) {
    dispatch({ type: 'TOGGLE_COMPARISON', payload: id });
  }

  // Comparison view
  if (comparisonEntrepreneurs.length === 2) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-warm-900">Agency Score Comparison</h1>
            <p className="text-warm-500 text-sm mt-1">
              Comparing {comparisonEntrepreneurs[0].name} vs {comparisonEntrepreneurs[1].name}
            </p>
          </div>
          <button
            onClick={() => { dispatch({ type: 'TOGGLE_COMPARISON', payload: comparisonIds[0] }); dispatch({ type: 'TOGGLE_COMPARISON', payload: comparisonIds[1] }); }}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear Comparison
          </button>
        </div>

        <Card className="mb-6">
          <AgencyRadarChart entrepreneurs={comparisonEntrepreneurs} height={400} />
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comparisonEntrepreneurs.map(e => (
            <Card key={e.id} title={e.name} subtitle={e.sector}>
              <ScoreBreakdown entrepreneur={e} />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Detail view
  if (selectedEntrepreneur) {
    return (
      <div>
        <button
          onClick={() => setSearchParams({})}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium mb-4 inline-block"
        >
          &larr; Back to Overview
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title={selectedEntrepreneur.name} subtitle={`${selectedEntrepreneur.sector} | ${selectedEntrepreneur.location}`}>
            <AgencyRadarChart entrepreneurs={[selectedEntrepreneur]} height={350} />
          </Card>
          <Card title="Score Breakdown" icon={Target}>
            <ScoreBreakdown entrepreneur={selectedEntrepreneur} />
          </Card>
        </div>

        <Card title="Methodology" className="mt-6">
          <p className="text-sm text-warm-600 leading-relaxed">
            The Agency Score is based on 5 parameters, each rated 1-5 through structured interviews with the entrepreneur.
            The score assesses whether the woman registered as the business owner genuinely makes key business decisions.
            A higher score indicates stronger independent leadership and decision-making power.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <p className="text-sm font-semibold text-green-700">High Agency</p>
              <p className="text-xs text-green-600">76-100%</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
              <p className="text-sm font-semibold text-amber-700">Moderate Agency</p>
              <p className="text-xs text-amber-600">48-75%</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
              <p className="text-sm font-semibold text-red-700">Low Agency</p>
              <p className="text-xs text-red-600">Below 48%</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Overview grid
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-warm-900">Agency Score</h1>
          <p className="text-warm-500 text-sm mt-1">Visual breakdown of leadership indicators for each entrepreneur</p>
        </div>
        {comparisonIds.length > 0 && (
          <div className="flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-lg px-3 py-2">
            <ArrowLeftRight size={14} className="text-primary-500" />
            <span className="text-sm text-primary-700">{comparisonIds.length}/2 selected for comparison</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm border border-warm-200 rounded-lg px-3 py-2 bg-white text-warm-700"
        >
          <option value="highest">Highest Score</option>
          <option value="lowest">Lowest Score</option>
          <option value="alpha">Alphabetical</option>
        </select>
        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          className="text-sm border border-warm-200 rounded-lg px-3 py-2 bg-white text-warm-700"
        >
          <option value="all">All Sectors</option>
          {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(e => (
          <div key={e.id} onClick={() => setSearchParams({ id: e.id })}>
            <ScoreCard
              entrepreneur={e}
              isSelected={comparisonIds.includes(e.id)}
              onToggleCompare={handleToggleCompare}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
