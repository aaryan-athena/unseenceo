import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';
import ProfileCard from '../components/profile/ProfileCard';
import BusinessMetrics from '../components/profile/BusinessMetrics';
import ScoreBreakdown from '../components/agency/ScoreBreakdown';
import FundingPlan from '../components/profile/FundingPlan';
import Card from '../components/common/Card';
import { Target } from 'lucide-react';

export default function EntrepreneurProfile() {
  const { id } = useParams();
  const { getEntrepreneurById } = useData();
  const entrepreneur = getEntrepreneurById(id);

  if (!entrepreneur) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <p className="text-lg font-semibold text-warm-700 mb-2">Entrepreneur not found</p>
        <p className="text-warm-500 text-sm mb-4">The profile you're looking for doesn't exist.</p>
        <Link to="/dashboard" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
          &larr; Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium mb-4">
        <ArrowLeft size={14} />
        Back to Dashboard
      </Link>

      <ProfileCard entrepreneur={entrepreneur} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <BusinessMetrics entrepreneur={entrepreneur} />
        <div>
          <Card title="Agency Score" icon={Target}>
            <ScoreBreakdown entrepreneur={entrepreneur} />
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <FundingPlan entrepreneur={entrepreneur} />
      </div>
    </div>
  );
}
