
import React from 'react';
import { LineChartComponent } from './LineChartComponent';
import { CircularProgressChart } from './CircularProgressChart';
import type { Player } from '@/types/football';

interface PlayerStat {
  label: string;
  value: number;
  maxValue: number;
}

interface EnhancedPlayerCardProps {
  player: Player;
  number?: number;
  position?: string;
  stats: {
    rating: number;
    mainStat: number;
    mainStatLabel: string;
    secondaryStat: number;
    secondaryStatLabel: string;
    detailedStats: PlayerStat[];
    formData: Array<{ match: string; rating: number }>;
  };
  teamColor?: string;
}

export const EnhancedPlayerCard: React.FC<EnhancedPlayerCardProps> = ({ 
  player, 
  number = 10, 
  position = "Forward",
  stats,
  teamColor = "#ff3d41" 
}) => {
  const formChartData = stats.formData.map(item => ({
    name: item.match,
    value: item.rating
  }));

  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden shadow-lg">
      <div className="relative">
        {/* Header with player image */}
        <div className="h-48 sm:h-56 md:h-64 overflow-hidden relative">
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"
          ></div>
          {player.image && (
            <img 
              src={player.image} 
              alt={player.name} 
              className="w-full h-full object-cover object-top"
            />
          )}
          
          <div className="absolute bottom-0 left-0 p-4 z-20 flex items-end">
            <div className="mr-4">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center" 
                style={{ backgroundColor: teamColor }}
              >
                <span className="text-3xl font-bold text-white">{number}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{player.name}</h3>
              <div className="flex items-center gap-3">
                <span className="text-gray-300">{position}</span>
                {player.team && (
                  <div className="flex items-center gap-2">
                    {player.team.logo && (
                      <img 
                        src={player.team.logo} 
                        alt={player.team.name} 
                        className="w-5 h-5 object-contain"
                      />
                    )}
                    <span className="text-gray-300">{player.team.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Left side - Circular progress and key stats */}
            <div className="space-y-4">
              <div className="flex justify-center">
                <CircularProgressChart
                  percentage={stats.rating * 10}
                  size={120}
                  strokeWidth={10}
                  color={teamColor}
                  value={stats.rating.toFixed(1)}
                  label="Rating"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <span className="block text-2xl font-bold text-white">{stats.mainStat}</span>
                  <span className="text-gray-400 text-sm">{stats.mainStatLabel}</span>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <span className="block text-2xl font-bold text-white">{stats.secondaryStat}</span>
                  <span className="text-gray-400 text-sm">{stats.secondaryStatLabel}</span>
                </div>
              </div>
            </div>
            
            {/* Right side - Stats bars */}
            <div className="space-y-3">
              {stats.detailedStats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{stat.label}</span>
                    <span>{stat.value}/{stat.maxValue}</span>
                  </div>
                  <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${(stat.value / stat.maxValue) * 100}%`,
                        backgroundColor: teamColor 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Form chart */}
          <div>
            <h4 className="text-white font-medium mb-3">Recent Form</h4>
            <LineChartComponent
              data={formChartData}
              lines={[{ key: 'value', color: teamColor, label: 'Rating' }]}
              height={120}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
