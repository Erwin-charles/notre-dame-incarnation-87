import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, LogIn, UserPlus, Church, KeyRound, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthPageProps {
  onAuthSuccess: () => void;
  onNavigateHome?: () => void;
}

const AuthPage = ({ onAuthSuccess, onNavigateHome }: AuthPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const { toast } = useToast();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nom: '',
    prenom: '',
    telephone: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Vérifier d'abord la connexion Supabase
      const { data: healthCheck } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
      console.log('Supabase connection check:', healthCheck);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email.trim().toLowerCase(),
        password: loginData.password,
      });

      if (error) {
        console.error('Login error:', error);
        let errorMessage = error.message;
        
        // Messages d'erreur plus explicites
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Email ou mot de passe incorrect. Vérifiez vos identifiants.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Veuillez confirmer votre email avant de vous connecter.';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Trop de tentatives de connexion. Attendez quelques minutes.';
        }

        setError(errorMessage);
        toast({
          title: "Erreur de connexion",
          description: errorMessage,
          variant: "destructive",
        });
      } else if (data.user) {
        console.log('Login successful:', data.user);
        
        // Vérifier si le profil existe
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError && profileError.code === 'PGRST116') {
          // Créer le profil s'il n'existe pas
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              email: data.user.email || '',
              nom: data.user.user_metadata?.nom || '',
              prenom: data.user.user_metadata?.prenom || '',
              telephone: data.user.user_metadata?.telephone || '',
            });

          if (insertError) {
            console.error('Profile creation error:', insertError);
          }
        }

        toast({
          title: "Connexion réussie",
          description: "Bienvenue !",
        });
        onAuthSuccess();
      }
    } catch (err) {
      console.error('Unexpected login error:', err);
      setError('Erreur de connexion inattendue. Vérifiez votre connexion internet.');
      toast({
        title: "Erreur de connexion",
        description: "Erreur de connexion inattendue. Vérifiez votre connexion internet.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validations
    if (!signupData.nom.trim() || !signupData.prenom.trim()) {
      setError('Le nom et le prénom sont obligatoires');
      setIsLoading(false);
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }

    if (signupData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setIsLoading(false);
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupData.email)) {
      setError('Format d\'email invalide');
      setIsLoading(false);
      return;
    }

    try {
      const redirectUrl = `${window.location.origin}/`;

      const { data, error } = await supabase.auth.signUp({
        email: signupData.email.trim().toLowerCase(),
        password: signupData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            nom: signupData.nom.trim(),
            prenom: signupData.prenom.trim(),
            telephone: signupData.telephone.trim()
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        let errorMessage = error.message;
        
        if (error.message.includes('User already registered')) {
          errorMessage = 'Un compte existe déjà avec cet email.';
        } else if (error.message.includes('Password should be at least 6 characters')) {
          errorMessage = 'Le mot de passe doit contenir au moins 6 caractères.';
        }

        setError(errorMessage);
        toast({
          title: "Erreur d'inscription",
          description: errorMessage,
          variant: "destructive",
        });
    // Send welcome email
    if (data.user) {
      try {
        await supabase.functions.invoke('send-welcome-email', {
          body: {
            email: signupData.email,
            nom: signupData.nom,
            prenom: signupData.prenom,
          }
        });
        console.log('Welcome email sent successfully');
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
        // Don't throw error here - signup should still succeed even if email fails
      }
    }

        // Réinitialiser le formulaire
        setSignupData({
          email: '',
          password: '',
          confirmPassword: '',
          nom: '',
          prenom: '',
          telephone: ''
        });
      }
    } catch (err) {
      console.error('Unexpected signup error:', err);
      setError('Erreur d\'inscription inattendue. Réessayez plus tard.');
      toast({
        title: "Erreur d'inscription",
        description: "Erreur d'inscription inattendue. Réessayez plus tard.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setResetSent(true);
      toast({
        title: "Email envoyé",
        description: "Vérifiez votre boîte mail pour réinitialiser votre mot de passe.",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/20 dark:from-background dark:to-primary/5 flex items-center justify-center px-4 relative">
      {onNavigateHome && (
        <Button
          variant="ghost"
          onClick={onNavigateHome}
          className="absolute top-6 left-6 backdrop-blur-md bg-background/30 border border-border/30 hover:bg-background/50 rounded-full px-4 py-2 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Accueil
        </Button>
      )}
      <Card className="w-full max-w-md backdrop-blur-xl bg-background/60 border border-border/30 shadow-2xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full backdrop-blur-md bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Church className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Paroisse Notre Dame de l'Incarnation</CardTitle>
          <CardDescription>
            Connectez-vous ou créez votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {showResetForm ? (
            <div className="space-y-4">
              <div className="text-center">
                <KeyRound className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold">Réinitialiser le mot de passe</h3>
                <p className="text-sm text-muted-foreground">
                  Entrez votre email pour recevoir un lien de réinitialisation
                </p>
              </div>
              
              {resetSent ? (
                <div className="text-center space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Un email de réinitialisation a été envoyé à votre adresse.
                    </AlertDescription>
                  </Alert>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowResetForm(false);
                      setResetSent(false);
                      setResetEmail('');
                    }}
                    className="w-full"
                  >
                    Retour à la connexion
                  </Button>
                </div>
              ) : (
                <form onSubmit={handlePasswordReset} className="space-y-4">
                  <div>
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      placeholder="votre@email.com"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    <KeyRound className="w-4 h-4 mr-2" />
                    {isLoading ? 'Envoi...' : 'Envoyer le lien'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowResetForm(false)}
                    className="w-full"
                  >
                    Annuler
                  </Button>
                </form>
              )}
            </div>
          ) : (
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="signup">Inscription</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Mot de passe</Label>
                    <InputPassword
                      id="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      placeholder="Votre mot de passe"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    {isLoading ? 'Connexion...' : 'Se connecter'}
                  </Button>
                  
                  <div className="text-center mt-4">
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setShowResetForm(true)}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Mot de passe oublié ?
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="prenom">Prénom</Label>
                      <Input
                        id="prenom"
                        value={signupData.prenom}
                        onChange={(e) => setSignupData({ ...signupData, prenom: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="nom">Nom</Label>
                      <Input
                        id="nom"
                        value={signupData.nom}
                        onChange={(e) => setSignupData({ ...signupData, nom: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input
                      id="telephone"
                      type="tel"
                      value={signupData.telephone}
                      onChange={(e) => setSignupData({ ...signupData, telephone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Mot de passe</Label>
                    <InputPassword
                      id="signup-password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      placeholder="Minimum 6 caractères"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                    <InputPassword
                      id="confirm-password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      required
                      placeholder="Répétez votre mot de passe"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {isLoading ? 'Inscription...' : "S'inscrire"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;