
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PersonalInfoFormProps {
  formData: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    lieuHabitation: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const PersonalInfoForm = ({ formData, onInputChange }: PersonalInfoFormProps) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nom">Nom *</Label>
          <Input
            id="nom"
            value={formData.nom}
            onChange={(e) => onInputChange('nom', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="prenom">Prénom *</Label>
          <Input
            id="prenom"
            value={formData.prenom}
            onChange={(e) => onInputChange('prenom', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="telephone">Téléphone *</Label>
          <Input
            id="telephone"
            value={formData.telephone}
            onChange={(e) => onInputChange('telephone', e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="lieuHabitation">Lieu d'habitation</Label>
        <Input
          id="lieuHabitation"
          value={formData.lieuHabitation}
          onChange={(e) => onInputChange('lieuHabitation', e.target.value)}
        />
      </div>
    </>
  );
};

export default PersonalInfoForm;
