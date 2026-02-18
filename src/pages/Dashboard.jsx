import { RotateCcw } from 'lucide-react';
import { useData } from '../context/DataContext';
import StatsCards from '../components/dashboard/StatsCards';
import DataUpload from '../components/dashboard/DataUpload';
import EntrepreneurTable from '../components/dashboard/EntrepreneurTable';
import Button from '../components/common/Button';

export default function Dashboard() {
  const { dispatch } = useData();

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-warm-900">Data Collection Dashboard</h1>
          <p className="text-warm-500 text-sm mt-1">Upload interview data and manage entrepreneur profiles</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={RotateCcw}
          onClick={() => {
            localStorage.removeItem('unseenceo_data');
            dispatch({ type: 'RESET_DATA' });
          }}
        >
          Reset to Demo Data
        </Button>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <EntrepreneurTable />
        </div>
        <div>
          <DataUpload />
        </div>
      </div>
    </div>
  );
}
