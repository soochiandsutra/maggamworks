import BackNeckSection from './back/BackNeckSection';
import BackBordersSection from './back/BackBordersSection';
import BackMotifsSection from './back/BackMotifsSection';
import BackFillWorkSection from './back/BackFillWorkSection';
import BackOthersSection from './back/BackOthersSection';
import BackOverviewSection from './back/BackOverviewSection';
import { useAppStateStore } from '@/lib/store/appState';
import { Button } from '@/components/ui/button';

interface BackSectionProps {
  activeSecondaryTab?: string;
}

export default function BackSection({ activeSecondaryTab }: BackSectionProps) {
  const { applyAllSettingsToBack } = useAppStateStore();

  const renderBackContent = () => {
    switch (activeSecondaryTab) {
      case "neck":
        return <BackNeckSection />;
      case "borders":
        return <BackBordersSection />;
      case "motifs":
        return <BackMotifsSection />;
      case "fill-work":
        return <BackFillWorkSection />;
      case "others":
        return <BackOthersSection />;
      default:
        return <BackOverviewSection />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Back Work Details</h1>
          <p className="text-muted-foreground">
            Back panel stitching and decorative work specifications. {activeSecondaryTab ? `Viewing: ${activeSecondaryTab}` : 'Select a category below'}
          </p>
        </div>
        <Button
          onClick={applyAllSettingsToBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <span>📋</span>
          Apply Global Settings
        </Button>
      </div>
      {renderBackContent()}
    </div>
  );
}
