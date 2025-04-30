
import React from 'react';
import { StatsProgressBar } from './StatsProgressBar';
import { MatchStat, Match } from '@/types/football';
import { PieChartComponent } from './PieChartComponent';

interface MatchStatsDashboardProps {
  match: Match;
  stats: MatchStat[];
  possession: { home: number; away: number };
  xG: { home: number; away: number };
  shots: { home: { onTarget: number; offTarget: number }; away: { onTarget: number; offTarget: number } };
  passAccuracy: { home: number; away: number };
}

export const MatchStatsDashboard: React.FC<MatchStatsDashboardProps> = ({
  match,
  stats,
  possession,
  xG,
  shots,
  passAccuracy
}) => {
  // Prepare possession data for pie chart
  const possessionData = [
    { name: match.homeTeam.name, value: possession.home, color: match.homeTeam.color || '#ff3d41' },
    { name: match.awayTeam.name, value: possession.away, color: match.awayTeam.color || '#1E3A8A' }
  ];
  
  // Prepare shots data for pie chart
  const homeShotsData = [
    { name: 'On Target', value: shots.home.onTarget, color: '#4CAF50' },
    { name: 'Off Target', value: shots.home.offTarget, color: '#F44336' }
  ];
  
  const awayShotsData = [
    { name: 'On Target', value: shots.away.onTarget, color: '#4CAF50' },
    { name: 'Off Target', value: shots.away.offTarget, color: '#F44336' }
  ];
  
  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">Match Statistics</h2>
      
      {/* Match header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          {match.homeTeam.logo && (
            <img 
              src={match.homeTeam.logo} 
              alt={match.homeTeam.name} 
              className="w-12 h-12 object-contain" 
            />
          )}
          <span className="text-white font-semibold ml-3">{match.homeTeam.name}</span>
        </div>
        
        <div className="bg-black/30 px-4 py-2 rounded-lg">
          <span className="text-white text-xl font-bold">
            {match.homeScore !== undefined ? match.homeScore : '-'} : {match.awayScore !== undefined ? match.awayScore : '-'}
          </span>
        </div>
        
        <div className="flex items-center">
          <span className="text-white font-semibold mr-3">{match.awayTeam.name}</span>
          {match.awayTeam.logo && (
            <img 
              src={match.awayTeam.logo} 
              alt={match.awayTeam.name} 
              className="w-12 h-12 object-contain" 
            />
          )}
        </div>
      </div>
      
      {/* Main stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Key stats */}
        <div className="space-y-4">
          <div className="bg-black/20 rounded-lg p-4">
            <h3 className="text-gray-300 text-sm mb-3">Expected Goals (xG)</h3>
            <div className="flex justify-between mb-1">
              <span className="text-2xl font-bold" style={{ color: match.homeTeam.color || '#ff3d41' }}>
                {xG.home.toFixed(1)}
              </span>
              <span className="text-2xl font-bold" style={{ color: match.awayTeam.color || '#1E3A8A' }}>
                {xG.away.toFixed(1)}
              </span>
            </div>
            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-500 animate-line-growth"
                style={{ 
                  width: `${(xG.home / (xG.home + xG.away)) * 100}%`,
                  backgroundColor: match.homeTeam.color || '#ff3d41',
                }}
              />
            </div>
          </div>
          
          <div className="bg-black/20 rounded-lg p-4">
            <h3 className="text-gray-300 text-sm mb-3">Pass Accuracy</h3>
            <div className="flex justify-between">
              <div className="flex flex-col items-center flex-1">
                <span className="text-xl font-bold text-white">{passAccuracy.home}%</span>
                <span className="text-xs text-gray-400">{match.homeTeam.name}</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <span className="text-xl font-bold text-white">{passAccuracy.away}%</span>
                <span className="text-xs text-gray-400">{match.awayTeam.name}</span>
              </div>
            </div>
          </div>
          
          {/* Stats bars */}
          <div className="space-y-4">
            {stats.map((stat, index) => (
              <StatsProgressBar 
                key={index}
                stat={stat}
                homeColor={match.homeTeam.color || '#ff3d41'}
                awayColor={match.awayTeam.color || '#1E3A8A'}
              />
            ))}
          </div>
        </div>
        
        {/* Middle column - Possession */}
        <div>
          <h3 className="text-white font-medium mb-3 text-center">Possession</h3>
          <div className="flex justify-center">
            <PieChartComponent 
              data={possessionData} 
              height={220}
              innerRadius={50}
              outerRadius={80}
            />
          </div>
          <div className="flex justify-between items-center mt-4 px-6">
            <div className="text-center">
              <div 
                className="text-2xl font-bold" 
                style={{ color: match.homeTeam.color || '#ff3d41' }}
              >
                {possession.home}%
              </div>
              <div className="text-xs text-gray-400">{match.homeTeam.name}</div>
            </div>
            <div className="text-center">
              <div 
                className="text-2xl font-bold" 
                style={{ color: match.awayTeam.color || '#1E3A8A' }}
              >
                {possession.away}%
              </div>
              <div className="text-xs text-gray-400">{match.awayTeam.name}</div>
            </div>
          </div>
        </div>
        
        {/* Right column - Shots */}
        <div className="grid grid-cols-1 gap-4">
          <h3 className="text-white font-medium mb-0 text-center">Shots</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-center mb-1">
                <span className="text-sm text-gray-300">{match.homeTeam.name}</span>
              </div>
              <PieChartComponent 
                data={homeShotsData} 
                height={150}
                innerRadius={30}
                outerRadius={55}
              />
              <div className="text-center mt-2">
                <span className="text-lg font-bold text-white">
                  {shots.home.onTarget + shots.home.offTarget}
                </span>
                <span className="text-xs text-gray-400 ml-1">Total</span>
              </div>
            </div>
            
            <div>
              <div className="text-center mb-1">
                <span className="text-sm text-gray-300">{match.awayTeam.name}</span>
              </div>
              <PieChartComponent 
                data={awayShotsData} 
                height={150}
                innerRadius={30}
                outerRadius={55}
              />
              <div className="text-center mt-2">
                <span className="text-lg font-bold text-white">
                  {shots.away.onTarget + shots.away.offTarget}
                </span>
                <span className="text-xs text-gray-400 ml-1">Total</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
