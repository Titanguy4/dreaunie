import { motion } from 'motion/react';
import { Wheat, Sun, Mountain, Thermometer, Wind, CloudRain } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';

export interface CropData {
  id: string;
  name: string;
  waterNeedBase: number; // L/m²/jour
  optimalHumidity: [number, number]; // [min, max] en %
  criticalHumidity: number; // Seuil critique en %
  growthStage: string;
  daysToHarvest: number;
  icon: string;
}

export interface TerrainData {
  type: 'plaine' | 'colline' | 'montagne' | 'vallee';
  altitude: number; // en mètres
  slope: number; // pente en %
  soilType: 'argileux' | 'sableux' | 'limoneux' | 'calcaire';
  drainage: 'faible' | 'moyen' | 'bon' | 'excellent';
}

export interface ClimateData {
  zone: 'mediterraneen' | 'continental' | 'oceanique' | 'montagnard';
  season: 'printemps' | 'ete' | 'automne' | 'hiver';
  avgTemperature: number;
  avgPrecipitation: number; // mm/mois
  uvIndex: number;
  windSpeed: number; // km/h
}

interface CropConfigurationProps {
  crop: CropData;
  terrain: TerrainData;
  climate: ClimateData;
  onCropChange: (crop: CropData) => void;
  onTerrainChange: (terrain: TerrainData) => void;
  onClimateChange: (climate: ClimateData) => void;
}

const CROP_TYPES: CropData[] = [
  {
    id: 'mais',
    name: 'Maïs',
    waterNeedBase: 5.5,
    optimalHumidity: [60, 80],
    criticalHumidity: 40,
    growthStage: 'Floraison',
    daysToHarvest: 45,
    icon: '🌽'
  },
  {
    id: 'ble',
    name: 'Blé',
    waterNeedBase: 3.2,
    optimalHumidity: [55, 75],
    criticalHumidity: 35,
    growthStage: 'Épiaison',
    daysToHarvest: 60,
    icon: '🌾'
  },
  {
    id: 'tournesol',
    name: 'Tournesol',
    waterNeedBase: 6.0,
    optimalHumidity: [65, 85],
    criticalHumidity: 45,
    growthStage: 'Bouton floral',
    daysToHarvest: 38,
    icon: '🌻'
  },
  {
    id: 'soja',
    name: 'Soja',
    waterNeedBase: 4.5,
    optimalHumidity: [60, 80],
    criticalHumidity: 40,
    growthStage: 'Développement',
    daysToHarvest: 52,
    icon: '🫘'
  },
  {
    id: 'pomme-terre',
    name: 'Pomme de terre',
    waterNeedBase: 4.8,
    optimalHumidity: [70, 85],
    criticalHumidity: 50,
    growthStage: 'Tubérisation',
    daysToHarvest: 28,
    icon: '🥔'
  }
];

export function CropConfiguration({ 
  crop, 
  terrain, 
  climate, 
  onCropChange, 
  onTerrainChange,
  onClimateChange 
}: CropConfigurationProps) {
  
  const getTerrainImpact = () => {
    let impact = 1.0;
    
    // Impact de l'altitude
    if (terrain.altitude > 1000) impact *= 1.3; // Évaporation plus rapide en altitude
    else if (terrain.altitude > 500) impact *= 1.15;
    
    // Impact de la pente
    if (terrain.slope > 15) impact *= 1.25; // Ruissellement important
    else if (terrain.slope > 8) impact *= 1.1;
    
    // Impact du drainage
    if (terrain.drainage === 'faible') impact *= 0.85; // Moins d'eau nécessaire
    else if (terrain.drainage === 'excellent') impact *= 1.2;
    
    return impact;
  };

  const getClimateImpact = () => {
    let impact = 1.0;
    
    // Impact de la température
    if (climate.avgTemperature > 28) impact *= 1.4;
    else if (climate.avgTemperature > 22) impact *= 1.2;
    else if (climate.avgTemperature < 12) impact *= 0.8;
    
    // Impact du vent
    if (climate.windSpeed > 20) impact *= 1.15; // Évaporation accrue
    
    // Impact UV
    if (climate.uvIndex > 7) impact *= 1.1;
    
    return impact;
  };

  const totalImpact = (getTerrainImpact() * getClimateImpact()).toFixed(2);

  return (
    <div className="space-y-4">
      {/* Culture sélectionnée */}
      <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">{crop.icon}</div>
          <div className="flex-1">
            <h3>{crop.name}</h3>
            <p className="text-sm text-muted-foreground">Stade: {crop.growthStage}</p>
          </div>
          <Badge variant="outline">{crop.daysToHarvest}j restants</Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">Besoin en eau</p>
            <p className="flex items-center gap-1">
              <CloudRain className="w-4 h-4 text-primary" />
              {crop.waterNeedBase} L/m²/jour
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Humidité optimale</p>
            <p>{crop.optimalHumidity[0]}-{crop.optimalHumidity[1]}%</p>
          </div>
        </div>
      </Card>

      {/* Sélecteur de culture */}
      <Card className="p-4">
        <Label>Type de culture</Label>
        <Select
          value={crop.id}
          onValueChange={(value) => {
            const selectedCrop = CROP_TYPES.find(c => c.id === value);
            if (selectedCrop) onCropChange(selectedCrop);
          }}
        >
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CROP_TYPES.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                <span className="flex items-center gap-2">
                  <span>{c.icon}</span>
                  <span>{c.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      {/* Configuration du terrain */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Mountain className="w-5 h-5 text-primary" />
          <h3>Configuration du terrain</h3>
        </div>

        <div className="space-y-3">
          <div>
            <Label>Type de terrain</Label>
            <Select
              value={terrain.type}
              onValueChange={(value: any) => onTerrainChange({ ...terrain, type: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plaine">Plaine</SelectItem>
                <SelectItem value="colline">Colline</SelectItem>
                <SelectItem value="montagne">Montagne</SelectItem>
                <SelectItem value="vallee">Vallée</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Altitude</Label>
              <Select
                value={terrain.altitude.toString()}
                onValueChange={(value) => onTerrainChange({ ...terrain, altitude: parseInt(value) })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100m</SelectItem>
                  <SelectItem value="300">300m</SelectItem>
                  <SelectItem value="600">600m</SelectItem>
                  <SelectItem value="1000">1000m</SelectItem>
                  <SelectItem value="1500">1500m</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Pente</Label>
              <Select
                value={terrain.slope.toString()}
                onValueChange={(value) => onTerrainChange({ ...terrain, slope: parseInt(value) })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2% (plat)</SelectItem>
                  <SelectItem value="5">5%</SelectItem>
                  <SelectItem value="10">10%</SelectItem>
                  <SelectItem value="15">15%</SelectItem>
                  <SelectItem value="20">20% (forte)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Type de sol</Label>
            <Select
              value={terrain.soilType}
              onValueChange={(value: any) => onTerrainChange({ ...terrain, soilType: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="argileux">Argileux (retient l'eau)</SelectItem>
                <SelectItem value="sableux">Sableux (drainage rapide)</SelectItem>
                <SelectItem value="limoneux">Limoneux (équilibré)</SelectItem>
                <SelectItem value="calcaire">Calcaire (filtrant)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Drainage</Label>
            <Select
              value={terrain.drainage}
              onValueChange={(value: any) => onTerrainChange({ ...terrain, drainage: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="faible">Faible</SelectItem>
                <SelectItem value="moyen">Moyen</SelectItem>
                <SelectItem value="bon">Bon</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Conditions climatiques */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sun className="w-5 h-5 text-accent" />
          <h3>Conditions climatiques</h3>
        </div>

        <div className="space-y-3">
          <div>
            <Label>Zone climatique</Label>
            <Select
              value={climate.zone}
              onValueChange={(value: any) => onClimateChange({ ...climate, zone: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mediterraneen">Méditerranéen</SelectItem>
                <SelectItem value="continental">Continental</SelectItem>
                <SelectItem value="oceanique">Océanique</SelectItem>
                <SelectItem value="montagnard">Montagnard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Thermometer className="w-4 h-4 text-orange-600" />
                <span className="text-xs text-muted-foreground">Température</span>
              </div>
              <p>{climate.avgTemperature}°C</p>
            </div>

            <div className="p-3 bg-primary/10 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <CloudRain className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Précipitations</span>
              </div>
              <p>{climate.avgPrecipitation}mm/mois</p>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Sun className="w-4 h-4 text-yellow-600" />
                <span className="text-xs text-muted-foreground">Indice UV</span>
              </div>
              <p>{climate.uvIndex}/10</p>
            </div>

            <div className="p-3 bg-cyan-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Wind className="w-4 h-4 text-cyan-600" />
                <span className="text-xs text-muted-foreground">Vent</span>
              </div>
              <p>{climate.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Impact total sur les besoins en eau */}
      <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <h3 className="mb-3">Impact sur l'irrigation</h3>
        
        <div className="space-y-2 text-sm mb-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Impact terrain:</span>
            <span className="font-medium">×{getTerrainImpact().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Impact climat:</span>
            <span className="font-medium">×{getClimateImpact().toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between">
            <span>Coefficient total:</span>
            <span className="text-lg text-primary">×{totalImpact}</span>
          </div>
        </div>

        <div className="p-3 bg-white rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Besoin réel calculé</p>
          <p className="text-xl text-primary">
            {(crop.waterNeedBase * parseFloat(totalImpact)).toFixed(1)} L/m²/jour
          </p>
        </div>
      </Card>
    </div>
  );
}

export { CROP_TYPES };