
import React from 'react';
import { Trophy, Star, TrendingUp } from 'lucide-react';
import type { Player } from '@/types/football';

interface PlayerProfileCardProps {
  player: Player;
  team?: string;
  number: number;
  stats: {
    rating: number;
    mainStat: number;
    secondaryStat: number;
    tertiaryStats: { value: number; label: string }[];
  };
  className?: string;
}

export const PlayerProfileCard: React.FC<PlayerProfileCardProps> = ({
  player,
  team,
  number,
  stats,
  className,
}) => {
  return (
    <div className={`bg-gray-900/70 rounded-2xl overflow-hidden shadow-lg ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Player info section */}
        <div className="p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            {player.team?.logo && (
              <img src={player.team.logo} alt={player.team?.name} className="h-10 w-10 rounded-full" />
            )}
            <div>
              <h2 className="text-2xl font-bold text-white">{player.name}</h2>
              <div className="text-sm text-gray-400">{team || player.team?.name}</div>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <div className="text-5xl font-bold mr-4 text-yellow-400">{number}</div>
            <div className="bg-yellow-400 text-black font-medium px-3 py-1 rounded text-sm">TEAM NUMBER</div>
          </div>

          {/* Stats display */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="flex flex-col items-center justify-center bg-black/30 rounded-xl p-3">
              <div className="text-sm text-gray-400">Rating</div>
              <div className="text-xl font-bold text-white flex items-center gap-1">
                {stats.rating}
                <Star className="h-4 w-4 text-yellow-400 ml-1" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-black/30 rounded-xl p-3">
              <div className="text-sm text-gray-400">Goals</div>
              <div className="text-xl font-bold text-white">{stats.mainStat}</div>
            </div>
            <div className="flex flex-col items-center justify-center bg-black/30 rounded-xl p-3">
              <div className="text-sm text-gray-400">Assists</div>
              <div className="text-xl font-bold text-white">{stats.secondaryStat}</div>
            </div>
          </div>

          {/* Performance bars */}
          <div className="space-y-3">
            {stats.tertiaryStats.map((stat, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{stat.label}</span>
                  <span className="text-white font-medium">{stat.value}%</span>
                </div>
                <div className="h-2 w-full bg-black/30 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      stat.value > 80 ? 'bg-green-500' : 
                      stat.value > 60 ? 'bg-blue-500' : 
                      stat.value > 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Player image section */}
        <div className="relative h-full min-h-[350px] flex items-center justify-center overflow-hidden player-card">
          {player.image ? (
            <img 
              src={player.image} 
              alt={player.name} 
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <TrendingUp size={64} className="text-gray-700" />
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">{player.position}</div>
                <div className="text-xl font-bold text-white">{player.name}</div>
              </div>
              
              {number && (
                <div className="text-3xl font-bold text-yellow-400">{number}</div>
              )}
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 bg-yellow-400/20 backdrop-blur-sm rounded-full p-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
