import { motion } from 'motion/react';
import { User, Bell, Droplets, Cloud, MapPin, ChevronRight, LogOut, Brain } from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { AlgorithmInfo } from './AlgorithmInfo';
import { useState } from 'react';

interface SettingItem {
  id: string;
  icon: any;
  label: string;
  description?: string;
  type: 'toggle' | 'navigation';
  value?: boolean;
}

const settingsSections = [
  {
    title: 'Compte',
    items: [
      {
        id: 'profile',
        icon: User,
        label: 'Profil',
        description: 'Jean Dupont',
        type: 'navigation' as const
      },
      {
        id: 'notifications',
        icon: Bell,
        label: 'Notifications',
        description: 'Gérer les alertes',
        type: 'navigation' as const
      }
    ]
  },
  {
    title: 'Irrigation',
    items: [
      {
        id: 'auto-irrigation',
        icon: Droplets,
        label: 'Irrigation automatique',
        description: 'Activer l\'arrosage intelligent',
        type: 'toggle' as const,
        value: true
      },
      {
        id: 'water-alerts',
        icon: Bell,
        label: 'Alertes zones sèches',
        description: 'Notifications pour zones critiques',
        type: 'toggle' as const,
        value: true
      }
    ]
  },
  {
    title: 'Données',
    items: [
      {
        id: 'weather-sync',
        icon: Cloud,
        label: 'Synchronisation météo',
        description: 'Mise à jour automatique',
        type: 'toggle' as const,
        value: true
      },
      {
        id: 'gps-tracking',
        icon: MapPin,
        label: 'Localisation précise',
        description: 'GPS haute précision',
        type: 'toggle' as const,
        value: false
      }
    ]
  },
  {
    title: 'Système',
    items: [
      {
        id: 'algorithm',
        icon: Brain,
        label: 'Algorithme d\'irrigation',
        description: 'Voir les paramètres analysés',
        type: 'navigation' as const
      }
    ]
  }
];

export function SettingsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Profil utilisateur */}
      <Card className="p-5 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h2>Jean Dupont</h2>
            <p className="text-sm text-white/80">jean.dupont@email.com</p>
            <p className="text-xs text-white/80 mt-1">Agriculteur • 4 champs</p>
          </div>
        </div>
      </Card>

      {/* Sections de paramètres */}
      {settingsSections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
        >
          <h3 className="text-muted-foreground px-1">{section.title}</h3>
          <Card className="divide-y">
            {section.items.map((item, itemIndex) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{item.label}</p>
                      {item.description && (
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      )}
                    </div>
                  </div>
                  
                  {item.type === 'toggle' ? (
                    <Switch defaultChecked={item.value} />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              );
            })}
          </Card>
        </motion.div>
      ))}

      {/* À propos */}
      <Card className="p-4">
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
            <span className="text-sm">Aide & Support</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
            <span className="text-sm">Conditions d'utilisation</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
            <span className="text-sm">Version</span>
            <span className="text-sm text-muted-foreground">1.0.0</span>
          </button>
        </div>
      </Card>

      {/* Déconnexion */}
      <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
        <LogOut className="w-5 h-5 mr-2" />
        Se déconnecter
      </Button>

      {/* Dialog pour l'information sur l'algorithme */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Algorithme d'irrigation intelligent</DialogTitle>
          </DialogHeader>
          <AlgorithmInfo />
        </DialogContent>
      </Dialog>
    </div>
  );
}