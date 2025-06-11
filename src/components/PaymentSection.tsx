
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Smartphone, QrCode, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentSectionProps {
  amount: number;
  service: string;
  onPaymentSuccess?: () => void;
}

const PaymentSection = ({ amount, service, onPaymentSuccess }: PaymentSectionProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'error'>('pending');
  const { toast } = useToast();

  const paymentMethods = [
    {
      id: 'orange',
      name: 'Orange Money',
      icon: '🟠',
      color: 'bg-orange-100 text-orange-700 border-orange-200',
      number: '+225 07 XX XX XX XX'
    },
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      icon: '🟡',
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      number: '+225 05 XX XX XX XX'
    },
    {
      id: 'wave',
      name: 'Wave',
      icon: '💙',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      number: '+225 01 XX XX XX XX'
    }
  ];

  const handlePaymentSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setShowQRCode(true);
    setPaymentStatus('processing');
    
    // Simulation du paiement après 3 secondes
    setTimeout(() => {
      setPaymentStatus('success');
      toast({
        title: "Paiement réussi !",
        description: `Votre inscription pour ${service} a été confirmée.`,
      });
      onPaymentSuccess?.();
    }, 3000);
  };

  const generateQRData = (method: string) => {
    return `paroisse-payment:${method}:${amount}:${service}:${Date.now()}`;
  };

  if (paymentStatus === 'success') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Paiement confirmé !</h3>
            <p className="text-green-600">Votre inscription pour {service} est maintenant active.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Finaliser votre inscription
        </CardTitle>
        <CardDescription>
          Montant à payer : <span className="font-semibold text-church-blue">{amount.toLocaleString()} FCFA</span> pour {service}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showQRCode ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">Choisissez votre méthode de paiement :</p>
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handlePaymentSelect(method.id)}
                className={`w-full p-4 border-2 rounded-lg transition-all hover:scale-105 ${method.color}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{method.icon}</span>
                    <div className="text-left">
                      <div className="font-semibold">{method.name}</div>
                      <div className="text-sm opacity-70">{method.number}</div>
                    </div>
                  </div>
                  <Smartphone className="w-5 h-5" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center">
            {paymentStatus === 'processing' && (
              <>
                <QrCode className="w-32 h-32 mx-auto mb-4 text-gray-400" />
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600">Code QR simulé pour :</p>
                  <Badge className="mt-2">
                    {paymentMethods.find(m => m.id === selectedMethod)?.name}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Scannez ce code QR avec votre application mobile money pour finaliser le paiement
                </p>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-church-blue"></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Traitement en cours...</p>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentSection;
