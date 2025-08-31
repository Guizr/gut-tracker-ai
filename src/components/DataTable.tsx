
import { useState } from "react";
import { Filter, Calendar, TrendingUp } from "lucide-react";

interface StoolEntry {
  id: number;
  date: string;
  bristolType: number;
  quantity: string;
  notes?: string;
}

const DataTable = () => {
  const [dateRange, setDateRange] = useState("7d");
  
  // Mock data for demonstration
  const mockEntries: StoolEntry[] = [
    { id: 1, date: "2025-08-31T08:30", bristolType: 4, quantity: "moyenne", notes: "Normal" },
    { id: 2, date: "2025-08-30T07:45", bristolType: 3, quantity: "faible", notes: "" },
    { id: 3, date: "2025-08-29T09:15", bristolType: 4, quantity: "moyenne", notes: "Après petit-déjeuner" },
    { id: 4, date: "2025-08-28T08:00", bristolType: 5, quantity: "abondante", notes: "Légère urgence" },
    { id: 5, date: "2025-08-27T07:30", bristolType: 4, quantity: "moyenne", notes: "" },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getBristolLabel = (type: number) => `Type ${type}`;

  const getQuantityLabel = (quantity: string) => {
    const labels: Record<string, string> = {
      faible: "Faible",
      moyenne: "Moyenne",
      abondante: "Abondante"
    };
    return labels[quantity] || quantity;
  };

  // Calculate simple statistics
  const totalEntries = mockEntries.length;
  const bristolDistribution = mockEntries.reduce((acc, entry) => {
    acc[entry.bristolType] = (acc[entry.bristolType] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const mostCommonType = Object.entries(bristolDistribution)
    .sort(([,a], [,b]) => b - a)[0];

  return (
    <div className="space-y-6">
      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="medical-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold text-medical-text">{totalEntries}</p>
              <p className="text-sm text-medical-text-secondary">Entrées totales</p>
            </div>
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <div className="medical-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold text-medical-text">
                {mostCommonType ? `Type ${mostCommonType[0]}` : "—"}
              </p>
              <p className="text-sm text-medical-text-secondary">Type le plus fréquent</p>
            </div>
            <div className={`bristol-indicator bristol-${mostCommonType?.[0] || 4} w-8 h-8`} />
          </div>
        </div>

        <div className="medical-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold text-medical-text">1.2</p>
              <p className="text-sm text-medical-text-secondary">Fréquence/jour (moy.)</p>
            </div>
            <Calendar className="w-8 h-8 text-success" />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="medical-card">
        <div className="px-6 py-4 border-b border-medical-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-medical-text">Journal des entrées</h2>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-medical-text-secondary" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="medical-input text-sm"
              >
                <option value="7d">7 derniers jours</option>
                <option value="30d">30 derniers jours</option>
                <option value="90d">3 derniers mois</option>
                <option value="all">Tout</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="medical-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type Bristol</th>
                <th>Quantité</th>
                <th>Remarques</th>
              </tr>
            </thead>
            <tbody>
              {mockEntries.map(entry => (
                <tr key={entry.id} className="animate-fade-in">
                  <td className="font-mono text-sm">{formatDate(entry.date)}</td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <div className={`bristol-indicator bristol-${entry.bristolType}`} />
                      <span>{getBristolLabel(entry.bristolType)}</span>
                    </div>
                  </td>
                  <td>{getQuantityLabel(entry.quantity)}</td>
                  <td className="text-medical-text-secondary">
                    {entry.notes || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {mockEntries.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-medical-text-secondary">Aucune entrée pour la période sélectionnée</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
