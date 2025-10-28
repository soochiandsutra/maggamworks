import FrontNeckSection from './front/FrontNeckSection';
import FrontBordersSection from './front/FrontBordersSection';
import FrontMotifsSection from './front/FrontMotifsSection';
import FrontFillWorkSection from './front/FrontFillWorkSection';
import FrontOthersSection from './front/FrontOthersSection';
import FrontOverviewSection from './front/FrontOverviewSection';
import { useAppStateStore } from '@/lib/store/appState';
import { Button } from '@/components/ui/button';

interface FrontSectionProps {
  activeSecondaryTab?: string;
}

export default function FrontSection({ activeSecondaryTab }: FrontSectionProps) {
  const { applyAllSettingsToFront } = useAppStateStore();

  const renderFrontContent = () => {
    switch (activeSecondaryTab) {
      case "neck":
        return <FrontNeckSection />;
      case "borders":
        return <FrontBordersSection />;
      case "motifs":
        return <FrontMotifsSection />;
      case "fill-work":
        return <FrontFillWorkSection />;
      case "others":
        return <FrontOthersSection />;
      default:
        return <FrontOverviewSection />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Front Work Details</h1>
          <p className="text-muted-foreground">
            Front panel embroidery and decoration work specifications. {activeSecondaryTab ? `Viewing: ${activeSecondaryTab}` : 'Select a category below'}
          </p>
        </div>
        <Button
          onClick={applyAllSettingsToFront}
          variant="outline"
          className="flex items-center gap-2"
        >
          <span>📋</span>
          Apply Global Settings
        </Button>
      </div>
      {renderFrontContent()}
    </div>
  );
}
