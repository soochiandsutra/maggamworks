import BackNeckSection from './back/BackNeckSection';
import BackBordersSection from './back/BackBordersSection';
import BackMotifsSection from './back/BackMotifsSection';
import BackFillWorkSection from './back/BackFillWorkSection';
import BackOthersSection from './back/BackOthersSection';
import BackOverviewSection from './back/BackOverviewSection';

interface BackSectionProps {
  activeSecondaryTab?: string;
}

export default function BackSection({ activeSecondaryTab }: BackSectionProps) {
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
      <h1 className="text-2xl font-bold mb-4">Back Work Details</h1>
      <p className="text-muted-foreground mb-6">
        Back panel stitching and decorative work specifications. {activeSecondaryTab ? `Viewing: ${activeSecondaryTab}` : 'Select a category below'}
      </p>
      {renderBackContent()}
    </div>
  );
}
