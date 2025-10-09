import { motion } from 'motion/react';
import { MapPin, TrendingUp, Droplets, AlertCircle, ChevronRight, Mountain } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface Field {
  id: string;
  name: string;
  area: number;
  crop: string;
  cropIcon: string;
  status: 'good' | 'warning' | 'critical';
  humidity: number;
  lastIrrigation: string;
  waterNeeded: number;
  terrain: string;
  altitude: number;
  climate: string;
}

const mockFields: Field[] = [
  {
    id: '1',
    name: 'Champ Principal',
    area: 2.4,
    crop: 'Maïs',
    cropIcon: '🌽',
    status: 'warning',
    humidity: 55,
    lastIrrigation: 'Il y a 3 jours',
    waterNeeded: 450,
    terrain: 'Montagne',
    altitude: 600,
    climate: 'Montagnard'
  },
  {
    id: '2',
    name: 'Champ Nord',
    area: 1.8,
    crop: 'Blé',
    cropIcon: '🌾',
    status: 'good',
    humidity: 78,
    lastIrrigation: 'Il y a 1 jour',
    waterNeeded: 120,
    terrain: 'Colline',
    altitude: 300,
    climate: 'Océanique'
  },
  {
    id: '3',
    name: 'Parcelle Est',
    area: 3.2,
    crop: 'Tournesol',
    cropIcon: '🌻',
    status: 'critical',
    humidity: 32,
    lastIrrigation: 'Il y a 5 jours',
    waterNeeded: 680,
    terrain: 'Plaine',
    altitude: 100,
    climate: 'Méditerranéen'
  },
  {
    id: '4',
    name: 'Champ Sud',
    area: 2.1,
    crop: 'Soja',
    cropIcon: '🫘',
    status: 'good',
    humidity: 82,
    lastIrrigation: 'Aujourd\'hui',
    waterNeeded: 0,
    terrain: 'Vallée',
    altitude: 200,
    climate: 'Continental'
  }
];

interface FieldsPageProps {
  onFieldSelect: (fieldId: string) => void;
}

export function FieldsPage({ onFieldSelect }: FieldsPageProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'good': return 'Optimal';
      case 'warning': return 'Attention';
      case 'critical': return 'Critique';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="space-y-4">
      {/* Statistiques globales */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">Total</span>
            <span className="text-2xl text-primary">{mockFields.length}</span>
            <span className="text-xs text-muted-foreground">champs</span>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-accent/20 to-accent/10 border-accent/30">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">Surface</span>
            <span className="text-2xl text-accent">
              {mockFields.reduce((sum, f) => sum + f.area, 0).toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">hectares</span>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-50/50 border-orange-200/50">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">Alertes</span>
            <span className="text-2xl text-orange-600">
              {mockFields.filter(f => f.status === 'critical' || f.status === 'warning').length}
            </span>
            <span className="text-xs text-muted-foreground">actives</span>
          </div>
        </Card>
      </div>

      {/* Liste des champs */}
      <div className="space-y-3">
        <h2 className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Mes champs
        </h2>

        {mockFields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              onClick={() => onFieldSelect(field.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{field.cropIcon}</span>
                    <h3>{field.name}</h3>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(field.status)}`}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">{field.crop} • {field.area} ha</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Mountain className="w-3 h-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      {field.terrain} {field.altitude}m • {field.climate}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Humidité</p>
                  <div className="flex items-center gap-1">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">{field.humidity}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Statut</p>
                  <span className="text-sm">{getStatusLabel(field.status)}</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Eau</p>
                  <span className="text-sm">{field.waterNeeded}L</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Dernier arrosage: {field.lastIrrigation}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}