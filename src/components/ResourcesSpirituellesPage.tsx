import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Play, Download, Search, Calendar, Tag, Volume2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PageParticles from './PageParticles';

interface Resource {
  id: string;
  titre: string;
  type: string;
  contenu: string;
  date_publication: string;
  tags: string[];
  description?: string;
  type_document?: string;
  categorie?: string;
  fichier_url?: string;
  uploaded_by?: string;
  image_url?: string;
  audio_url?: string;
  video_url?: string;
  created_at: string;
}

const ResourcesSpirituellesPage = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const resourceTypes = [
    { value: 'all', label: 'Toutes les ressources', icon: BookOpen },
    { value: 'homelie', label: 'Homélies', icon: BookOpen },
    { value: 'lecture', label: 'Lectures du jour', icon: Calendar },
    { value: 'priere', label: 'Prières', icon: BookOpen },
    { value: 'chapelet', label: 'Chapelet', icon: BookOpen },
    { value: 'catechese', label: 'Catéchèse', icon: BookOpen }
  ];

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [resources, searchTerm, selectedType]);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les ressources spirituelles.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterResources = () => {
    let filtered = resources;

    if (selectedType !== 'all') {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }

    if (searchTerm) {
      filtered = filtered.filter(resource => 
        resource.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.contenu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredResources(filtered);
  };

  const getTypeLabel = (type: string) => {
    const typeObj = resourceTypes.find(t => t.value === type);
    return typeObj?.label || type;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'homelie': return 'bg-blue-100 text-blue-800';
      case 'lecture': return 'bg-green-100 text-green-800';
      case 'priere': return 'bg-purple-100 text-purple-800';
      case 'chapelet': return 'bg-pink-100 text-pink-800';
      case 'catechese': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  // Données d'exemple pour les ressources spirituelles
  const exampleResources: Resource[] = [
    {
      id: '1',
      titre: 'Homélie du 3ème Dimanche de l\'Avent',
      type: 'homelie',
      contenu: 'Mes frères et sœurs, en ce troisième dimanche de l\'Avent, nous sommes invités à la joie. Cette joie n\'est pas une émotion passagère, mais une attitude profonde de l\'âme qui trouve sa source en Dieu...',
      date_publication: '2024-12-15',
      tags: ['avent', 'joie', 'espérance'],
      audio_url: '#',
      image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      titre: 'Lecture du jour - Isaïe 61, 1-11',
      type: 'lecture',
      contenu: 'L\'Esprit du Seigneur Dieu est sur moi parce que le Seigneur m\'a consacré par l\'onction. Il m\'a envoyé annoncer la bonne nouvelle aux humbles, guérir ceux qui ont le cœur brisé...',
      date_publication: '2024-12-15',
      tags: ['isaie', 'esperance', 'liberation'],
      image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      titre: 'Prière de l\'Avent',
      type: 'priere',
      contenu: 'Seigneur Jésus, en ce temps de l\'Avent, nous préparons nos cœurs à ta venue. Aide-nous à faire silence pour t\'accueillir, à faire place à ta lumière dans nos vies...',
      date_publication: '2024-12-10',
      tags: ['avent', 'preparation', 'accueil'],
      image_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop'
    },
    {
      id: '4',
      titre: 'Le Chapelet - Mystères Joyeux',
      type: 'chapelet',
      contenu: 'Méditation sur les mystères joyeux du Rosaire : L\'Annonciation, la Visitation, la Nativité, la Présentation au Temple, le Recouvrement au Temple...',
      date_publication: '2024-12-08',
      tags: ['chapelet', 'marie', 'mysteres'],
      audio_url: '#',
      image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    },
    {
      id: '5',
      titre: 'Catéchèse sur l\'Eucharistie',
      type: 'catechese',
      contenu: 'L\'Eucharistie est le sommet et la source de la vie chrétienne. Dans ce sacrement, le Christ se donne à nous sous les espèces du pain et du vin...',
      date_publication: '2024-12-05',
      tags: ['eucharistie', 'sacrement', 'communion'],
      video_url: '#',
      image_url: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=400&h=300&fit=crop'
    }
  ];

  const displayResources = filteredResources.length > 0 ? filteredResources : exampleResources.filter(r => 
    selectedType === 'all' || r.type === selectedType
  ).filter(r => 
    !searchTerm || r.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.contenu.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <PageParticles count={10} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Ressources Spirituelles
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nourrissez votre foi avec nos homélies, lectures du jour, prières et enseignements catéchétiques.
            </p>
          </div>

          {/* Filtres et recherche */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Rechercher dans les ressources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Type de ressource" />
              </SelectTrigger>
              <SelectContent>
                {resourceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center">
                      <type.icon className="w-4 h-4 mr-2" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Grille des ressources */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                {resource.image_url && (
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img 
                      src={resource.image_url} 
                      alt={resource.titre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getTypeColor(resource.type)}>
                      {getTypeLabel(resource.type)}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(resource.date_publication).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{resource.titre}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    {truncateContent(resource.contenu)}
                  </p>

                  {resource.tags && resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <BookOpen className="w-4 h-4 mr-1" />
                      Lire
                    </Button>
                    {resource.audio_url && (
                      <Button size="sm" variant="outline">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    )}
                    {resource.video_url && (
                      <Button size="sm" variant="outline">
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {displayResources.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune ressource trouvée</h3>
              <p className="text-gray-500">
                Essayez de modifier vos critères de recherche ou revenez plus tard.
              </p>
            </div>
          )}

          {/* Section informative */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourceTypes.slice(1).map((type) => (
              <Card key={type.value} className="text-center">
                <CardContent className="pt-6">
                  <type.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold text-lg mb-2">{type.label}</h3>
                  <p className="text-gray-600 text-sm">
                    {type.value === 'homelie' && 'Enseignements du dimanche et des fêtes liturgiques'}
                    {type.value === 'lecture' && 'Lectures quotidiennes de la liturgie'}
                    {type.value === 'priere' && 'Prières pour différents moments et intentions'}
                    {type.value === 'chapelet' && 'Méditations des mystères du Rosaire'}
                    {type.value === 'catechese' && 'Enseignements sur la foi catholique'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourcesSpirituellesPage;