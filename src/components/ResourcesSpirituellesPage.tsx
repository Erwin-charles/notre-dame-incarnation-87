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
  type_document: string;
  description: string;
  categorie: string;
  fichier_url?: string;
  image_url?: string;
  created_at: string;
  uploaded_by?: string;
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
      filtered = filtered.filter(resource => resource.type_document === selectedType);
    }

    if (searchTerm) {
      filtered = filtered.filter(resource => 
        resource.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Mock data pour la démonstration
  const mockResources: Resource[] = [
    {
      id: '1',
      titre: 'Prière du Rosaire - Guide complet',
      type_document: 'Prière',
      description: 'Guide complet pour la récitation du Rosaire avec méditations sur les mystères joyeux, douloureux, glorieux et lumineux.',
      categorie: 'Prières',
      fichier_url: '/docs/rosaire.pdf',
      created_at: '2024-01-15T00:00:00Z'
    },
    {
      id: '2',
      titre: 'Catéchisme de l\'Église Catholique - Résumé',
      type_document: 'Formation',
      description: 'Résumé des principaux enseignements du Catéchisme de l\'Église Catholique pour approfondir sa foi.',
      categorie: 'Formation',
      fichier_url: '/docs/catechisme.pdf',
      created_at: '2024-01-10T00:00:00Z'
    },
    {
      id: '3',
      titre: 'Chemin de Croix - Méditations',
      type_document: 'Prière',
      description: 'Méditations pour accompagner le chemin de croix, particulièrement appropriées pour le temps du Carême.',
      categorie: 'Prières',
      fichier_url: '/docs/chemin-croix.pdf',
      created_at: '2024-01-05T00:00:00Z'
    },
    {
      id: '4',
      titre: 'Homélie du Dimanche - Liturgie',
      type_document: 'Liturgie',
      description: 'Réflexions et commentaires sur les lectures dominicales pour nourrir la prière personnelle.',
      categorie: 'Liturgie',
      fichier_url: '/docs/homelie.pdf',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '5',
      titre: 'Cantiques et Chants Liturgiques',
      type_document: 'Musique',
      description: 'Collection de chants liturgiques pour accompagner la prière communautaire et personnelle.',
      categorie: 'Chants',
      fichier_url: '/docs/cantiques.pdf',
      created_at: '2023-12-25T00:00:00Z'
    }
  ];

  const displayResources = filteredResources.length > 0 ? filteredResources : mockResources.filter(r => 
    selectedType === 'all' || r.type_document === selectedType
  ).filter(r => 
    !searchTerm || r.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <Badge className={getTypeColor(resource.type_document)}>
                      {getTypeLabel(resource.type_document)}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(resource.created_at).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{resource.titre}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    {truncateContent(resource.description || '')}
                  </p>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <BookOpen className="w-4 h-4 mr-1" />
                      Lire
                    </Button>
                    {resource.fichier_url && (
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
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