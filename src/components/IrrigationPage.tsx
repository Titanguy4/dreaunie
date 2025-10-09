import { motion } from 'motion/react';
import { Droplets, Clock, CheckCircle2, XCircle, Calendar, TrendingDown } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface IrrigationEvent {
  id: string;
  field: string;
  zone: string;
  date: string;
  time: string;
  amount: number;
  status: 'completed' | 'in-progress' | 'scheduled' | 'cancelled';
  duration: string;
}

const mockHistory: IrrigationEvent[] = [
  {
    id: '1',
    field: 'Champ Principal',
    zone: 'A1',
    date: "Aujourd'hui",
    time: '14:30',
    amount: 8.5,
    status: 'in-progress',
    duration: '2h 15min'
  },
  {
    id: '2',
    field: 'Champ Nord',
    zone: 'B2',
    date: "Aujourd'hui",
    time: '09:00',
    amount: 5.2,
    status: 'completed',
    duration: '1h 45min'
  },
  {
    id: '3',
    field: 'Parcelle Est',
    zone: 'C3',
    date: 'Hier',
    time: '16:20',
    amount: 12.8,
    status: 'completed',
    duration: '3h 10min'
  },
  {
    id: '4',
    field: 'Champ Sud',
    zone: 'A2',
    date: 'Il y a 2 jours',
    time: '11:00',
    amount: 6.4,
    status: 'completed',
    duration: '2h 00min'
  },
  {
    id: '5',
    field: 'Champ Principal',
    zone: 'B1',
    date: 'Demain',
    time: '08:00',
    amount: 7.2,
    status: 'scheduled',
    duration: '~2h 20min'
  }
];

export function IrrigationPage() {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { label: 'Terminé', color: 'bg-green-100 text-green-700', icon: CheckCircle2 };
      case 'in-progress':
        return { label: 'En cours', color: 'bg-blue-100 text-blue-700', icon: Clock };
      case 'scheduled':
        return { label: 'Planifié', color: 'bg-purple-100 text-purple-700', icon: Calendar };
      case 'cancelled':
        return { label: 'Annulé', color: 'bg-red-100 text-red-700', icon: XCircle };
      default:
        return { label: 'Inconnu', color: 'bg-gray-100 text-gray-700', icon: Clock };
    }
  };

  const totalWaterUsed = mockHistory
    .filter(e => e.status === 'completed')
    .reduce((sum, e) => sum + e.amount, 0);

  const inProgress = mockHistory.filter(e => e.status === 'in-progress').length;
  const scheduled = mockHistory.filter(e => e.status === 'scheduled').length;

  return (
    <div className="space-y-4">
      {/* Statistiques */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">Total</span>
            <span className="text-2xl text-primary">
              {mockHistory.reduce((sum, h) => sum + h.amount, 0).toFixed(0)}L
            </span>
            <span className="text-xs text-muted-foreground">cette semaine</span>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-accent/20 to-accent/10 border-accent/30">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">En cours</span>
            <span className="text-2xl text-accent">
              {mockHistory.filter(h => h.status === 'in-progress').length}
            </span>
            <span className="text-xs text-muted-foreground">irrigation(s)</span>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-50/50 border-green-200/50">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">Économie</span>
            <span className="text-2xl text-green-600">32%</span>
            <span className="text-xs text-muted-foreground">vs traditionnel</span>
          </div>
        </Card>
      </div>

      {/* Historique */}
      <div className="space-y-3">
        <h2 className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Historique d'irrigation
        </h2>

        {mockHistory.map((event, index) => {
          const statusConfig = getStatusConfig(event.status);
          const StatusIcon = statusConfig.icon;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4>{event.field}</h4>
                      <Badge variant="outline" className="text-xs">
                        Zone {event.zone}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {event.date} • {event.time}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${statusConfig.color} text-xs`}>
                    <StatusIcon className="w-3 h-3" />
                    <span>{statusConfig.label}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{event.amount}L/m²</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{event.duration}</span>
                    </div>
                  </div>

                  {event.status === 'scheduled' && (
                    <Button size="sm" variant="ghost" className="text-xs">
                      Modifier
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}