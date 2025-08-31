
import { Activity, FileText } from "lucide-react";

const Header = () => {
  return (
    <header className="medical-card mb-6">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-medical-text">IntestiTrack</h1>
              <p className="text-sm text-medical-text-secondary">Suivi médical selon l'échelle de Bristol</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="medical-button-ghost">
              <FileText className="w-4 h-4 mr-2" />
              Exporter PDF
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
