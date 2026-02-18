import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import { useData } from '../context/DataContext';
import { getScoreTierColor, getScoreTier, formatINR } from '../utils/agencyScore';

export default function Profiles() {
  const { filteredEntrepreneurs } = useData();
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Users size={20} className="text-primary-500" />
          </div>
          <h1 className="text-2xl font-bold text-warm-900">Entrepreneur Profiles</h1>
        </div>
        <p className="text-warm-500 text-sm mt-1">Investor-ready profiles with business metrics and agency scores</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEntrepreneurs.map(e => {
          const tierColors = getScoreTierColor(e.agencyScore.percentage);
          const initials = e.name.split(' ').map(n => n[0]).join('');
          return (
            <div
              key={e.id}
              onClick={() => navigate(`/profiles/${e.id}`)}
              className="bg-white rounded-xl border border-warm-200 shadow-sm overflow-hidden hover:shadow-md hover:border-primary-200 transition-all duration-200 cursor-pointer"
            >
              <div className="h-16 bg-gradient-to-r from-primary-500 to-primary-600 relative">
                <div
                  className="absolute -bottom-5 left-4 w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold border-2 border-white shadow"
                  style={{ backgroundColor: e.avatarColor }}
                >
                  {initials}
                </div>
              </div>
              <div className="pt-8 px-4 pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-warm-900">{e.name}</p>
                    <p className="text-xs text-warm-400">{e.businessName}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tierColors.bg} ${tierColors.text}`}>
                    {e.agencyScore.percentage}%
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-xs bg-warm-100 text-warm-600 px-2 py-0.5 rounded-full">{e.sector}</span>
                  <span className="text-xs bg-warm-100 text-warm-500 px-2 py-0.5 rounded-full">{e.location}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-warm-500">
                  <span>Revenue: {formatINR(e.monthlyRevenue)}/mo</span>
                  <span className={`font-medium ${tierColors.text}`}>{getScoreTier(e.agencyScore.percentage)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
