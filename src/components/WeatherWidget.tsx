import { motion } from 'motion/react';
import { Cloud, CloudRain, Droplets, Wind, Sun, Thermometer } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function WeatherWidget() {
  const forecast = [
    { day: 'Auj.', temp: 24, icon: Sun, precipitation: 0 },
    { day: 'Dem.', temp: 22, icon: Cloud, precipitation: 20 },
    { day: 'Sam.', temp: 19, icon: CloudRain, precipitation: 80 },
    { day: 'Dim.', temp: 21, icon: Cloud, precipitation: 30 }
  ];

  return (
    <Card className="p-5 bg-gradient-to-br from-primary to-primary/90 text-white border-none shadow-lg">
      <div className="space-y-4">
        {/* Météo actuelle */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/80 text-sm mb-1">Aujourd'hui</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl">24°C</span>
              <Sun className="w-8 h-8 text-yellow-300" />
            </div>
            <p className="text-white/80 text-sm mt-2">Ensoleillé</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm mb-2">
              <Droplets className="w-4 h-4" />
              <span>45%</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Wind className="w-4 h-4" />
              <span>12 km/h</span>
            </div>
          </div>
        </div>

        {/* Prévisions */}
        <div className="flex gap-3 pt-3 border-t border-white/20">
          {forecast.map((day, index) => (
            <motion.div
              key={day.day}
              className="flex-1 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <p className="text-xs text-white/70 mb-2">{day.day}</p>
              <day.icon className="w-5 h-5 mx-auto mb-1 text-white/80" />
              <p className="text-sm">{day.temp}°</p>
              {day.precipitation > 0 && (
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Droplets className="w-3 h-3 text-white/70" />
                  <span className="text-xs text-white/70">{day.precipitation}%</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}