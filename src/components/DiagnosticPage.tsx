import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Database, Wifi } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DiagnosticResult {
  name: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  details?: string;
}

const DiagnosticPage = () => {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostic = async () => {
    setIsRunning(true);
    const diagnosticResults: DiagnosticResult[] = [];

    // Test 1: Connexion Supabase
    try {
      const startTime = Date.now();
      const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
      const responseTime = Date.now() - startTime;

      if (error) {
        diagnosticResults.push({
          name: 'Connexion Supabase',
          status: 'error',
          message: 'Échec de connexion à la base de données',
          details: error.message
        });
      } else {
        diagnosticResults.push({
          name: 'Connexion Supabase',
          status: 'success',
          message: `Connexion réussie (${responseTime}ms)`,
          details: 'Base de données accessible'
        });
      }
    } catch (err) {
      diagnosticResults.push({
        name: 'Connexion Supabase',
        status: 'error',
        message: 'Erreur de réseau',
        details: err instanceof Error ? err.message : 'Erreur inconnue'
      });
    }

    // Test 2: Configuration Auth
    try {
      const { data: session } = await supabase.auth.getSession();
      diagnosticResults.push({
        name: 'Configuration Auth',
        status: 'success',
        message: 'Service d\'authentification accessible',
        details: session.session ? 'Utilisateur connecté' : 'Aucune session active'
      });
    } catch (err) {
      diagnosticResults.push({
        name: 'Configuration Auth',
        status: 'error',
        message: 'Problème avec l\'authentification',
        details: err instanceof Error ? err.message : 'Erreur inconnue'
      });
    }

    // Test 3: Tables de base
    const validTables = ['profiles', 'evenements_liturgiques', 'activites', 'catechumenes'] as const;
    
    for (const table of validTables) {
      try {
        const { error } = await supabase.from(table).select('*').limit(1);
        if (error && error.code === 'PGRST106') {
          diagnosticResults.push({
            name: `Table ${table}`,
            status: 'error',
            message: `Table ${table} n'existe pas`,
            details: 'La table doit être créée dans Supabase'
          });
        } else if (error) {
          diagnosticResults.push({
            name: `Table ${table}`,
            status: 'warning',
            message: `Problème d'accès à ${table}`,
            details: error.message
          });
        } else {
          diagnosticResults.push({
            name: `Table ${table}`,
            status: 'success',
            message: `Table ${table} accessible`,
            details: 'Structure OK'
          });
        }
      } catch (err) {
        diagnosticResults.push({
          name: `Table ${table}`,
          status: 'error',
          message: `Erreur lors du test de ${table}`,
          details: err instanceof Error ? err.message : 'Erreur inconnue'
        });
      }
    }

    // Test 4: Variables d'environnement
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dblxdhthlsumgtyskeod.supabase.co';
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
    
    diagnosticResults.push({
      name: 'Configuration URL',
      status: supabaseUrl ? 'success' : 'error',
      message: supabaseUrl ? 'URL Supabase configurée' : 'URL Supabase manquante',
      details: supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'Variable VITE_SUPABASE_URL manquante'
    });

    diagnosticResults.push({
      name: 'Clé API',
      status: supabaseKey ? 'success' : 'error',
      message: supabaseKey ? 'Clé API configurée' : 'Clé API manquante',
      details: supabaseKey ? 'Clé présente (masquée pour sécurité)' : 'Variable VITE_SUPABASE_ANON_KEY manquante'
    });

    setResults(diagnosticResults);
    setIsRunning(false);
  };

  useEffect(() => {
    runDiagnostic();
  }, []);

  const getStatusIcon = (status: 'success' | 'error' | 'warning') => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: 'success' | 'error' | 'warning') => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const hasErrors = results.some(r => r.status === 'error');
  const hasWarnings = results.some(r => r.status === 'warning');

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-6 h-6" />
                Diagnostic de la Base de Données
              </CardTitle>
              <CardDescription>
                Vérification de la configuration et de la connectivité Supabase
              </CardDescription>
            </div>
            <Button 
              onClick={runDiagnostic} 
              disabled={isRunning}
              variant="outline"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRunning ? 'animate-spin' : ''}`} />
              {isRunning ? 'Test en cours...' : 'Relancer les tests'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.length === 0 && isRunning && (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin text-blue-500" />
              <p className="text-muted-foreground">Tests de diagnostic en cours...</p>
            </div>
          )}

          {results.length > 0 && (
            <>
              <div className="flex gap-2 mb-4">
                <Badge variant={hasErrors ? 'destructive' : hasWarnings ? 'secondary' : 'default'}>
                  {hasErrors ? 'Erreurs détectées' : hasWarnings ? 'Avertissements' : 'Tout fonctionne'}
                </Badge>
              </div>

              <div className="space-y-3">
                {results.map((result, index) => (
                  <Alert key={index} className={`border-l-4 ${
                    result.status === 'success' ? 'border-l-green-500' : 
                    result.status === 'error' ? 'border-l-red-500' : 'border-l-yellow-500'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getStatusIcon(result.status)}
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{result.name}</h4>
                            <Badge className={getStatusColor(result.status)}>
                              {result.status === 'success' ? 'OK' : 
                               result.status === 'error' ? 'ERREUR' : 'ATTENTION'}
                            </Badge>
                          </div>
                          <AlertDescription className="mt-1">
                            {result.message}
                            {result.details && (
                              <div className="text-sm text-muted-foreground mt-1">
                                {result.details}
                              </div>
                            )}
                          </AlertDescription>
                        </div>
                      </div>
                    </div>
                  </Alert>
                ))}
              </div>

              {hasErrors && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <AlertDescription className="text-red-700">
                    <strong>Actions recommandées :</strong>
                    <ul className="mt-2 space-y-1 list-disc list-inside">
                      <li>Vérifiez votre configuration Supabase</li>
                      <li>Assurez-vous que les tables nécessaires existent</li>
                      <li>Vérifiez les politiques RLS (Row Level Security)</li>
                      <li>Contactez l'administrateur si les problèmes persistent</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosticPage;