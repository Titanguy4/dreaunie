import { motion } from 'motion/react';
import { Brain, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function AlgorithmInfo() {
  const parameters = [
    { name: 'Type de culture', value: 'Besoins en eau spécifiques', impact: 'Élevé' },
    { name: 'Stade de croissance', value: 'Floraison (max besoin)', impact: 'Élevé' },
    { name: 'Type de sol', value: 'Rétention d\'eau', impact: 'Moyen' },
    { name: 'Altitude', value: 'Évaporation accélérée', impact: 'Moyen' },
    { name: 'Pente du terrain', value: 'Ruissellement', impact: 'Moyen' },
    { name: 'Drainage', value: 'Infiltration de l\'eau', impact: 'Moyen' },
    { name: 'Zone climatique', value: 'Conditions générales', impact: 'Élevé' },
    { name: 'Température', value: 'Évapotranspiration', impact: 'Élevé' },
    { name: 'Humidité air', value: 'Évaporation', impact: 'Moyen' },
    { name: 'Vent', value: 'Dessèchement', impact: 'Moyen' },
    { name: 'UV', value: 'Stress hydrique', impact: 'Moyen' },
    { name: 'Précipitations', value: 'Apport naturel', impact: 'Élevé' },
    { name: 'Historique récoltes', value: 'Tendances passées', impact: 'Faible' },
    { name: 'Saison', value: 'Cycle naturel', impact: 'Moyen' }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Élevé':
        return 'bg-red-100 text-red-700';
      case 'Moyen':
        return 'bg-yellow-100 text-yellow-700';
      case 'Faible':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-5 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-600 rounded-full p-2">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3>Algorithme intelligent</h3>
            <p className="text-sm text-muted-foreground">Analyse multi-paramètres</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <p className="text-sm mb-3">
            Notre algorithme d'irrigation intelligente analyse en temps réel{' '}
            <span className="text-purple-600">{parameters.length} paramètres différents</span>{' '}
            pour calculer précisément les besoins en eau de chaque zone de votre champ.
          </p>
          
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span>Économie d'eau jusqu'à 40%</span>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="mb-4">Paramètres analysés</h3>
        <div className="space-y-3">
          {parameters.map((param, index) => (
            <motion.div
              key={param.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{param.name}</span>
                  <Badge className={`text-xs ${getImpactColor(param.impact)}`}>
                    {param.impact}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{param.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card className="p-5 bg-gradient-to-br from-green-50 to-emerald-50">
        <h4 className="mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Avantages
        </h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-green-600">•</span>
            <span>Irrigation ciblée uniquement sur les zones qui en ont besoin</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600">•</span>
            <span>Adaptation automatique selon l'altitude et le terrain</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600">•</span>
            <span>Prise en compte des besoins spécifiques de chaque culture</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600">•</span>
            <span>Optimisation selon les conditions climatiques locales</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600">•</span>
            <span>Réduction de la consommation d'eau et des coûts</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
