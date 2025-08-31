
import { useState } from 'react';
import Header from '../components/Header';
import StoolEntryForm from '../components/StoolEntryForm';
import DataTable from '../components/DataTable';
import ChatInterface from '../components/ChatInterface';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'add' | 'view'>('add');

  return (
    <div className="min-h-screen bg-medical-bg">
      <div className="container mx-auto px-4 py-6">
        <Header />
        
        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="medical-card">
            <div className="flex">
              <button
                onClick={() => setActiveTab('add')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'add'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-medical-text-secondary hover:text-medical-text'
                }`}
              >
                Nouvelle entrée
              </button>
              <button
                onClick={() => setActiveTab('view')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'view'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-medical-text-secondary hover:text-medical-text'
                }`}
              >
                Journal & Analyse
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {activeTab === 'add' && <StoolEntryForm />}
          {activeTab === 'view' && <DataTable />}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <p className="text-sm text-medical-text-secondary">
            <strong>Avertissement médical :</strong> IntestiTrack est un outil de suivi personnel. 
            Les données collectées ne remplacent pas une consultation médicale. 
            Consultez un professionnel de santé en cas de symptômes persistants ou préoccupants.
          </p>
        </div>
      </div>

      {/* Chat Interface */}
      <ChatInterface />
    </div>
  );
};

export default Index;
