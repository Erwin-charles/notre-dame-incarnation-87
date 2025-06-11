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
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import ParishPreloader from '../components/ParishPreloader';

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
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  if (isLoading) {
    return <ParishPreloader />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={handleNavigate} currentPage={currentPage} />
      {renderPage()}
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
