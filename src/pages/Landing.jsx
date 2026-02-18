import { Link } from 'react-router-dom';
import { ArrowRight, Upload, BarChart3, FileText, Handshake, ChevronDown } from 'lucide-react';

const steps = [
  { icon: Upload, title: 'Data Collection', desc: 'Field researchers upload structured interview data from women entrepreneurs' },
  { icon: BarChart3, title: 'Agency Scoring', desc: '5-parameter scorecard identifies who genuinely leads the business' },
  { icon: FileText, title: 'Business Plans', desc: 'AI-assisted templates generate investor-ready plans and projections' },
  { icon: Handshake, title: 'Investor Matching', desc: 'Shortlisted ventures are matched with aligned funders and lenders' },
];

const problems = [
  { title: 'Economic Inequality', desc: 'Millions of microbusinesses are registered in women\'s names but most are not actually woman-led. Real decision-making power remains absent.' },
  { title: 'Market Inefficiency', desc: 'Lenders and investors lack data to distinguish genuine women-led ventures from name-only ownership, leading to misallocated capital.' },
  { title: 'Gender Gaps', desc: 'Hidden patriarchal control inside "women-owned" businesses means empowerment programs fail to shift real agency to women.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-900 via-primary-900 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/80">Empowering genuine women-led growth</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The Unseen <span className="text-primary-400">CEOs</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 mb-4 max-w-2xl mx-auto leading-relaxed">
            Identifying, supporting, and funding women who <em>actually</em> run their businesses in India's informal economy
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-10 max-w-lg mx-auto border border-white/10">
            <p className="text-sm text-white/60 mb-1">Did you know?</p>
            <p className="text-lg font-semibold">
              Only <span className="text-primary-400">9%</span> of Indian women entrepreneurs have meaningful financial decision-making power
            </p>
            <p className="text-xs text-white/40 mt-1">IFMR/SEWA, 2022</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Explore Dashboard
              <ArrowRight size={18} />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-200"
            >
              Learn More
              <ChevronDown size={18} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-white/40" />
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-warm-900 mb-4">The Problem We Address</h2>
            <p className="text-warm-500 max-w-2xl mx-auto">
              Across India's informal economy, millions of microbusinesses are legally registered in women's names — but most are not actually woman-led.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((p, i) => (
              <div key={i} className="bg-warm-50 border border-warm-200 rounded-xl p-6 hover:shadow-md hover:border-primary-200 transition-all duration-200">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-primary-600 font-bold">{i + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-warm-900 mb-2">{p.title}</h3>
                <p className="text-warm-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-warm-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-warm-900 mb-4">How It Works</h2>
            <p className="text-warm-500 max-w-xl mx-auto">
              A simple, 4-step process to identify genuine women leaders and connect them with the right support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-xl border border-warm-200 p-6 hover:shadow-md transition-all duration-200 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center shrink-0">
                      <step.icon size={20} className="text-white" />
                    </div>
                    <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">Step {i + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-warm-900 mb-2">{step.title}</h3>
                  <p className="text-warm-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                    <ArrowRight size={16} className="text-warm-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-16 bg-primary-500">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-white">
            <div>
              <p className="text-4xl font-bold mb-1">12+</p>
              <p className="text-primary-100 text-sm">Entrepreneurs Profiled</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-1">5</p>
              <p className="text-primary-100 text-sm">Agency Score Parameters</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-1">~1L</p>
              <p className="text-primary-100 text-sm">Optimal Funding Amount</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-warm-900 mb-4">Ready to Explore?</h2>
          <p className="text-warm-500 mb-8">
            Dive into the dashboard to explore entrepreneur profiles, agency scores, and investor-ready business plans.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Enter Dashboard
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-warm-900 text-warm-400">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">UC</span>
            </div>
            <span className="text-sm">The Unseen CEOs</span>
          </div>
          <p className="text-xs text-warm-500">A student-built platform for real women-led growth</p>
        </div>
      </footer>
    </div>
  );
}
