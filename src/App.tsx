import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import NotFound from './pages/NotFound';

// Lazy-loaded pages
const HomePage = lazy(() => import('./components/HomePage'));
const AuthPage = lazy(() => import('./components/AuthPage'));
const PasswordResetPage = lazy(() => import('./components/PasswordResetPage'));
const CatechesePage = lazy(() => import('./components/CatechesePage'));
const GroupesPage = lazy(() => import('./components/GroupesPage'));
const ActivitesPage = lazy(() => import('./components/ActivitesPage'));
const DashboardPage = lazy(() => import('./components/DashboardPage'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const AdminCRUDDashboard = lazy(() => import('./components/AdminCRUDDashboard'));
const AdminInscriptionsPage = lazy(() => import('./components/AdminInscriptionsPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const CatechistesPage = lazy(() => import('./components/CatechistesPage'));
const EvenementsPage = lazy(() => import('./components/EvenementsPage'));
const PreInscriptionPage = lazy(() => import('./components/PreInscriptionPage'));
const BenedictionsPage = lazy(() => import('./components/BenedictionsPage'));
const DenierCultePage = lazy(() => import('./components/DenierCultePage'));
const LibrairieCaritasPage = lazy(() => import('./components/LibrairieCaritasPage'));
const InscriptionCatechistePage = lazy(() => import('./components/InscriptionCatechistePage'));
const NewsletterPage = lazy(() => import('./components/NewsletterPage'));
const IntentionsMessePage = lazy(() => import('./components/IntentionsMessePage'));
const DonsEnLignePage = lazy(() => import('./components/DonsEnLignePage'));
const ResourcesSpirituellesPage = lazy(() => import('./components/ResourcesSpirituellesPage'));
const GalerieMediaPage = lazy(() => import('./components/GalerieMediaPage'));
const StatistiquesPage = lazy(() => import('./components/StatistiquesPage'));
const StatistiquesInscriptionsPage = lazy(() => import('./components/StatistiquesInscriptionsPage'));
const CalendrierLiturgiquePage = lazy(() => import('./components/CalendrierLiturgiquePage'));
const DocumentsTelechargementPage = lazy(() => import('./components/DocumentsTelechargementPage'));
const DocumentsCoursPage = lazy(() => import('./components/DocumentsCoursPage'));
const ParametresPage = lazy(() => import('./components/ParametresPage'));
const DiagnosticPage = lazy(() => import('./components/DiagnosticPage'));
const HistoirePage = lazy(() => import('./components/HistoirePage'));
const ActualitesPage = lazy(() => import('./components/ActualitesPage'));
const PermanencesPage = lazy(() => import('./components/PermanencesPage'));
const SecretariatPage = lazy(() => import('./components/SecretariatPage'));
const SacrementsPage = lazy(() => import('./components/SacrementsPage'));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
  </div>
);

const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Standalone pages */}
                <Route
                  path="/auth"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <AuthPage onAuthSuccess={() => {}} onNavigateHome={() => window.location.href = '/'} />
                    </Suspense>
                  }
                />
                <Route
                  path="/reset-password"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <PasswordResetPage />
                    </Suspense>
                  }
                />

                {/* Main layout with navigation */}
                <Route element={<Layout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/histoire" element={<HistoirePage />} />
                  <Route path="/actualites" element={<ActualitesPage />} />
                  <Route path="/catechese" element={<CatechesePage />} />
                  <Route path="/groupes" element={<GroupesPage />} />
                  <Route path="/activites" element={<ActivitesPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin-crud" element={<AdminCRUDDashboard />} />
                  <Route path="/admin-inscriptions" element={<AdminInscriptionsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/catechistes" element={<CatechistesPage />} />
                  <Route path="/evenements" element={<EvenementsPage />} />
                  <Route path="/pre-inscription" element={<PreInscriptionPage />} />
                  <Route path="/benedictions" element={<BenedictionsPage />} />
                  <Route path="/denier-culte" element={<DenierCultePage />} />
                  <Route path="/librairie-caritas" element={<LibrairieCaritasPage />} />
                  <Route path="/inscription-catechiste" element={<InscriptionCatechistePage />} />
                  <Route path="/newsletter" element={<NewsletterPage />} />
                  <Route path="/intentions-messe" element={<IntentionsMessePage />} />
                  <Route path="/permanences" element={<PermanencesPage />} />
                  <Route path="/secretariat" element={<SecretariatPage />} />
                  <Route path="/sacrements" element={<SacrementsPage />} />
                  <Route path="/dons-en-ligne" element={<DonsEnLignePage />} />
                  <Route path="/ressources-spirituelles" element={<ResourcesSpirituellesPage />} />
                  <Route path="/galerie-media" element={<GalerieMediaPage />} />
                  <Route path="/statistiques" element={<StatistiquesPage />} />
                  <Route path="/statistiques-inscriptions" element={<StatistiquesInscriptionsPage />} />
                  <Route path="/calendrier-liturgique" element={<CalendrierLiturgiquePage />} />
                  <Route path="/documents-telechargement" element={<DocumentsTelechargementPage />} />
                  <Route path="/documents-cours" element={<DocumentsCoursPage />} />
                  <Route path="/parametres" element={<ParametresPage />} />
                  <Route path="/diagnostic" element={<DiagnosticPage />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
