import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Download, FileText, Plus, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageParticles from "./PageParticles";

interface Document {
  id: string;
  titre: string;
  description?: string;
  type_document?: string;
  categorie?: string;
  fichier_url?: string;
  uploaded_by?: string;
  created_at: string;
}

const DocumentsCoursPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedNiveau, setSelectedNiveau] = useState<string>('all');
  const { toast } = useToast();

  const [newDocument, setNewDocument] = useState({
    titre: '',
    description: '',
    type_document: '',
    niveau: '',
    telechargeable: true
  });

  const [uploadFile, setUploadFile] = useState<File | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    filterDocuments();
  }, [documents, searchTerm, selectedType, selectedNiveau]);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des documents:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les documents",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterDocuments = () => {
    let filtered = documents;

    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(doc => doc.type_document === selectedType);
    }

    if (selectedNiveau !== 'all') {
      filtered = filtered.filter(doc => doc.categorie === selectedNiveau);
    }

    setFilteredDocuments(filtered);
  };

  const handleFileUpload = async () => {
    if (!uploadFile || !newDocument.titre || !newDocument.type_document) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires et sélectionner un fichier",
        variant: "destructive",
      });
      return;
    }

    try {
      // Upload du fichier vers Supabase Storage (bucket à créer)
      const fileExt = uploadFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      // Pour l'instant, on simule l'upload avec une URL temporaire
      // Dans un cas réel, il faudrait créer un bucket storage
      const fichier_url = `https://example.com/documents/${fileName}`;

      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error("Utilisateur non connecté");

      const { error } = await supabase
        .from('documents')
        .insert({
          titre: newDocument.titre,
          description: newDocument.description,
          type_document: newDocument.type_document,
          categorie: newDocument.niveau,
          fichier_url,
          uploaded_by: user.user.id
        });

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Document téléversé avec succès",
      });

      setIsUploadDialogOpen(false);
      setNewDocument({
        titre: '',
        description: '',
        type_document: '',
        niveau: '',
        telechargeable: true
      });
      setUploadFile(null);
      fetchDocuments();
    } catch (error) {
      console.error('Erreur lors du téléversement:', error);
      toast({
        title: "Erreur",
        description: "Impossible de téléverser le document",
        variant: "destructive",
      });
    }
  };

  const handleDownload = (document: Document) => {
    // Simuler le téléchargement
    toast({
      title: "Téléchargement",
      description: `Téléchargement de "${document.titre}" en cours...`,
    });
    
    // Dans un cas réel, on redirigerait vers l'URL du fichier
    window.open(document.fichier_url, '_blank');
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      'cours': 'Cours',
      'exercice': 'Exercice',
      'support': 'Support',
      'evaluation': 'Évaluation'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'cours': 'bg-blue-100 text-blue-800',
      'exercice': 'bg-green-100 text-green-800',
      'support': 'bg-purple-100 text-purple-800',
      'evaluation': 'bg-red-100 text-red-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative">
      <PageParticles />
      
      <div className="container mx-auto p-6 space-y-6 relative z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
              <FileText className="h-8 w-8" />
              Documents de Cours
            </h1>
            <p className="text-muted-foreground">
              Téléchargement et téléversement de supports pédagogiques
            </p>
          </div>
          
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Téléverser un document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Nouveau document</DialogTitle>
                <DialogDescription>
                  Téléverser un nouveau document de cours
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file">Fichier</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  />
                </div>

                <div>
                  <Label htmlFor="titre">Titre du document</Label>
                  <Input
                    id="titre"
                    value={newDocument.titre}
                    onChange={(e) => setNewDocument({
                      ...newDocument,
                      titre: e.target.value
                    })}
                    placeholder="Ex: Leçon 1 - Les sacrements"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Type de document</Label>
                  <Select 
                    value={newDocument.type_document}
                    onValueChange={(value) => setNewDocument({
                      ...newDocument,
                      type_document: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cours">Cours</SelectItem>
                      <SelectItem value="exercice">Exercice</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="evaluation">Évaluation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="niveau">Niveau</Label>
                  <Select 
                    value={newDocument.niveau}
                    onValueChange={(value) => setNewDocument({
                      ...newDocument,
                      niveau: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eveil_foi">Éveil à la foi</SelectItem>
                      <SelectItem value="ce1_ce2">CE1-CE2</SelectItem>
                      <SelectItem value="cm1_cm2">CM1-CM2</SelectItem>
                      <SelectItem value="sixieme_cinquieme">6ème-5ème</SelectItem>
                      <SelectItem value="quatrieme_troisieme">4ème-3ème</SelectItem>
                      <SelectItem value="lycee">Lycée</SelectItem>
                      <SelectItem value="adulte">Adulte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newDocument.description}
                    onChange={(e) => setNewDocument({
                      ...newDocument,
                      description: e.target.value
                    })}
                    placeholder="Description du contenu du document..."
                  />
                </div>

                <Button onClick={handleFileUpload} className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Téléverser le document
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filtres */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un document..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de document" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="cours">Cours</SelectItem>
                  <SelectItem value="exercice">Exercice</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="evaluation">Évaluation</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedNiveau} onValueChange={setSelectedNiveau}>
                <SelectTrigger>
                  <SelectValue placeholder="Niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les niveaux</SelectItem>
                  <SelectItem value="eveil_foi">Éveil à la foi</SelectItem>
                  <SelectItem value="ce1_ce2">CE1-CE2</SelectItem>
                  <SelectItem value="cm1_cm2">CM1-CM2</SelectItem>
                  <SelectItem value="sixieme_cinquieme">6ème-5ème</SelectItem>
                  <SelectItem value="quatrieme_troisieme">4ème-3ème</SelectItem>
                  <SelectItem value="lycee">Lycée</SelectItem>
                  <SelectItem value="adulte">Adulte</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-2">{document.titre}</CardTitle>
                  <FileText className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                </div>
                <CardDescription className="line-clamp-3">
                  {document.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={getTypeColor(document.type_document)}>
                    {getTypeLabel(document.type_document)}
                  </Badge>
                  {document.categorie && (
                    <Badge variant="outline">
                      {document.categorie.replace('_', ' ')}
                    </Badge>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Type: {document.type_document || 'Document'}</p>
                  <p>Ajouté le: {new Date(document.created_at).toLocaleDateString('fr-FR')}</p>
                </div>

                <Button 
                  onClick={() => handleDownload(document)}
                  className="w-full"
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Aucun document trouvé</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedType !== 'all' || selectedNiveau !== 'all'
                  ? "Aucun document ne correspond à vos critères de recherche."
                  : "Aucun document n'a encore été téléversé."
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DocumentsCoursPage;