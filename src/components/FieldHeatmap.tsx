import { useState } from 'react';
import { motion } from 'motion/react';

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

interface FieldHeatmapProps {
  zones: Zone[];
  onZoneClick: (zone: Zone) => void;
  selectedZoneId: string | null;
}

export function FieldHeatmap({ zones, onZoneClick, selectedZoneId }: FieldHeatmapProps) {
  const getColor = (humidity: number) => {
    // Caméra thermique: rouge = sec, jaune = moyen, vert = humide
    if (humidity < 30) return '#FF4444'; // Rouge - très sec
    if (humidity < 50) return '#FF8844'; // Orange - sec
    if (humidity < 70) return '#FFCC44'; // Jaune - moyen
    if (humidity < 85) return '#88DD44'; // Vert clair - bon
    return '#44DD88'; // Vert - très humide
  };

  return (
    <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl">
      {/* Grille de fond */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Zones thermiques */}
      <svg className="absolute inset-0 w-full h-full">
        {zones.map((zone) => (
          <motion.g
            key={zone.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <rect
              x={`${zone.x}%`}
              y={`${zone.y}%`}
              width={`${zone.width}%`}
              height={`${zone.height}%`}
              fill={getColor(zone.humidity)}
              opacity={selectedZoneId === zone.id ? 0.9 : 0.7}
              onClick={() => onZoneClick(zone)}
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              stroke={selectedZoneId === zone.id ? '#ffffff' : 'transparent'}
              strokeWidth={selectedZoneId === zone.id ? '3' : '0'}
            />
            {/* Effet de pulsation pour zone sélectionnée */}
            {selectedZoneId === zone.id && (
              <motion.rect
                x={`${zone.x}%`}
                y={`${zone.y}%`}
                width={`${zone.width}%`}
                height={`${zone.height}%`}
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                opacity={0.5}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.g>
        ))}
      </svg>

      {/* Légende */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#44DD88' }}></div>
            <span className="text-xs">Très humide</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#88DD44' }}></div>
            <span className="text-xs">Bon</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FFCC44' }}></div>
            <span className="text-xs">Moyen</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FF8844' }}></div>
            <span className="text-xs">Sec</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FF4444' }}></div>
            <span className="text-xs">Très sec</span>
          </div>
        </div>
      </div>

      {/* Indicateur de scan */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div
          className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ y: ['0%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}
