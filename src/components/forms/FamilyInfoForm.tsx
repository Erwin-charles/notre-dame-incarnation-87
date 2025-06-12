
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FamilyInfoFormProps {
  formData: {
    nomPere: string;
    nomMere: string;
    nomParrain: string;
    nomMarraine: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const FamilyInfoForm = ({ formData, onInputChange }: FamilyInfoFormProps) => {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Informations Familiales</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nomPere">Nom du Père</Label>
          <Input
            id="nomPere"
            value={formData.nomPere}
            onChange={(e) => onInputChange('nomPere', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="nomMere">Nom de la Mère</Label>
          <Input
            id="nomMere"
            value={formData.nomMere}
            onChange={(e) => onInputChange('nomMere', e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor="nomParrain">Nom du Parrain</Label>
          <Input
            id="nomParrain"
            value={formData.nomParrain}
            onChange={(e) => onInputChange('nomParrain', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="nomMarraine">Nom de la Marraine</Label>
          <Input
            id="nomMarraine"
            value={formData.nomMarraine}
            onChange={(e) => onInputChange('nomMarraine', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FamilyInfoForm;
