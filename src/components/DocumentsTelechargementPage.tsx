import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, 
  Upload, 
  File, 
  FileText, 
  Image, 
  Video,
  Trash2,
  Edit,
  Plus,
  Eye
} from "lucide-react";

interface Document {
  id: string;
  titre: string;
  type_document: string;
  niveau?: string;
  fichier_url: string;
  type_mime?: string;
  taille_fichier?: number;
  telechargeable: boolean;
  created_at: string;
}

const DocumentsTelechargementPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newDocument, setNewDocument] = useState({
    titre: '',
    type_document: 'cours',
    niveau: '',
    description: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents_cours')
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "Erreur",
        description: "Le fichier ne doit pas dépasser 10MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Utilisateur non connecté');

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('documents_cours')
        .insert({
          titre: newDocument.titre || file.name,
          type_document: newDocument.type_document,
          niveau: newDocument.niveau || null,
          description: newDocument.description || null,
          fichier_url: data.publicUrl,
          type_mime: file.type,
          taille_fichier: file.size,
          telechargeable: true,
          auteur_id: user.id
        });

      if (dbError) throw dbError;

      toast({
        title: "Succès",
        description: "Document téléversé avec succès",
      });

      setNewDocument({
        titre: '',
        type_document: 'cours',
        niveau: '',
        description: ''
      });

      fetchDocuments();
    } catch (error) {
      console.error('Erreur upload:', error);
      toast({
        title: "Erreur",
        description: "Impossible de téléverser le document",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (document: Document) => {
    try {
      const response = await fetch(document.fichier_url);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = document.titre;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Téléchargement lancé",
        description: `${document.titre} est en cours de téléchargement`,
      });
    } catch (error) {
      console.error('Erreur téléchargement:', error);
      toast({
        title: "Erreur",
        description: "Impossible de télécharger le document",
        variant: "destructive",
      });
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      const { error } = await supabase
        .from('documents_cours')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Document supprimé",
        description: "Le document a été supprimé avec succès",
      });

      fetchDocuments();
    } catch (error) {
      console.error('Erreur suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le document",
        variant: "destructive",
      });
    }
  };

  const getFileIcon = (type_mime?: string) => {
    if (!type_mime) return <File className="h-5 w-5" />;
    
    if (type_mime.includes('image')) return <Image className="h-5 w-5" />;
    if (type_mime.includes('video')) return <Video className="h-5 w-5" />;
    if (type_mime.includes('pdf') || type_mime.includes('document')) return <FileText className="h-5 w-5" />;
    
    return <File className="h-5 w-5" />;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Taille inconnue';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
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
        <Download className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-primary">Documents de Cours</h1>
          <p className="text-muted-foreground">Téléchargez et téléversez des documents</p>
        </div>
      </div>

      <Tabs defaultValue="download" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="download">Télécharger</TabsTrigger>
          <TabsTrigger value="upload">Téléverser</TabsTrigger>
        </TabsList>

        <TabsContent value="download" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Documents Disponibles
              </CardTitle>
              <CardDescription>
                Téléchargez les documents de cours et ressources pédagogiques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.filter(doc => doc.telechargeable).map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(document.type_mime)}
                      <div>
                        <h4 className="font-medium">{document.titre}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Badge variant="outline">{document.type_document}</Badge>
                          {document.niveau && <Badge variant="secondary">{document.niveau}</Badge>}
                          <span>{formatFileSize(document.taille_fichier)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(document)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {documents.filter(doc => doc.telechargeable).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Aucun document disponible pour le moment
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Téléverser un Document
              </CardTitle>
              <CardDescription>
                Ajoutez de nouveaux documents de cours et ressources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="titre">Titre du document</Label>
                  <Input
                    id="titre"
                    value={newDocument.titre}
                    onChange={(e) => setNewDocument({...newDocument, titre: e.target.value})}
                    placeholder="Entrez le titre du document"
                  />
                </div>
                <div>
                  <Label htmlFor="type_document">Type de document</Label>
                  <select
                    id="type_document"
                    value={newDocument.type_document}
                    onChange={(e) => setNewDocument({...newDocument, type_document: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="cours">Cours</option>
                    <option value="exercice">Exercice</option>
                    <option value="evaluation">Évaluation</option>
                    <option value="ressource">Ressource</option>
                    <option value="guide">Guide pédagogique</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="niveau">Niveau (optionnel)</Label>
                  <select
                    id="niveau"
                    value={newDocument.niveau}
                    onChange={(e) => setNewDocument({...newDocument, niveau: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Tous niveaux</option>
                    <option value="Eveil à la foi">Éveil à la foi</option>
                    <option value="CE1">CE1</option>
                    <option value="CE2">CE2</option>
                    <option value="CM1">CM1</option>
                    <option value="CM2">CM2</option>
                    <option value="6ème">6ème</option>
                    <option value="5ème">5ème</option>
                    <option value="4ème">4ème</option>
                    <option value="3ème">3ème</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="description">Description (optionnelle)</Label>
                  <Input
                    id="description"
                    value={newDocument.description}
                    onChange={(e) => setNewDocument({...newDocument, description: e.target.value})}
                    placeholder="Description du document"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="file-upload">Sélectionner un fichier</Label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="w-full px-3 py-2 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.mp4,.mp3"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Formats acceptés: PDF, DOC, PPT, Images, Vidéos, Audio (max 10MB)
                </p>
              </div>

              <Button 
                onClick={() => window.document.getElementById('file-upload')?.click()}
                disabled={uploading}
                className="w-full"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Téléversement en cours...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un document
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Liste des documents téléversés */}
          <Card>
            <CardHeader>
              <CardTitle>Mes Documents Téléversés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(document.type_mime)}
                      <div>
                        <span className="font-medium">{document.titre}</span>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Badge variant="outline">{document.type_document}</Badge>
                          {document.niveau && <Badge variant="secondary">{document.niveau}</Badge>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteDocument(document.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {documents.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    Aucun document téléversé
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentsTelechargementPage;