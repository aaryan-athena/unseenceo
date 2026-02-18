import { createContext, useContext, useReducer, useEffect } from 'react';
import { entrepreneurs as mockEntrepreneurs } from '../data/mockData';

const DataContext = createContext(null);

const initialFilters = {
  sector: 'all',
  minAgencyScore: 0,
  maxFundingNeeded: Infinity,
  shortlistedOnly: false,
  searchQuery: '',
};

function getInitialState() {
  try {
    const stored = localStorage.getItem('unseenceo_data');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return {
          entrepreneurs: parsed,
          filters: initialFilters,
          selectedEntrepreneurId: null,
          comparisonIds: [],
          sidebarOpen: false,
        };
      }
    }
  } catch (e) {
    console.warn('localStorage load failed:', e);
  }
  return {
    entrepreneurs: mockEntrepreneurs,
    filters: initialFilters,
    selectedEntrepreneurId: null,
    comparisonIds: [],
    sidebarOpen: false,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ENTREPRENEURS':
      return { ...state, entrepreneurs: action.payload };
    case 'ADD_UPLOADED_DATA':
      return { ...state, entrepreneurs: [...state.entrepreneurs, ...action.payload] };
    case 'UPDATE_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'RESET_FILTERS':
      return { ...state, filters: initialFilters };
    case 'SELECT_ENTREPRENEUR':
      return { ...state, selectedEntrepreneurId: action.payload };
    case 'TOGGLE_COMPARISON': {
      const id = action.payload;
      const ids = state.comparisonIds.includes(id)
        ? state.comparisonIds.filter(i => i !== id)
        : state.comparisonIds.length < 2
          ? [...state.comparisonIds, id]
          : [state.comparisonIds[1], id];
      return { ...state, comparisonIds: ids };
    }
    case 'TOGGLE_SHORTLIST': {
      const entrepreneurs = state.entrepreneurs.map(e =>
        e.id === action.payload ? { ...e, isShortlisted: !e.isShortlisted } : e
      );
      return { ...state, entrepreneurs };
    }
    case 'UPDATE_ENTREPRENEUR': {
      const entrepreneurs = state.entrepreneurs.map(e =>
        e.id === action.payload.id ? { ...e, ...action.payload } : e
      );
      return { ...state, entrepreneurs };
    }
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'CLOSE_SIDEBAR':
      return { ...state, sidebarOpen: false };
    case 'RESET_DATA':
      return { ...state, entrepreneurs: mockEntrepreneurs };
    default:
      return state;
  }
}

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem('unseenceo_data', JSON.stringify(state.entrepreneurs));
    } catch (e) {
      console.warn('localStorage save failed:', e);
    }
  }, [state.entrepreneurs]);

  const filteredEntrepreneurs = state.entrepreneurs.filter(e => {
    const { sector, minAgencyScore, maxFundingNeeded, shortlistedOnly, searchQuery } = state.filters;
    if (sector !== 'all' && e.sector !== sector) return false;
    if (e.agencyScore.percentage < minAgencyScore) return false;
    if (maxFundingNeeded !== Infinity && e.fundingNeeded > maxFundingNeeded) return false;
    if (shortlistedOnly && !e.isShortlisted) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!e.name.toLowerCase().includes(q) && !e.businessName.toLowerCase().includes(q) && !e.location.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const summaryStats = {
    total: state.entrepreneurs.length,
    avgAgencyScore: Math.round(state.entrepreneurs.reduce((sum, e) => sum + e.agencyScore.percentage, 0) / state.entrepreneurs.length),
    totalFunding: state.entrepreneurs.reduce((sum, e) => sum + e.fundingNeeded, 0),
    shortlisted: state.entrepreneurs.filter(e => e.isShortlisted).length,
    highAgency: state.entrepreneurs.filter(e => e.agencyScore.percentage >= 76).length,
    moderateAgency: state.entrepreneurs.filter(e => e.agencyScore.percentage >= 48 && e.agencyScore.percentage < 76).length,
    lowAgency: state.entrepreneurs.filter(e => e.agencyScore.percentage < 48).length,
  };

  const value = {
    ...state,
    dispatch,
    filteredEntrepreneurs,
    summaryStats,
    getEntrepreneurById: (id) => state.entrepreneurs.find(e => e.id === id),
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
