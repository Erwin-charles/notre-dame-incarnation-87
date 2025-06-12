
import { QrCode } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface QRCodeComponentProps {
  url: string;
  title?: string;
  description?: string;
}

const QRCodeComponent = ({ url, title = "Accès rapide", description = "Scannez pour ouvrir" }: QRCodeComponentProps) => {
  // Générer l'URL du QR code avec un service en ligne
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
          <img 
            src={qrCodeUrl} 
            alt={`QR Code pour ${url}`}
            className="w-48 h-48 mx-auto"
            onError={(e) => {
              // Fallback en cas d'erreur de chargement
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          {/* Fallback QR code simulé */}
          <div className="w-48 h-48 bg-black relative hidden">
            <div className="absolute inset-1 bg-white"></div>
            <div className="absolute inset-0 grid grid-cols-8 gap-0">
              {Array.from({ length: 64 }, (_, i) => (
                <div
                  key={i}
                  className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} ${
                    i < 8 || i >= 56 || i % 8 === 0 || i % 8 === 7 ? 'bg-black' : ''
                  }`}
                />
              ))}
            </div>
            {/* Coins de positionnement */}
            <div className="absolute top-0 left-0 w-6 h-6 bg-black">
              <div className="absolute inset-1 bg-white">
                <div className="absolute inset-1 bg-black"></div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-6 h-6 bg-black">
              <div className="absolute inset-1 bg-white">
                <div className="absolute inset-1 bg-black"></div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-6 h-6 bg-black">
              <div className="absolute inset-1 bg-white">
                <div className="absolute inset-1 bg-black"></div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">{url}</p>
      </CardContent>
    </Card>
  );
};

export default QRCodeComponent;
