
import React from 'react';
import type { Player } from '@/types/football';
import { RadarChart } from './RadarChart';

interface PlayerComparisonCardProps {
  player1: Player;
  player2: Player;
  stats: {
    player1Stats: {
      pace: number;
      shooting: number;
      passing: number;
      dribbling: number;
      defending: number;
      physical: number;
      rating: number;
    };
    player2Stats: {
      pace: number;
      shooting: number;
      passing: number;
      dribbling: number;
      defending: number;
      physical: number;
      rating: number;
    };
  };
}

export const PlayerComparisonCard: React.FC<PlayerComparisonCardProps> = ({
  player1,
  player2,
  stats
}) => {
  // Convert player stats to radar format
 const player1Performance = {
  team: {
    id: player1.id,
    name: player1.name,
    color: player1.team?.color || '#ff3d41',
  },
  stats: {
    pace: stats.player1Stats.pace,
    shooting: stats.player1Stats.shooting,
    passing: stats.player1Stats.passing,
    dribbling: stats.player1Stats.dribbling,
    defending: stats.player1Stats.defending,
    physical: stats.player1Stats.physical,
    shots: 0,
    passes: 0,
    crosses: 0,
    corners: 0,
    duels: 0,
    fouls: 0,
    rating: stats.player1Stats.rating
  }
};

const player2Performance = {
  team: {
    id: player2.id,
    name: player2.name,
    color: player2.team?.color || '#1E3A8A',
  },
  stats: {
    pace: stats.player2Stats.pace,
    shooting: stats.player2Stats.shooting,
    passing: stats.player2Stats.passing,
    dribbling: stats.player2Stats.dribbling,
    defending: stats.player2Stats.defending,
    physical: stats.player2Stats.physical,
    shots: 0,
    passes: 0,
    crosses: 0,
    corners: 0,
    duels: 0,
    fouls: 0,
    rating: stats.player2Stats.rating
  }
};


  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 p-6 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-6 text-center">Player Comparison</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* Player 1 */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white mb-3">
            {player1.image ? (
              <img 
                src={player1.image} 
                alt={player1.name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: player1.team?.color || '#ff3d41' }}
              >
                {player1.name.substring(0, 1)}
              </div>
            )}
          </div>
          <h4 className="text-white font-semibold text-lg">{player1.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            {player1.team?.logo && (
              <img 
                src={player1.team.logo} 
                alt={player1.team.name}
                className="w-4 h-4 object-contain" 
              />
            )}
            <span className="text-gray-400 text-sm">{player1.team?.name}</span>
          </div>
          <div className="mt-3 bg-black/30 px-3 py-1 rounded-full">
            <span className="text-lg font-bold" style={{ color: player1.team?.color || '#ff3d41' }}>
              {stats.player1Stats.rating.toFixed(1)}
            </span>
          </div>
        </div>
        
        {/* VS */}
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center border border-white/20">
            <span className="text-white font-bold text-lg">VS</span>
          </div>
        </div>
        
        {/* Player 2 */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white mb-3">
            {player2.image ? (
              <img 
                src={player2.image} 
                alt={player2.name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: player2.team?.color || '#1E3A8A' }}
              >
                {player2.name.substring(0, 1)}
              </div>
            )}
          </div>
          <h4 className="text-white font-semibold text-lg">{player2.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            {player2.team?.logo && (
              <img 
                src={player2.team.logo} 
                alt={player2.team.name}
                className="w-4 h-4 object-contain" 
              />
            )}
            <span className="text-gray-400 text-sm">{player2.team?.name}</span>
          </div>
          <div className="mt-3 bg-black/30 px-3 py-1 rounded-full">
            <span className="text-lg font-bold" style={{ color: player2.team?.color || '#1E3A8A' }}>
              {stats.player2Stats.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Radar Chart */}
      <div className="flex justify-center">
        <RadarChart 
          performance1={player1Performance}
          performance2={player2Performance}
          size={300}
        />
      </div>
    </div>
  );
};
