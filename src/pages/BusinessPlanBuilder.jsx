import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { useData } from '../context/DataContext';
import TemplateForm from '../components/builder/TemplateForm';
import AIChatbot from '../components/builder/AIChatbot';

export default function BusinessPlanBuilder() {
  const { getEntrepreneurById } = useData();
  const [selectedId, setSelectedId] = useState('');
  const [chatOpen, setChatOpen] = useState(false);

  const selectedEntrepreneur = selectedId ? getEntrepreneurById(selectedId) : null;

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Lightbulb size={20} className="text-primary-500" />
          </div>
          <h1 className="text-2xl font-bold text-warm-900">Business Plan Builder</h1>
        </div>
        <p className="text-warm-500 text-sm mt-1">
          Create revenue models, unit economics, and working capital estimates with AI assistance
        </p>
      </div>

      <div className="max-w-3xl">
        <TemplateForm
          selectedEntrepreneur={selectedEntrepreneur}
          onSelectEntrepreneur={setSelectedId}
        />
      </div>

      <AIChatbot
        entrepreneur={selectedEntrepreneur}
        isOpen={chatOpen}
        onToggle={() => setChatOpen(!chatOpen)}
      />
    </div>
  );
}
