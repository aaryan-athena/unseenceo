import { Users, Target, IndianRupee, Star } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatINR } from '../../utils/agencyScore';

export default function StatsCards() {
  const { summaryStats } = useData();

  const cards = [
    {
      label: 'Total Entrepreneurs',
      value: summaryStats.total,
      icon: Users,
      color: 'bg-primary-50 text-primary-600',
      iconBg: 'bg-primary-100',
    },
    {
      label: 'Avg Agency Score',
      value: `${summaryStats.avgAgencyScore}%`,
      icon: Target,
      color: 'bg-amber-50 text-amber-600',
      iconBg: 'bg-amber-100',
    },
    {
      label: 'Total Funding Needed',
      value: formatINR(summaryStats.totalFunding),
      icon: IndianRupee,
      color: 'bg-green-50 text-green-600',
      iconBg: 'bg-green-100',
    },
    {
      label: 'Shortlisted',
      value: summaryStats.shortlisted,
      icon: Star,
      color: 'bg-purple-50 text-purple-600',
      iconBg: 'bg-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className={`${card.color} rounded-xl p-4 lg:p-5 border border-warm-100`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${card.iconBg}`}>
              <card.icon size={18} />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-warm-900">{card.value}</p>
          <p className="text-sm text-warm-500 mt-1">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
