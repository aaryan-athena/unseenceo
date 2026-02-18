import { Info, Target, Users, BookOpen, ExternalLink } from 'lucide-react';
import { AGENCY_PARAMETERS } from '../data/mockData';
import Card from '../components/common/Card';

const teamMembers = [
  { name: 'Research Lead', role: 'Field Coordination', desc: 'Coordinates student researchers and NGO partnerships' },
  { name: 'Data Analyst', role: 'Scoring & Analytics', desc: 'Manages agency scoring methodology and data analysis' },
  { name: 'Tech Lead', role: 'Platform Development', desc: 'Builds and maintains The Unseen CEOs platform' },
  { name: 'Outreach Lead', role: 'Investor Relations', desc: 'Connects shortlisted ventures with impact investors' },
];

const replicationSteps = [
  { step: 1, title: 'Partner with Local NGO', desc: 'Identify an NGO working with women micro-entrepreneurs in your region' },
  { step: 2, title: 'Train Student Researchers', desc: 'Recruit and train 4-6 students on the structured interview methodology' },
  { step: 3, title: 'Conduct Interviews', desc: 'Interview 40-50 women entrepreneurs using the standardized questionnaire' },
  { step: 4, title: 'Upload to Platform', desc: 'Enter interview data into the platform via CSV or manual entry' },
  { step: 5, title: 'Analyze Agency Scores', desc: 'Review the 5-parameter scores to identify genuine women leaders' },
  { step: 6, title: 'Build Business Plans', desc: 'Use AI-assisted templates to create investor-ready profiles for top entrepreneurs' },
  { step: 7, title: 'Present to Investors', desc: 'Match 2-3 verified ventures with impact investors, MSME lenders, or angel funders' },
];

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Info size={20} className="text-primary-500" />
          </div>
          <h1 className="text-2xl font-bold text-warm-900">About The Unseen CEOs</h1>
        </div>
      </div>

      {/* Mission */}
      <Card className="mb-6">
        <div className="bg-gradient-to-r from-primary-50 to-amber-50 -m-6 p-8 rounded-xl">
          <blockquote className="text-lg text-warm-800 leading-relaxed italic">
            "A student-built, digital platform that helps identify, support, and fund women who
            <span className="font-semibold text-primary-700 not-italic"> actually </span>
            run their businesses — not just appear on documents."
          </blockquote>
          <p className="text-sm text-warm-500 mt-4">
            Across India's informal economy, millions of microbusinesses are legally registered in women's names — but
            most are not actually woman-led. The Unseen CEOs bridges this credibility gap for lenders, investors,
            and policymakers who want to fund genuine women-led ventures.
          </p>
        </div>
      </Card>

      {/* Methodology */}
      <Card title="Agency Score Methodology" icon={Target} className="mb-6">
        <p className="text-sm text-warm-600 mb-4">
          The Agency Score is a 5-parameter scorecard that identifies who genuinely leads the business.
          Each parameter is scored 1-5 through structured field interviews.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-warm-200">
                <th className="text-left py-2 px-3 text-warm-600 font-medium">Parameter</th>
                <th className="text-left py-2 px-3 text-warm-600 font-medium">What It Measures</th>
                <th className="text-center py-2 px-3 text-warm-600 font-medium">Scale</th>
              </tr>
            </thead>
            <tbody>
              {AGENCY_PARAMETERS.map((param, i) => (
                <tr key={param.key} className={i % 2 === 0 ? 'bg-warm-50' : ''}>
                  <td className="py-2.5 px-3 font-medium text-warm-800">{param.label}</td>
                  <td className="py-2.5 px-3 text-warm-600">{param.description}</td>
                  <td className="py-2.5 px-3 text-center text-warm-500">1–5</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <p className="text-sm font-semibold text-green-700">High Agency</p>
            <p className="text-xs text-green-600 mt-0.5">76–100% (19–25 points)</p>
            <p className="text-xs text-green-500 mt-1">Genuinely leads the business</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
            <p className="text-sm font-semibold text-amber-700">Moderate Agency</p>
            <p className="text-xs text-amber-600 mt-0.5">48–75% (12–18 points)</p>
            <p className="text-xs text-amber-500 mt-1">Shared decision-making</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
            <p className="text-sm font-semibold text-red-700">Low Agency</p>
            <p className="text-xs text-red-600 mt-0.5">Below 48% (&lt;12 points)</p>
            <p className="text-xs text-red-500 mt-1">Name-only ownership</p>
          </div>
        </div>
      </Card>

      {/* Team */}
      <Card title="Team" icon={Users} className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {teamMembers.map((m, i) => (
            <div key={i} className="flex items-start gap-3 bg-warm-50 rounded-lg p-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm shrink-0">
                {m.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-semibold text-warm-900">{m.name}</p>
                <p className="text-xs text-primary-600 font-medium">{m.role}</p>
                <p className="text-xs text-warm-500 mt-1">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Replication Toolkit */}
      <Card title="Replication Toolkit" icon={BookOpen} className="mb-6">
        <p className="text-sm text-warm-600 mb-4">
          A step-by-step guide for other student teams to replicate this model with other NGOs in their region.
        </p>
        <div className="relative pl-8">
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-primary-200" />
          <div className="space-y-5">
            {replicationSteps.map(s => (
              <div key={s.step} className="relative">
                <div className="absolute -left-8 top-0.5 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {s.step}
                </div>
                <div>
                  <p className="text-sm font-semibold text-warm-800">{s.title}</p>
                  <p className="text-xs text-warm-500 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* References */}
      <Card className="mb-6">
        <h3 className="font-semibold text-warm-900 mb-3">Data Sources & References</h3>
        <ul className="space-y-2 text-sm text-warm-600">
          <li className="flex items-start gap-2">
            <ExternalLink size={14} className="text-warm-400 mt-0.5 shrink-0" />
            IFMR/SEWA (2022) — Study on financial decision-making power of Indian women micro-entrepreneurs
          </li>
          <li className="flex items-start gap-2">
            <ExternalLink size={14} className="text-warm-400 mt-0.5 shrink-0" />
            MUDRA Loan Scheme — Government of India microfinance program for micro-enterprises
          </li>
          <li className="flex items-start gap-2">
            <ExternalLink size={14} className="text-warm-400 mt-0.5 shrink-0" />
            Udyam Registration Portal — MSME registration for informal businesses
          </li>
        </ul>
      </Card>
    </div>
  );
}
