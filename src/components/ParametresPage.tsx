import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Upload,
  Download,
  Eye,
  EyeOff,
  ShoppingCart
} from "lucide-react";

const ParametresPage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    newsletter: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setProfile(profileData);
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;

      setProfile({ ...profile, ...updates });
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées avec succès",
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour votre profil",
        variant: "destructive",
      });
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await updateProfile({ avatar_url: data.publicUrl });
    } catch (error) {
      console.error('Erreur upload:', error);
      toast({
        title: "Erreur",
        description: "Impossible de télécharger la photo",
        variant: "destructive",
      });
    }
  };

  const saveNotificationPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Ici vous pouvez sauvegarder les préférences en base ou localStorage
      localStorage.setItem('notification_preferences', JSON.stringify(notifications));
      
      toast({
        title: "Préférences sauvegardées",
        description: "Vos préférences de notification ont été mises à jour",
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les préférences",
        variant: "destructive",
      });
    }
  };

  const savePrivacySettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      localStorage.setItem('privacy_settings', JSON.stringify(privacy));
      
      toast({
        title: "Paramètres sauvegardés",
        description: "Vos paramètres de confidentialité ont été mis à jour",
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les paramètres",
        variant: "destructive",
      });
    }
  };

  const exportData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Récupérer toutes les données de l'utilisateur
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const dataToExport = {
        profile: data[0],
        exported_at: new Date().toISOString(),
        user_id: user.id
      };

      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: 'application/json'
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mes-donnees-paroisse-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Export réussi",
        description: "Vos données ont été téléchargées",
      });
    } catch (error) {
      console.error('Erreur export:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'exporter vos données",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6 pt-20">
      <div className="flex items-center space-x-4 mb-8">
        <Settings className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-primary">Paramètres</h1>
          <p className="text-muted-foreground">Gérez vos préférences et paramètres de compte</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
          <TabsTrigger value="panier">Panier</TabsTrigger>
          <TabsTrigger value="data">Mes Données</TabsTrigger>
          <TabsTrigger value="about">À Propos</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Informations Personnelles
              </CardTitle>
              <CardDescription>
                Mettez à jour vos informations de profil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="text-lg">
                    {profile?.prenom?.[0]}{profile?.nom?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <Button variant="outline" asChild>
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Changer la photo
                    </label>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input
                    id="prenom"
                    value={profile?.prenom || ''}
                    onChange={(e) => setProfile({ ...profile, prenom: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    id="nom"
                    value={profile?.nom || ''}
                    onChange={(e) => setProfile({ ...profile, nom: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile?.email || ''}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    value={profile?.telephone || ''}
                    onChange={(e) => setProfile({ ...profile, telephone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="adresse">Adresse</Label>
                <Textarea
                  id="adresse"
                  value={profile?.adresse || ''}
                  onChange={(e) => setProfile({ ...profile, adresse: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="profession">Profession</Label>
                  <Input
                    id="profession"
                    value={profile?.profession || ''}
                    onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="date_naissance">Date de naissance</Label>
                  <Input
                    id="date_naissance"
                    type="date"
                    value={profile?.date_naissance || ''}
                    onChange={(e) => setProfile({ ...profile, date_naissance: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={() => updateProfile(profile)}>
                Sauvegarder les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Préférences de Notification
              </CardTitle>
              <CardDescription>
                Choisissez comment vous souhaitez être notifié
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notif">Notifications par email</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez les actualités et événements par email
                    </p>
                  </div>
                  <Switch
                    id="email-notif"
                    checked={notifications.email}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, email: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notif">Notifications SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez les urgences et rappels par SMS
                    </p>
                  </div>
                  <Switch
                    id="sms-notif"
                    checked={notifications.sms}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, sms: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newsletter">Newsletter paroissiale</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez la newsletter mensuelle
                    </p>
                  </div>
                  <Switch
                    id="newsletter"
                    checked={notifications.newsletter}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, newsletter: checked})
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={saveNotificationPreferences}>
                  Sauvegarder les préférences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Paramètres de Confidentialité
              </CardTitle>
              <CardDescription>
                Contrôlez la visibilité de vos informations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="profile-visible">Profil visible</Label>
                    <p className="text-sm text-muted-foreground">
                      Permettre aux autres paroissiens de voir votre profil
                    </p>
                  </div>
                  <Switch
                    id="profile-visible"
                    checked={privacy.profileVisible}
                    onCheckedChange={(checked) => 
                      setPrivacy({...privacy, profileVisible: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-email">Email visible</Label>
                    <p className="text-sm text-muted-foreground">
                      Afficher votre email dans l'annuaire paroissial
                    </p>
                  </div>
                  <Switch
                    id="show-email"
                    checked={privacy.showEmail}
                    onCheckedChange={(checked) => 
                      setPrivacy({...privacy, showEmail: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-phone">Téléphone visible</Label>
                    <p className="text-sm text-muted-foreground">
                      Afficher votre téléphone dans l'annuaire paroissial
                    </p>
                  </div>
                  <Switch
                    id="show-phone"
                    checked={privacy.showPhone}
                    onCheckedChange={(checked) => 
                      setPrivacy({...privacy, showPhone: checked})
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={savePrivacySettings}>
                  Sauvegarder les paramètres
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="panier" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Mon Panier
              </CardTitle>
              <CardDescription>
                Gérez vos articles et commandes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Articles dans le panier</h4>
                    <Badge variant="secondary">3 articles</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium">Livre de catéchèse - Niveau 1</span>
                        <p className="text-sm text-muted-foreground">Quantité: 1</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">5,000 FCFA</span>
                        <Button variant="outline" size="sm">Modifier</Button>
                        <Button variant="destructive" size="sm">Supprimer</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium">Don pour les œuvres caritatives</span>
                        <p className="text-sm text-muted-foreground">Montant personnalisé</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">10,000 FCFA</span>
                        <Button variant="outline" size="sm">Modifier</Button>
                        <Button variant="destructive" size="sm">Supprimer</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total:</span>
                      <span>15,000 FCFA</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1">
                      Ajouter des articles
                    </Button>
                    <Button className="flex-1">
                      Poursuivre l'achat
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Gestion des Données
              </CardTitle>
              <CardDescription>
                Exportez ou gérez vos données personnelles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Exporter mes données</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Téléchargez une copie de toutes vos données dans un fichier JSON
                  </p>
                  <Button onClick={exportData} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger mes données
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Données collectées</h4>
                  <div className="space-y-2">
                    <Badge variant="outline">Informations de profil</Badge>
                    <Badge variant="outline">Historique des inscriptions</Badge>
                    <Badge variant="outline">Préférences de notification</Badge>
                    <Badge variant="outline">Données de connexion</Badge>
                  </div>
                </div>

                <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950">
                  <h4 className="font-medium mb-2 text-red-700 dark:text-red-300">Zone dangereuse</h4>
                  <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                    Ces actions sont irréversibles
                  </p>
                  <Button variant="destructive" disabled>
                    Supprimer mon compte
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>À Propos du Système Paroissial</CardTitle>
              <CardDescription>
                Informations sur l'application et mentions légales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Version de l'application</h4>
                  <p className="text-sm text-muted-foreground">Version 2.1.0 - Décembre 2024</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Développé pour</h4>
                  <p className="text-sm text-muted-foreground">
                    Paroisse Notre Dame de l'Incarnation - Cocody, Abidjan
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Services Disponibles</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Badge variant="secondary">Gestion des catéchumènes</Badge>
                    <Badge variant="secondary">Calendrier liturgique</Badge>
                    <Badge variant="secondary">Librairie & Caritas</Badge>
                    <Badge variant="secondary">Dons en ligne</Badge>
                    <Badge variant="secondary">Planning des services</Badge>
                    <Badge variant="secondary">Documents de cours</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Support technique</h4>
                  <p className="text-sm text-muted-foreground">
                    Pour toute assistance technique, contactez le secrétariat paroissial
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Politique de confidentialité</h4>
                  <p className="text-sm text-muted-foreground">
                    Vos données sont traitées dans le respect de la réglementation en vigueur.
                    Elles ne sont utilisées que pour les besoins de la gestion paroissiale.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParametresPage;