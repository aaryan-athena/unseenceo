import { Menu, Search } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function Navbar() {
  const { dispatch, filters } = useData();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-16 bg-white border-b border-warm-200 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
          className="lg:hidden p-2 rounded-lg hover:bg-warm-100 transition-colors"
        >
          <Menu size={20} className="text-warm-700" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">UC</span>
          </div>
          <h1 className="text-lg font-bold text-warm-900 hidden sm:block">
            The Unseen <span className="text-primary-500">CEOs</span>
          </h1>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 bg-warm-50 border border-warm-200 rounded-lg px-3 py-2 w-72">
        <Search size={16} className="text-warm-400" />
        <input
          type="text"
          placeholder="Search entrepreneurs..."
          value={filters.searchQuery}
          onChange={(e) => dispatch({ type: 'UPDATE_FILTERS', payload: { searchQuery: e.target.value } })}
          className="bg-transparent text-sm text-warm-900 placeholder-warm-400 outline-none w-full"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
          <span className="text-primary-600 text-xs font-semibold">R</span>
        </div>
      </div>
    </nav>
  );
}
