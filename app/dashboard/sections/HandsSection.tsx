import HandsSizeSection from './hands/HandsSizeSection';
import HandsBordersSection from './hands/HandsBordersSection';
import HandsMotifsSection from './hands/HandsMotifsSection';
import HandsFillWorkSection from './hands/HandsFillWorkSection';
import HandsOthersSection from './hands/HandsOthersSection';
import HandsOverviewSection from './hands/HandsOverviewSection';

interface HandsSectionProps {
  activeSecondaryTab?: string;
}

export default function HandsSection({ activeSecondaryTab }: HandsSectionProps) {
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
      <h1 className="text-2xl font-bold mb-4">Hand Work Details</h1>
      <p className="text-muted-foreground mb-6">
        Hand stitching and finishing work specifications. {activeSecondaryTab ? `Viewing: ${activeSecondaryTab}` : 'Select a category below'}
      </p>
      {renderHandsContent()}
    </div>
  );
}
