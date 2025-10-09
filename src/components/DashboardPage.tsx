import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Settings as SettingsIcon } from 'lucide-react';
import { FieldHeatmap } from './FieldHeatmap';
import { ZoneDetails } from './ZoneDetails';
import { DashboardStats } from './DashboardStats';
import { WeatherWidget } from './WeatherWidget';
import { CropConfiguration, CropData, TerrainData, ClimateData, CROP_TYPES } from './CropConfiguration';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { toast } from 'sonner@2.0.3';

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

// Données mockées pour démonstration
const mockZones: Zone[] = [
  { id: 'A1', x: 5, y: 5, width: 28, height: 28, humidity: 25, waterNeeded: 8.5, temperature: 26 },
  { id: 'A2', x: 35, y: 5, width: 28, height: 28, humidity: 65, waterNeeded: 3.2, temperature: 24 },
  { id: 'A3', x: 65, y: 5, width: 28, height: 28, humidity: 45, waterNeeded: 5.8, temperature: 25 },
  { id: 'B1', x: 5, y: 35, width: 28, height: 28, humidity: 55, waterNeeded: 4.5, temperature: 23 },
  { id: 'B2', x: 35, y: 35, width: 28, height: 28, humidity: 30, waterNeeded: 7.2, temperature: 25 },
  { id: 'B3', x: 65, y: 35, width: 28, height: 28, humidity: 88, waterNeeded: 0, temperature: 22 },
  { id: 'C1', x: 5, y: 65, width: 28, height: 28, humidity: 75, waterNeeded: 2.1, temperature: 23 },
  { id: 'C2', x: 35, y: 65, width: 28, height: 28, humidity: 40, waterNeeded: 6.3, temperature: 24 },
  { id: 'C3', x: 65, y: 65, width: 28, height: 28, humidity: 82, waterNeeded: 1.5, temperature: 22 }
];

export function DashboardPage() {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [zones, setZones] = useState<Zone[]>(mockZones);
  const [configOpen, setConfigOpen] = useState(false);

  // Configuration de la culture
  const [crop, setCrop] = useState<CropData>(CROP_TYPES[0]);
  
  // Configuration du terrain
  const [terrain, setTerrain] = useState<TerrainData>({
    type: 'montagne',
    altitude: 600,
    slope: 10,
    soilType: 'limoneux',
    drainage: 'bon'
  });

  // Configuration du climat
  const [climate, setClimate] = useState<ClimateData>({
    zone: 'montagnard',
    season: 'ete',
    avgTemperature: 24,
    avgPrecipitation: 45,
    uvIndex: 8,
    windSpeed: 15
  });

  // Calculer l'impact total sur les besoins en eau
  const calculateWaterImpact = () => {
    let impact = 1.0;
    
    // Impact terrain
    if (terrain.altitude > 1000) impact *= 1.3;
    else if (terrain.altitude > 500) impact *= 1.15;
    
    if (terrain.slope > 15) impact *= 1.25;
    else if (terrain.slope > 8) impact *= 1.1;
    
    if (terrain.drainage === 'faible') impact *= 0.85;
    else if (terrain.drainage === 'excellent') impact *= 1.2;
    
    // Impact climat
    if (climate.avgTemperature > 28) impact *= 1.4;
    else if (climate.avgTemperature > 22) impact *= 1.2;
    else if (climate.avgTemperature < 12) impact *= 0.8;
    
    if (climate.windSpeed > 20) impact *= 1.15;
    if (climate.uvIndex > 7) impact *= 1.1;
    
    return impact;
  };

  const handleZoneClick = (zone: Zone) => {
    setSelectedZone(zone);
  };

  const handleIrrigate = (zoneId: string) => {
    // Simuler le démarrage de l'irrigation
    toast.success(`Irrigation lancée pour la zone ${zoneId}`, {
      description: 'Le système d\'arrosage intelligent est en cours d\'activation.'
    });

    // Mettre à jour l'humidité de la zone (simulation)
    setTimeout(() => {
      setZones(prevZones =>
        prevZones.map(z =>
          z.id === zoneId
            ? { ...z, humidity: Math.min(85, z.humidity + 30), waterNeeded: 0 }
            : z
        )
      );
      if (selectedZone?.id === zoneId) {
        setSelectedZone(prev => prev ? { ...prev, humidity: Math.min(85, prev.humidity + 30), waterNeeded: 0 } : null);
      }
      toast.success(`Zone ${zoneId} irriguée avec succès!`);
    }, 2000);
  };

  const dryZones = zones.filter(z => z.humidity < 70).length;
  const totalWaterNeeded = zones.reduce((sum, z) => sum + z.waterNeeded, 0);

  return (
    <div className="space-y-5">
      {/* Météo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <WeatherWidget />
      </motion.div>

      {/* Configuration culture/terrain - Bouton d'accès */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <Sheet open={configOpen} onOpenChange={setConfigOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <div className="flex items-center gap-2">
                <span>{crop.icon}</span>
                <div className="text-left">
                  <p className="text-sm">{crop.name} • {terrain.type.charAt(0).toUpperCase() + terrain.type.slice(1)}</p>
                  <p className="text-xs text-muted-foreground">
                    {terrain.altitude}m • {climate.zone}
                  </p>
                </div>
              </div>
              <SettingsIcon className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Configuration du champ</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <CropConfiguration
                crop={crop}
                terrain={terrain}
                climate={climate}
                onCropChange={setCrop}
                onTerrainChange={setTerrain}
                onClimateChange={setClimate}
              />
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <DashboardStats
          totalZones={zones.length}
          dryZones={dryZones}
          totalWaterNeeded={Math.round(totalWaterNeeded * calculateWaterImpact())}
          waterSaved={1240}
        />
      </motion.div>

      {/* Carte thermique du champ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <h2>Vue thermique du champ</h2>
            </div>
            <Badge variant="outline" className="bg-white">
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></span>
              En direct
            </Badge>
          </div>
          <FieldHeatmap
            zones={zones}
            onZoneClick={handleZoneClick}
            selectedZoneId={selectedZone?.id || null}
          />
          <p className="text-xs text-muted-foreground text-center">
            Cliquez sur une zone pour voir les détails
          </p>
        </div>
      </motion.div>

      {/* Détails de la zone */}
      <AnimatePresence mode="wait">
        <ZoneDetails zone={selectedZone} onIrrigate={handleIrrigate} />
      </AnimatePresence>
    </div>
  );
}