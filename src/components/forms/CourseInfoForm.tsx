
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CourseInfoFormProps {
  formData: {
    classe: string;
    anneeSuivie: string;
    jourCours: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const CourseInfoForm = ({ formData, onInputChange }: CourseInfoFormProps) => {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Informations sur les Cours</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="classe">Classe</Label>
          <Select onValueChange={(value) => onInputChange('classe', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eveil">Éveil à la foi (3-7 ans)</SelectItem>
              <SelectItem value="ce1">Catéchèse CE1</SelectItem>
              <SelectItem value="ce2">Catéchèse CE2</SelectItem>
              <SelectItem value="cm1">Catéchèse CM1</SelectItem>
              <SelectItem value="cm2">Catéchèse CM2</SelectItem>
              <SelectItem value="6eme">Catéchèse 6ème</SelectItem>
              <SelectItem value="aumonerie">Aumônerie (Collège/Lycée)</SelectItem>
              <SelectItem value="adulte">Catéchuménat Adulte</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="anneeSuivie">Année suivie</Label>
          <Select onValueChange={(value) => onInputChange('anneeSuivie', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1ere">1ère année</SelectItem>
              <SelectItem value="2eme">2ème année</SelectItem>
              <SelectItem value="3eme">3ème année</SelectItem>
              <SelectItem value="4eme">4ème année</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="jourCours">Jour de cours</Label>
          <Select onValueChange={(value) => onInputChange('jourCours', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mercredi">Mercredi</SelectItem>
              <SelectItem value="samedi">Samedi</SelectItem>
              <SelectItem value="dimanche">Dimanche</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CourseInfoForm;
