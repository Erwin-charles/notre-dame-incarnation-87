
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface BaptismInfoFormProps {
  formData: {
    estBaptise: boolean;
    dateBapteme: Date | undefined;
  };
  onInputChange: (field: string, value: any) => void;
}

const BaptismInfoForm = ({ formData, onInputChange }: BaptismInfoFormProps) => {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Informations sur le Baptême</h3>
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox
          id="estBaptise"
          checked={formData.estBaptise}
          onCheckedChange={(checked) => onInputChange('estBaptise', checked)}
        />
        <Label htmlFor="estBaptise">J'ai été baptisé(e) enfant</Label>
      </div>

      {formData.estBaptise && (
        <div>
          <Label>Date de Baptême</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dateBapteme ? (
                  format(formData.dateBapteme, "PPP", { locale: fr })
                ) : (
                  <span>Sélectionner une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.dateBapteme}
                onSelect={(date) => onInputChange('dateBapteme', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default BaptismInfoForm;
