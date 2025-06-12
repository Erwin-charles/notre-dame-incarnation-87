
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import HomePage from '../components/HomePage';
import CatechesePage from '../components/CatechesePage';
import GroupesPage from '../components/GroupesPage';
import ActivitesPage from '../components/ActivitesPage';
import DashboardPage from '../components/DashboardPage';
import ContactPage from '../components/ContactPage';
import CatechistesPage from '../components/CatechistesPage';
import EvenementsPage from '../components/EvenementsPage';
import PreInscriptionPage from '../components/PreInscriptionPage';
import BenedictionsPage from '../components/BenedictionsPage';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import ParishPreloader from '../components/ParishPreloader';
import PageParticles from '../components/PageParticles';

const Index = () => {
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
      <Navigation onNavigate={handleNavigate} currentPage={currentPage} />
      {renderPage()}
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
