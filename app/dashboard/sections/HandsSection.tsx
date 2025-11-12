import HandsNeckSection from './hands/HandsNeckSection';
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
      case "neck":
        return <HandsNeckSection />;
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
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Hand Work Details</h1>
      </div>
      {renderHandsContent()}
    </div>
  );
}
