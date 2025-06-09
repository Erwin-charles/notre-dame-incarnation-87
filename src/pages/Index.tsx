
import { useState } from 'react';
import Navigation from '../components/Navigation';
import HomePage from '../components/HomePage';
import CatechesePage from '../components/CatechesePage';
import GroupesPage from '../components/GroupesPage';
import ActivitesPage from '../components/ActivitesPage';
import DashboardPage from '../components/DashboardPage';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');

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
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

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
