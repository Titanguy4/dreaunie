import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, MapPin, Activity, Settings, Bell, Droplets } from 'lucide-react';
import { DashboardPage } from './components/DashboardPage';
import { FieldsPage } from './components/FieldsPage';
import { IrrigationPage } from './components/IrrigationPage';
import { SettingsPage } from './components/SettingsPage';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Toaster } from './components/ui/sonner';
import logo from 'figma:asset/a2c82105d0d1c95c280eb83099ba7162354bfdb1.png';

type Page = 'dashboard' | 'fields' | 'irrigation' | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  
  const dryZones = 5; // Cette valeur pourrait venir du contexte global

  const handleFieldSelect = (fieldId: string) => {
    // Quand on sélectionne un champ, on va au dashboard
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'fields':
        return <FieldsPage onFieldSelect={handleFieldSelect} />;
      case 'irrigation':
        return <IrrigationPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return { title: 'Tableau de bord', subtitle: 'Champ Principal - 2.4 ha' };
      case 'fields':
        return { title: 'Mes champs', subtitle: '4 champs • 9.5 hectares' };
      case 'irrigation':
        return { title: 'Irrigation', subtitle: 'Historique et planification' };
      case 'settings':
        return { title: 'Paramètres', subtitle: 'Configuration de l\'application' };
      default:
        return { title: 'Dreaunie', subtitle: '' };
    }
  };

  const pageInfo = getPageTitle();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-green-50/20 to-slate-50">
      <Toaster />
      
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-10 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Dreaunie" className="w-10 h-10 object-contain" />
              <div>
                <h1 className="flex items-center gap-2 text-primary">
                  Dreaunie
                </h1>
                <p className="text-xs text-muted-foreground">{pageInfo.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {dryZones > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                    {dryZones}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-5 pb-20 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-primary/10 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            <Button
              variant="ghost"
              className={`flex-col h-auto py-2 ${currentPage === 'dashboard' ? 'text-primary' : ''}`}
              onClick={() => setCurrentPage('dashboard')}
            >
              <Activity className={`w-5 h-5 mb-1 ${currentPage === 'dashboard' ? 'text-primary' : ''}`} />
              <span className="text-xs">Tableau de bord</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex-col h-auto py-2 ${currentPage === 'fields' ? 'text-primary' : ''}`}
              onClick={() => setCurrentPage('fields')}
            >
              <MapPin className={`w-5 h-5 mb-1 ${currentPage === 'fields' ? 'text-primary' : ''}`} />
              <span className="text-xs">Champs</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex-col h-auto py-2 ${currentPage === 'irrigation' ? 'text-accent' : ''}`}
              onClick={() => setCurrentPage('irrigation')}
            >
              <Droplets className={`w-5 h-5 mb-1 ${currentPage === 'irrigation' ? 'text-accent' : ''}`} />
              <span className="text-xs">Irrigation</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex-col h-auto py-2 ${currentPage === 'settings' ? 'text-primary' : ''}`}
              onClick={() => setCurrentPage('settings')}
            >
              <Settings className={`w-5 h-5 mb-1 ${currentPage === 'settings' ? 'text-primary' : ''}`} />
              <span className="text-xs">Paramètres</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}