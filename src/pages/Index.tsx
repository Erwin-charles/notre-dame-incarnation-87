
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import Navigation from '../components/Navigation';
import HomePage from '../components/HomePage';
import CatechesePage from '../components/CatechesePage';
import GroupesPage from '../components/GroupesPage';
import ActivitesPage from '../components/ActivitesPage';
import DashboardPage from '../components/DashboardPage';
import AdminDashboard from '../components/AdminDashboard';
import ContactPage from '../components/ContactPage';
import CatechistesPage from '../components/CatechistesPage';
import EvenementsPage from '../components/EvenementsPage';
import PreInscriptionPage from '../components/PreInscriptionPage';
import BenedictionsPage from '../components/BenedictionsPage';
import DenierCultePage from '../components/DenierCultePage';
import LibrairieCaritasPage from '../components/LibrairieCaritasPage';
import InscriptionCatechistePage from '../components/InscriptionCatechistePage';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import ParishPreloader from '../components/ParishPreloader';
import PageParticles from '../components/PageParticles';

interface IndexProps {
  user: User;
  onLogout: () => void;
}

const Index = ({ user, onLogout }: IndexProps) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'catechese':
        return <CatechesePage />;
      case 'groupes':
        return <GroupesPage />;
      case 'activites':
        return <ActivitesPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'contact':
        return <ContactPage />;
      case 'catechistes':
        return <CatechistesPage />;
      case 'evenements':
        return <EvenementsPage />;
      case 'pre-inscription':
        return <PreInscriptionPage />;
      case 'benedictions':
        return <BenedictionsPage />;
      case 'denier-culte':
        return <DenierCultePage />;
      case 'librairie-caritas':
        return <LibrairieCaritasPage />;
      case 'inscription-catechiste':
        return <InscriptionCatechistePage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  if (isLoading) {
    return <ParishPreloader />;
  }

  return (
    <div className="min-h-screen bg-white relative">
      {currentPage !== 'home' && <PageParticles />}
      <Navigation onNavigate={handleNavigate} currentPage={currentPage} user={user} onLogout={onLogout} />
      {renderPage()}
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
