import { motion } from 'motion/react';
import { Droplets, AlertTriangle, CheckCircle2, TrendingDown, MapPin, AlertCircle, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';

interface DashboardStatsProps {
  totalZones: number;
  dryZones: number;
  totalWaterNeeded: number;
  waterSaved: number;
}

export function DashboardStats({ totalZones, dryZones, totalWaterNeeded, waterSaved }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Zones totales</p>
              <p className="text-2xl text-primary">{totalZones}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-50/50 border-orange-200/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Zones sèches</p>
              <p className="text-2xl text-orange-600">{dryZones}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="p-4 bg-gradient-to-br from-accent/20 to-accent/10 border-accent/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/20 rounded-lg">
              <Droplets className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Eau nécessaire</p>
              <p className="text-2xl text-accent">{totalWaterNeeded}L</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-50/50 border-green-200/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Eau économisée</p>
              <p className="text-2xl text-green-600">{waterSaved}L</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}