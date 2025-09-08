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
      <h1 className="text-2xl font-bold mb-4">Front Work Details</h1>
      <p className="text-muted-foreground mb-6">
        Front panel embroidery and decoration work specifications. {activeSecondaryTab ? `Viewing: ${activeSecondaryTab}` : 'Select a category below'}
      </p>
      {renderFrontContent()}
    </div>
  );
}
