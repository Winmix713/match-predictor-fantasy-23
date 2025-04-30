
import React from 'react';
import { CircularProgressChart } from '@/components/football/CircularProgressChart';
import type { Team } from '@/types/football';

interface TeamStats {
  wins: number;
  draws: number;
  losses: number;
  points: number;
  position: number;
  form: ('W' | 'D' | 'L')[];
  rating: number;
}

interface TeamCardWithStatsProps {
  team: Team;
  stats: TeamStats;
  className?: string;
}

export const TeamCardWithStats: React.FC<TeamCardWithStatsProps> = ({ team, stats, className }) => {
  return (
    <div className={`bg-gray-900/70 rounded-xl overflow-hidden border border-gray-800 ${className}`}>
      <div className="p-5">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            {team.logo ? (
              <img src={team.logo} alt={team.name} className="h-12 w-12 object-contain" />
            ) : (
              <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: team.color || '#2196f3' }}>
                <span className="text-lg font-bold text-white">{team.name.charAt(0)}</span>
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-white">{team.name}</h3>
              <div className="text-sm text-gray-400">{team.city}, {team.country}</div>
            </div>
          </div>
          <div className="text-3xl font-bold text-white">{stats.points}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-black/20 rounded-lg p-3 flex flex-col items-center">
            <span className="text-sm text-gray-400">Wins</span>
            <span className="text-xl font-bold text-green-500">{stats.wins}</span>
          </div>
          
          <div className="bg-black/20 rounded-lg p-3 flex flex-col items-center">
            <span className="text-sm text-gray-400">Draws</span>
            <span className="text-xl font-bold text-yellow-500">{stats.draws}</span>
          </div>
          
          <div className="bg-black/20 rounded-lg p-3 flex flex-col items-center">
            <span className="text-sm text-gray-400">Losses</span>
            <span className="text-xl font-bold text-red-500">{stats.losses}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-400 mb-2">Recent form</div>
            <div className="flex gap-1">
              {stats.form.map((result, i) => {
                const bgColor = result === 'W' ? 'bg-green-500' : 
                                result === 'D' ? 'bg-yellow-500' : 'bg-red-500';
                return (
                  <div 
                    key={i} 
                    className={`h-6 w-6 ${bgColor} rounded-full flex items-center justify-center`}
                  >
                    <span className="text-xs font-bold text-white">{result}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <CircularProgressChart 
              percentage={stats.rating} 
              size={80} 
              color={team.color || '#2196f3'} 
              value={stats.rating}
              label="Team rating"
            />
          </div>
        </div>
      </div>
      
      <div 
        className="py-3 px-5 text-center font-medium text-white"
        style={{ backgroundColor: team.color ? `${team.color}30` : 'rgba(33, 150, 243, 0.2)' }}
      >
        League position: #{stats.position}
      </div>
    </div>
  );
};
