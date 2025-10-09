import { motion } from 'motion/react';
import { Droplets, MapPin, Thermometer, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

interface Zone {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  humidity: number;
  waterNeeded: number;
  temperature: number;
}

interface ZoneDetailsProps {
  zone: Zone | null;
  onIrrigate: (zoneId: string) => void;
}

export function ZoneDetails({ zone, onIrrigate }: ZoneDetailsProps) {
  if (!zone) {
    return (
      <Card className="p-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
          <MapPin className="w-12 h-12 mb-3 opacity-30" />
          <p>Sélectionnez une zone sur le champ</p>
        </div>
      </Card>
    );
  }

  const getHumidityStatus = (humidity: number) => {
    if (humidity < 30) return { label: 'Critique', color: 'text-red-600' };
    if (humidity < 50) return { label: 'Faible', color: 'text-orange-600' };
    if (humidity < 70) return { label: 'Moyenne', color: 'text-yellow-600' };
    if (humidity < 85) return { label: 'Bonne', color: 'text-green-600' };
    return { label: 'Optimale', color: 'text-emerald-600' };
  };

  const humidityStatus = getHumidityStatus(zone.humidity);
  const needsWater = zone.humidity < 70;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 bg-gradient-to-br from-white to-primary/5 border-2 border-primary/10">
        <div className="space-y-4">
          {/* En-tête */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Zone {zone.id}
              </h3>
              <p className="text-muted-foreground mt-1">Secteur Nord-Est</p>
            </div>
            <div className={`px-3 py-1 rounded-full bg-slate-100 ${humidityStatus.color}`}>
              {humidityStatus.label}
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Droplets className="w-4 h-4" />
                <span className="text-sm">Humidité</span>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl">{zone.humidity}%</span>
                </div>
                <Progress value={zone.humidity} className="mt-2 h-2" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Thermometer className="w-4 h-4" />
                <span className="text-sm">Température</span>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl">{zone.temperature}°C</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Sol: {zone.temperature - 2}°C</p>
              </div>
            </div>
          </div>

          {/* Recommandation d'eau */}
          {needsWater && (
            <motion.div
              className="bg-primary/10 border border-primary/30 rounded-lg p-4"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <div className="bg-primary rounded-full p-2 mt-0.5">
                  <Droplets className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-primary mb-1">Irrigation recommandée</h4>
                  <p className="text-primary/90">
                    <span className="text-xl">{zone.waterNeeded}L</span> / m²
                  </p>
                  <p className="text-sm text-primary/80 mt-1">
                    Estimation basée sur météo, type de sol et culture
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Informations additionnelles */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
            <Calendar className="w-4 h-4" />
            <span>Dernier arrosage: il y a 3 jours</span>
          </div>

          {/* Bouton d'action */}
          <Button
            onClick={() => onIrrigate(zone.id)}
            className="w-full bg-accent hover:bg-accent/90"
            size="lg"
            disabled={!needsWater}
          >
            {needsWater ? (
              <>
                <Droplets className="w-5 h-5 mr-2" />
                Lancer l'irrigation
              </>
            ) : (
              'Pas d\'irrigation nécessaire'
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}