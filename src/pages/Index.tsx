
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
import NewsletterPage from '../components/NewsletterPage';
import IntentionsMessePage from '../components/IntentionsMessePage';
import DonsEnLignePage from '../components/DonsEnLignePage';
import ResourcesSpirituellesPage from '../components/ResourcesSpirituellesPage';
import GalerieMediaPage from '../components/GalerieMediaPage';
import StatistiquesPage from '../components/StatistiquesPage';
import CalendrierLiturgiquePage from '../components/CalendrierLiturgiquePage';
import DocumentsTelechargementPage from '../components/DocumentsTelechargementPage';
import DocumentsCoursPage from '../components/DocumentsCoursPage';
import ParametresPage from '../components/ParametresPage';
import DiagnosticPage from '../components/DiagnosticPage';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import ParishPreloader from '../components/ParishPreloader';
import PageParticles from '../components/PageParticles';
import HistoirePage from '../components/HistoirePage';
import ActualitesPage from '../components/ActualitesPage';

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
      case 'histoire':
        return <HistoirePage />;
      case 'actualites':
        return <ActualitesPage />;
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
      case 'newsletter':
        return <NewsletterPage />;
      case 'intentions-messe':
        return <IntentionsMessePage />;
      case 'dons-en-ligne':
        return <DonsEnLignePage />;
      case 'ressources-spirituelles':
        return <ResourcesSpirituellesPage />;
      case 'galerie-media':
        return <GalerieMediaPage />;
      case 'statistiques':
        return <StatistiquesPage />;
      case 'calendrier-liturgique':
        return <CalendrierLiturgiquePage />;
      case 'documents-telechargement':
        return <DocumentsTelechargementPage />;
      case 'documents-cours':
        return <DocumentsCoursPage />;
      case 'parametres':
        return <ParametresPage />;
      case 'diagnostic':
        return <DiagnosticPage />;
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
