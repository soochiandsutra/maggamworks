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
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Back Work Details</h1>
      </div>
      {renderBackContent()}
    </div>
  );
}
