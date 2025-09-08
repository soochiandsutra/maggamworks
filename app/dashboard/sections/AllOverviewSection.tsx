import AllSizeSection from './all/AllSizeSection';
import AllNeckSection from './all/AllNeckSection';
import AllBordersSection from './all/AllBordersSection';
import AllMotifsSection from './all/AllMotifsSection';
import AllFillWorkSection from './all/AllFillWorkSection';
import AllOthersSection from './all/AllOthersSection';
import AllOverviewContent from './all/AllOverviewSection';

interface AllOverviewSectionProps {
  activeSecondaryTab?: string;
}

export default function AllOverviewSection({ activeSecondaryTab }: AllOverviewSectionProps) {
  const renderAllContent = () => {
    switch (activeSecondaryTab) {
      case "size":
        return <AllSizeSection />;
      case "neck":
        return <AllNeckSection />;
      case "borders":
        return <AllBordersSection />;
      case "motifs":
        return <AllMotifsSection />;
      case "fill-work":
        return <AllFillWorkSection />;
      case "others":
        return <AllOthersSection />;
      default:
        return <AllOverviewContent />;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Work Overview</h1>
      <p className="text-muted-foreground mb-6">
        Complete overview of all Maggam Works projects and time estimates. {activeSecondaryTab ? `Viewing: ${activeSecondaryTab}` : 'Select a category below'}
      </p>
      {renderAllContent()}
    </div>
  );
}
