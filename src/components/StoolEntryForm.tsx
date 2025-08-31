
import { useState } from "react";
import { Plus, Calendar, Hash, Droplets, FileText } from "lucide-react";

const StoolEntryForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 16),
    bristolType: 4,
    quantity: "moyenne",
    notes: ""
  });

  const bristolTypes = [
    { value: 1, label: "Type 1", description: "Morceaux durs séparés" },
    { value: 2, label: "Type 2", description: "Saucisse grumeleuse" },
    { value: 3, label: "Type 3", description: "Saucisse avec fissures" },
    { value: 4, label: "Type 4", description: "Saucisse lisse" },
    { value: 5, label: "Type 5", description: "Morceaux mous" },
    { value: 6, label: "Type 6", description: "Morceaux floconneux" },
    { value: 7, label: "Type 7", description: "Liquide" }
  ];

  const quantities = [
    { value: "faible", label: "Faible" },
    { value: "moyenne", label: "Moyenne" },
    { value: "abondante", label: "Abondante" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nouvelle entrée:", formData);
    // TODO: Implement Supabase submission
  };

  return (
    <div className="medical-card">
      <div className="px-6 py-4 border-b border-medical-border">
        <h2 className="text-lg font-medium text-medical-text flex items-center">
          <Plus className="w-5 h-5 mr-2 text-primary" />
          Nouvelle entrée
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date et heure */}
          <div>
            <label className="block text-sm font-medium text-medical-text mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Date et heure
            </label>
            <input
              type="datetime-local"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="medical-input w-full"
              required
            />
          </div>

          {/* Quantité */}
          <div>
            <label className="block text-sm font-medium text-medical-text mb-2">
              <Droplets className="w-4 h-4 inline mr-2" />
              Quantité
            </label>
            <select
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="medical-input w-full"
              required
            >
              {quantities.map(q => (
                <option key={q.value} value={q.value}>{q.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Type Bristol */}
        <div>
          <label className="block text-sm font-medium text-medical-text mb-3">
            <Hash className="w-4 h-4 inline mr-2" />
            Type Bristol
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {bristolTypes.map(type => (
              <label
                key={type.value}
                className={`relative flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                  formData.bristolType === type.value
                    ? 'border-primary bg-primary/5'
                    : 'border-medical-border hover:bg-muted/50'
                }`}
              >
                <input
                  type="radio"
                  name="bristolType"
                  value={type.value}
                  checked={formData.bristolType === type.value}
                  onChange={(e) => setFormData({ ...formData, bristolType: parseInt(e.target.value) })}
                  className="sr-only"
                />
                <div className={`bristol-indicator bristol-${type.value} mr-3`} />
                <div>
                  <div className="text-sm font-medium text-medical-text">{type.label}</div>
                  <div className="text-xs text-medical-text-secondary">{type.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-medical-text mb-2">
            <FileText className="w-4 h-4 inline mr-2" />
            Notes (optionnel)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="medical-input w-full h-24 resize-none"
            placeholder="Observations particulières..."
          />
        </div>

        <button type="submit" className="medical-button-primary w-full">
          <Plus className="w-4 h-4 mr-2" />
          Enregistrer l'entrée
        </button>
      </form>
    </div>
  );
};

export default StoolEntryForm;
