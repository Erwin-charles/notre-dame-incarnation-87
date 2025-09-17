import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Smartphone, Copy, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface MFASetupProps {
  onComplete?: () => void;
}

export const MFASetup: React.FC<MFASetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'enroll' | 'verify'>('enroll');
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [factorId, setFactorId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [secretCopied, setSecretCopied] = useState(false);

  const handleEnrollMFA = async () => {
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.functions.invoke('enable-mfa', {
        body: { action: 'enroll' }
      });

      if (error) throw error;

      if (data.success) {
        setQrCode(data.data.qr_code);
        setSecret(data.data.secret);
        setFactorId(data.data.id);
        setStep('verify');
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'activation de la 2FA');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyMFA = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Veuillez entrer un code à 6 chiffres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.functions.invoke('enable-mfa', {
        body: { 
          action: 'verify',
          factorId,
          code: verificationCode
        }
      });

      if (error) throw error;

      if (data.success) {
        onComplete?.();
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      setError(err.message || 'Code de vérification incorrect');
    } finally {
      setLoading(false);
    }
  };

  const copySecret = async () => {
    try {
      await navigator.clipboard.writeText(secret);
      setSecretCopied(true);
      setTimeout(() => setSecretCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy secret:', err);
    }
  };

  if (step === 'enroll') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle>Activer l'authentification à deux facteurs</CardTitle>
          <CardDescription>
            Sécurisez votre compte avec une couche de protection supplémentaire
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
            <Smartphone className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">
                Application d'authentification requise
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Installez Google Authenticator, Authy, ou une autre application TOTP
              </p>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleEnrollMFA} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Configuration...' : 'Configurer la 2FA'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Scanner le QR Code</CardTitle>
        <CardDescription>
          Utilisez votre application d'authentification pour scanner ce code
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {qrCode && (
          <div className="flex justify-center">
            <img 
              src={qrCode} 
              alt="QR Code pour 2FA" 
              className="w-48 h-48 border rounded-lg"
            />
          </div>
        )}

        {secret && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Ou saisissez ce code manuellement :
            </Label>
            <div className="flex items-center space-x-2">
              <Input 
                value={secret} 
                readOnly 
                className="font-mono text-xs"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={copySecret}
                className="shrink-0"
              >
                {secretCopied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="verification-code">
            Code de vérification à 6 chiffres
          </Label>
          <Input
            id="verification-code"
            type="text"
            placeholder="123456"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="text-center text-lg tracking-wider"
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={() => setStep('enroll')}
            className="flex-1"
          >
            Retour
          </Button>
          <Button 
            onClick={handleVerifyMFA}
            disabled={loading || verificationCode.length !== 6}
            className="flex-1"
          >
            {loading ? 'Vérification...' : 'Vérifier'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MFASetup;