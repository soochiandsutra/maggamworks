export default function AllOverviewContent() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <span className="text-primary">📊</span> Total Projects
          </h3>
          <p className="text-2xl font-bold text-primary">24</p>
          <p className="text-sm text-muted-foreground">This month</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <span className="text-primary">⏱️</span> Total Hours
          </h3>
          <p className="text-2xl font-bold text-primary">156.5</p>
          <p className="text-sm text-muted-foreground">Estimated time</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <span className="text-primary">💰</span> Revenue
          </h3>
          <p className="text-2xl font-bold text-primary">₹24,800</p>
          <p className="text-sm text-muted-foreground">This month</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Complete Work Overview</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Select a specific work category from the bottom navigation to see detailed time estimates.
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">📏 Size</div>
            <div className="text-muted-foreground">5.0 hrs total</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">👔 Neck</div>
            <div className="text-muted-foreground">5.3 hrs total</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">🔲 Borders</div>
            <div className="text-muted-foreground">9.0 hrs total</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">✨ Motifs</div>
            <div className="text-muted-foreground">8.5 hrs total</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">🎨 Fill Work</div>
            <div className="text-muted-foreground">13.7 hrs total</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">🔧 Others</div>
            <div className="text-muted-foreground">4.5 hrs total</div>
          </div>
        </div>
      </div>
    </div>
  );
}
