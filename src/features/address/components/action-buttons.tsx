import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  onBack: () => void;
  onEdit: () => void;
}

export const ActionButtons = ({ onBack, onEdit }: ActionButtonsProps) => (
  <div className="mt-4 flex justify-end space-x-2">
    <Button variant="outline" onClick={onBack}>
      Retour
    </Button>
    <Button onClick={onEdit}>
      Modifier
    </Button>
  </div>
);
