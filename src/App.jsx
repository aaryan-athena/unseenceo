import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import AgencyScore from './pages/AgencyScore';
import Profiles from './pages/Profiles';
import EntrepreneurProfile from './pages/EntrepreneurProfile';
import BusinessPlanBuilder from './pages/BusinessPlanBuilder';
import Matching from './pages/Matching';
import About from './pages/About';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/agency" element={<AgencyScore />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profiles/:id" element={<EntrepreneurProfile />} />
            <Route path="/builder" element={<BusinessPlanBuilder />} />
            <Route path="/matching" element={<Matching />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
