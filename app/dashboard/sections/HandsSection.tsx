import HandsSizeSection from './hands/HandsSizeSection';
import HandsBordersSection from './hands/HandsBordersSection';
import HandsMotifsSection from './hands/HandsMotifsSection';
import HandsFillWorkSection from './hands/HandsFillWorkSection';
import HandsOthersSection from './hands/HandsOthersSection';
import HandsOverviewSection from './hands/HandsOverviewSection';
import { useAppStateStore } from '@/lib/store/appState';
import { Button } from '@/components/ui/button';

interface HandsSectionProps {
  activeSecondaryTab?: string;
}

export default function HandsSection({ activeSecondaryTab }: HandsSectionProps) {
  const { applyAllSettingsToHands } = useAppStateStore();

  const renderHandsContent = () => {
    switch (activeSecondaryTab) {
      case "size":
        return <HandsSizeSection />;
      case "borders":
        return <HandsBordersSection />;
      case "motifs":
        return <HandsMotifsSection />;
      case "fill-work":
        return <HandsFillWorkSection />;
      case "others":
        return <HandsOthersSection />;
      default:
        return <HandsOverviewSection />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Hand Work Details</h1>
          <p className="text-muted-foreground">
            Hand stitching and finishing work specifications. {activeSecondaryTab ? `Viewing: ${activeSecondaryTab}` : 'Select a category below'}
          </p>
        </div>
        <Button
          onClick={applyAllSettingsToHands}
          variant="outline"
          className="flex items-center gap-2"
        >
          <span>📋</span>
          Apply Global Settings
        </Button>
      </div>
      {renderHandsContent()}
    </div>
  );
}
