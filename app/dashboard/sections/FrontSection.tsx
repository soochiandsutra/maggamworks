import FrontNeckSection from './front/FrontNeckSection';
import FrontBordersSection from './front/FrontBordersSection';
import FrontMotifsSection from './front/FrontMotifsSection';
import FrontFillWorkSection from './front/FrontFillWorkSection';
import FrontOthersSection from './front/FrontOthersSection';
import FrontOverviewSection from './front/FrontOverviewSection';

interface FrontSectionProps {
  activeSecondaryTab?: string;
}

export default function FrontSection({ activeSecondaryTab }: FrontSectionProps) {

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
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Front Work Details</h1>
      </div>
      {renderFrontContent()}
    </div>
  );
}
