
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Book, Cross, Gift, Plus, Minus } from 'lucide-react';
import PageParticles from './PageParticles';
import PaymentSection from './PaymentSection';
import { useToast } from '@/hooks/use-toast';
import libraryHero from '@/assets/library-hero.jpg';
import caritasHero from '@/assets/caritas-hero.jpg';

const LibrairieCaritasPage = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const { toast } = useToast();

  const articles = [
    {
      id: 1,
      name: "Bible de Jérusalem",
      price: 15000,
      category: "Livres",
      image: "/placeholder.svg",
      description: "Bible complète avec notes explicatives"
    },
    {
      id: 2,
      name: "Chapelet en bois d'olivier",
      price: 8000,
      category: "Objets religieux",
      image: "/placeholder.svg",
      description: "Chapelet traditionnel béni"
    },
    {
      id: 3,
      name: "Livre de prières quotidiennes",
      price: 5000,
      category: "Livres",
      image: "/placeholder.svg",
      description: "Recueil de prières pour chaque jour"
    },
    {
      id: 4,
      name: "Crucifix en bois",
      price: 12000,
      category: "Objets religieux",
      image: "/placeholder.svg",
      description: "Croix sculptée à la main"
    },
    {
      id: 5,
      name: "Missel dominical",
      price: 7000,
      category: "Livres",
      image: "/placeholder.svg",
      description: "Lectures et prières de la messe"
    },
    {
      id: 6,
      name: "Médaille miraculeuse",
      price: 3000,
      category: "Objets religieux",
      image: "/placeholder.svg",
      description: "Médaille bénie de la Vierge Marie"
    }
  ];

  const addToCart = (article: any) => {
    const existingItem = cart.find(item => item.id === article.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === article.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...article, quantity: 1 }]);
    }
    toast({
      title: "Article ajouté",
      description: `${article.name} a été ajouté au panier`,
    });
  };

  const removeFromCart = (articleId: number) => {
    setCart(cart.filter(item => item.id !== articleId));
  };

  const updateQuantity = (articleId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(articleId);
      return;
    }
    setCart(cart.map(item => 
      item.id === articleId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const getTotalCart = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Panier vide",
        description: "Ajoutez des articles avant de procéder au paiement",
        variant: "destructive"
      });
      return;
    }
    setShowPayment(true);
  };

  const handleDonation = () => {
    if (!donationAmount || parseInt(donationAmount) <= 0) {
      toast({
        title: "Montant invalide",
        description: "Veuillez saisir un montant valide pour votre don",
        variant: "destructive"
      });
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setCart([]);
    setDonationAmount('');
    toast({
      title: "Paiement réussi !",
      description: "Merci pour votre achat et votre soutien à la Caritas",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-church-light via-background to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 relative">
      <PageParticles />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Librairie & Caritas</h1>
          <p className="text-xl text-muted-foreground">Articles religieux et dons pour la solidarité</p>
        </div>

        {!showPayment ? (
          <Tabs defaultValue="articles" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="articles">Articles Religieux</TabsTrigger>
              <TabsTrigger value="cart">
                Panier ({cart.length})
              </TabsTrigger>
              <TabsTrigger value="caritas">Dons Caritas</TabsTrigger>
            </TabsList>

            <TabsContent value="articles">
              <div className="grid md:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Card key={article.id} className="glass-card border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div 
                        className="w-full h-48 rounded-lg mb-4 bg-cover bg-center flex items-center justify-center"
                        style={{
                          backgroundImage: `url(${article.category === 'Livres' ? libraryHero : caritasHero})`,
                          backgroundBlendMode: 'overlay',
                          backgroundColor: 'rgba(0,0,0,0.3)'
                        }}
                      >
                        {article.category === 'Livres' ? (
                          <Book className="w-16 h-16 text-white" />
                        ) : (
                          <Cross className="w-16 h-16 text-white" />
                        )}
                      </div>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{article.name}</CardTitle>
                        <Badge variant="secondary">{article.category}</Badge>
                      </div>
                      <CardDescription>{article.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">
                          {article.price.toLocaleString()} F
                        </span>
                        <Button onClick={() => addToCart(article)}>
                          <Plus className="w-4 h-4 mr-2" />
                          Ajouter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cart">
              <Card className="glass-card border-white/20 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Votre Panier
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Votre panier est vide</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} F / unité</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => removeFromCart(item.id)}
                            >
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center text-xl font-bold">
                          <span>Total:</span>
                          <span className="text-primary">{getTotalCart().toLocaleString()} F CFA</span>
                        </div>
                        <Button className="w-full mt-4" onClick={handleCheckout}>
                          Procéder au Paiement
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="caritas">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="glass-card border-white/20 dark:border-gray-700/20">
                  <CardHeader>
                    <CardTitle className="text-primary flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Faire un Don
                    </CardTitle>
                    <CardDescription>
                      Soutenez les actions de solidarité de la Caritas paroissiale
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Montant du don (F CFA)</label>
                      <Input
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        placeholder="Saisissez le montant"
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {[5000, 10000, 25000].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          onClick={() => setDonationAmount(amount.toString())}
                          className="text-sm"
                        >
                          {amount.toLocaleString()} F
                        </Button>
                      ))}
                    </div>

                    <Button className="w-full" onClick={handleDonation}>
                      <Gift className="w-4 h-4 mr-2" />
                      Faire ce Don
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass-card border-white/20 dark:border-gray-700/20">
                  <CardHeader>
                    <div 
                      className="w-full h-40 rounded-lg mb-4 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${caritasHero})`,
                        backgroundBlendMode: 'overlay',
                        backgroundColor: 'rgba(0,0,0,0.4)'
                      }}
                    />
                    <CardTitle className="text-primary">Actions de la Caritas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-700">Aide alimentaire</h4>
                        <p className="text-sm text-muted-foreground">Distribution hebdomadaire aux familles dans le besoin</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-700">Soutien scolaire</h4>
                        <p className="text-sm text-muted-foreground">Bourses et fournitures pour les enfants défavorisés</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-700">Soins médicaux</h4>
                        <p className="text-sm text-muted-foreground">Assistance médicale et médicaments</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-700">Urgences</h4>
                        <p className="text-sm text-muted-foreground">Aide d'urgence pour les situations critiques</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="max-w-2xl mx-auto">
            <PaymentSection
              amount={cart.length > 0 ? getTotalCart() : parseInt(donationAmount)}
              service={cart.length > 0 ? "Achat Librairie" : "Don Caritas"}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LibrairieCaritasPage;
