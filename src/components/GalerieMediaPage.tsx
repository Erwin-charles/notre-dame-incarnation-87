import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Camera, Video, Search, Calendar, Tag, Play, Download, Share2, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PageParticles from './PageParticles';

interface MediaItem {
  id: string;
  titre: string;
  description?: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail_url?: string;
  date_prise?: string;
  tags?: string[];
  event_id?: string;
}

const GalerieMediaPage = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const mediaTypes = [
    { value: 'all', label: 'Tous les médias', icon: Camera },
    { value: 'photo', label: 'Photos', icon: Camera },
    { value: 'video', label: 'Vidéos', icon: Video }
  ];

  useEffect(() => {
    fetchMediaItems();
  }, []);

  useEffect(() => {
    filterMediaItems();
  }, [mediaItems, searchTerm, selectedType]);

  const fetchMediaItems = async () => {
    try {
      // Temporary mock data - media gallery table doesn't exist yet
      const mockData = [
        {
          id: '1',
          type: 'photo' as const,
          url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3',
          titre: 'Messe de Pâques 2024',
          description: 'Célébration de la résurrection',
          created_at: '2024-04-01T10:00:00Z'
        },
        {
          id: '2',
          type: 'video' as const,
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
          titre: 'Première Communion',
          description: 'Cérémonie des premières communions',
          created_at: '2024-05-15T14:00:00Z'
        }
      ];
      
      setMediaItems(mockData);
    } catch (error) {
      console.error('Erreur lors du chargement de la galerie:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger la galerie média",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterMediaItems = () => {
    let filtered = mediaItems;

    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredItems(filtered);
  };

  // Données d'exemple pour la galerie
  const exampleMediaItems: MediaItem[] = [
    {
      id: '1',
      titre: 'Messe de Noël 2024',
      description: 'Célébration de la messe de minuit avec la chorale paroissiale',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=800&h=600&fit=crop',
      thumbnail_url: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=400&h=300&fit=crop',
      date_prise: '2024-12-24',
      tags: ['noel', 'messe', 'chorale']
    },
    {
      id: '2',
      titre: 'Baptêmes du dimanche',
      description: 'Cérémonie de baptême de plusieurs enfants de la paroisse',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1589734575803-18b5b3a5e9f6?w=800&h=600&fit=crop',
      thumbnail_url: 'https://images.unsplash.com/photo-1589734575803-18b5b3a5e9f6?w=400&h=300&fit=crop',
      date_prise: '2024-12-15',
      tags: ['bapteme', 'sacrement', 'enfants']
    },
    {
      id: '3',
      titre: 'Formation des catéchistes',
      description: 'Session de formation continue pour les catéchistes de la paroisse',
      type: 'video',
      url: '#',
      thumbnail_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      date_prise: '2024-12-10',
      tags: ['formation', 'catechiste', 'education']
    },
    {
      id: '4',
      titre: 'Pèlerinage à Yamoussoukro',
      description: 'Photos du pèlerinage annuel à la Basilique Notre-Dame de la Paix',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=800&h=600&fit=crop',
      thumbnail_url: 'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=400&h=300&fit=crop',
      date_prise: '2024-11-22',
      tags: ['pelerinage', 'yamoussoukro', 'basilique']
    },
    {
      id: '5',
      titre: 'Première Communion',
      description: 'Célébration de la première communion des enfants de la catéchèse',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop',
      thumbnail_url: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop',
      date_prise: '2024-11-10',
      tags: ['communion', 'sacrement', 'catechese']
    },
    {
      id: '6',
      titre: 'Fête patronale',
      description: 'Célébration de la fête de Notre-Dame de l\'Incarnation',
      type: 'video',
      url: '#',
      thumbnail_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      date_prise: '2024-10-25',
      tags: ['fete', 'patronale', 'celebration']
    }
  ];

  const displayItems = filteredItems.length > 0 ? filteredItems : exampleMediaItems.filter(item => 
    selectedType === 'all' || item.type === selectedType
  ).filter(item => 
    !searchTerm || item.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <PageParticles count={8} />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 flex items-center justify-center">
              <Camera className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Galerie Photo & Vidéo
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Revivez les moments forts de la vie paroissiale à travers nos photos et vidéos 
              des célébrations, événements et activités communautaires.
            </p>
          </div>

          {/* Filtres et recherche */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Rechercher dans la galerie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Type de média" />
              </SelectTrigger>
              <SelectContent>
                {mediaTypes.map((type) => (
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

          {/* Grille de médias */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-all overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={item.thumbnail_url || item.url} 
                    alt={item.titre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  
                  {/* Indicateurs de type */}
                  <div className="absolute top-2 left-2">
                    {item.type === 'video' ? (
                      <Badge className="bg-red-600 hover:bg-red-700">
                        <Video className="w-3 h-3 mr-1" />
                        Vidéo
                      </Badge>
                    ) : (
                      <Badge className="bg-blue-600 hover:bg-blue-700">
                        <Camera className="w-3 h-3 mr-1" />
                        Photo
                      </Badge>
                    )}
                  </div>

                  {/* Actions au survol */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={() => setSelectedMedia(item)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>{item.titre}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            {item.type === 'video' ? (
                              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                                <Play className="w-16 h-16 text-gray-400" />
                                <p className="ml-4 text-gray-600">Lecteur vidéo à implémenter</p>
                              </div>
                            ) : (
                              <img 
                                src={item.url} 
                                alt={item.titre}
                                className="w-full h-auto rounded-lg"
                              />
                            )}
                            {item.description && (
                              <p className="text-gray-600">{item.description}</p>
                            )}
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag) => (
                                  <Badge key={tag} variant="outline">
                                    <Tag className="w-3 h-3 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            <div className="flex gap-2">
                              <Button size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Télécharger
                              </Button>
                              <Button size="sm" variant="outline">
                                <Share2 className="w-4 h-4 mr-2" />
                                Partager
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      {item.type === 'video' && (
                        <Button size="sm" variant="secondary">
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">{item.titre}</h3>
                  {item.date_prise && (
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(item.date_prise).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {item.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {displayItems.length === 0 && (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun média trouvé</h3>
              <p className="text-gray-500">
                Essayez de modifier vos critères de recherche ou revenez plus tard.
              </p>
            </div>
          )}

          {/* Statistiques */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Camera className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {displayItems.filter(item => item.type === 'photo').length}
                </h3>
                <p className="text-gray-600">Photos</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Video className="w-12 h-12 mx-auto mb-4 text-red-600" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {displayItems.filter(item => item.type === 'video').length}
                </h3>
                <p className="text-gray-600">Vidéos</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">2024</h3>
                <p className="text-gray-600">Année en cours</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalerieMediaPage;