
import React from 'react';
import { LineChartComponent } from './LineChartComponent';
import { BarChartComponent } from './BarChartComponent';
import { PieChartComponent } from './PieChartComponent';
import { Trophy, Users, Calendar, ArrowUpRight } from 'lucide-react';
import type { Team } from '@/types/football';

interface TeamStats {
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConceded: number;
  cleanSheets: number;
  position: number;
  points: number;
  formData: Array<{ match: string; result: 'W' | 'D' | 'L'; goalsFor: number; goalsAgainst: number }>;
  topScorers: Array<{ name: string; goals: number; color: string }>;
  resultDistribution: { home: { wins: number; draws: number; losses: number }, away: { wins: number; draws: number; losses: number } };
}

interface TeamPerformanceDashboardProps {
  team: Team;
  stats: TeamStats;
}

export const TeamPerformanceDashboard: React.FC<TeamPerformanceDashboardProps> = ({ team, stats }) => {
  // Prepare form chart data
  const formChartData = stats.formData.map(item => ({
    name: item.match,
    goalsFor: item.goalsFor,
    goalsAgainst: item.goalsAgainst,
    result: item.result
  }));
  
  // Prepare top scorers data
  const topScorersData = stats.topScorers.map(scorer => ({
    name: scorer.name,
    value: scorer.goals,
    color: scorer.color
  }));
  
  // Prepare results distribution data
  const homeResultsData = [
    { name: 'Wins', value: stats.resultDistribution.home.wins, color: '#4CAF50' },
    { name: 'Draws', value: stats.resultDistribution.home.draws, color: '#FFC107' },
    { name: 'Losses', value: stats.resultDistribution.home.losses, color: '#F44336' }
  ];
  
  const awayResultsData = [
    { name: 'Wins', value: stats.resultDistribution.away.wins, color: '#4CAF50' },
    { name: 'Draws', value: stats.resultDistribution.away.draws, color: '#FFC107' },
    { name: 'Losses', value: stats.resultDistribution.away.losses, color: '#F44336' }
  ];
  
  // Result colors
  const resultColors = {
    W: '#4CAF50',
    D: '#FFC107',
    L: '#F44336'
  };
  
  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 p-6 shadow-lg">
      {/* Team Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {team.logo && (
            <img 
              src={team.logo} 
              alt={team.name} 
              className="w-16 h-16 object-contain" 
            />
          )}
          <div>
            <h2 className="text-2xl font-bold text-white">{team.name}</h2>
            {team.country && (
              <div className="text-gray-400 flex items-center gap-1">
                <span>{team.country}</span>
                {team.city && <span>• {team.city}</span>}
              </div>
            )}
          </div>
        </div>
        <div className="bg-black/30 px-4 py-2 rounded-lg">
          <div className="text-center">
            <span className="text-gray-400 text-sm">Position</span>
            <div className="text-2xl font-bold text-white">{stats.position}</div>
          </div>
        </div>
      </div>
      
      {/* Key Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-black/30 rounded-lg p-4 flex items-center">
          <div className="rounded-full bg-blue-500/20 p-2 mr-3">
            <Trophy className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{stats.points}</div>
            <div className="text-gray-400 text-sm">Points</div>
          </div>
        </div>
        <div className="bg-black/30 rounded-lg p-4 flex items-center">
          <div className="rounded-full bg-green-500/20 p-2 mr-3">
            <ArrowUpRight className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{stats.wins}</div>
            <div className="text-gray-400 text-sm">Wins</div>
          </div>
        </div>
        <div className="bg-black/30 rounded-lg p-4 flex items-center">
          <div className="rounded-full bg-orange-500/20 p-2 mr-3">
            <Calendar className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{stats.goalsScored}</div>
            <div className="text-gray-400 text-sm">Goals</div>
          </div>
        </div>
        <div className="bg-black/30 rounded-lg p-4 flex items-center">
          <div className="rounded-full bg-purple-500/20 p-2 mr-3">
            <Users className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{stats.cleanSheets}</div>
            <div className="text-gray-400 text-sm">Clean Sheets</div>
          </div>
        </div>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-white font-semibold mb-4">Form Guide</h3>
          <LineChartComponent
            data={formChartData}
            lines={[
              { key: 'goalsFor', color: team.color || '#4CAF50', label: 'Goals For' },
              { key: 'goalsAgainst', color: '#F44336', label: 'Goals Against' }
            ]}
            height={200}
          />
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {stats.formData.map((item, index) => (
              <div 
                key={index}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: resultColors[item.result] }}
              >
                {item.result}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Top Scorers</h3>
          <BarChartComponent
            data={stats.topScorers.map(scorer => ({ name: scorer.name, goals: scorer.goals }))}
            bars={[{ key: 'goals', color: team.color || '#2196F3', label: 'Goals' }]}
            height={240}
            layout="horizontal"
          />
        </div>
      </div>
      
      {/* Results Distribution */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">Home Results</h3>
          <div className="flex justify-center">
            <PieChartComponent
              data={homeResultsData}
              height={200}
              innerRadius={50}
              outerRadius={80}
            />
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4 text-center">Away Results</h3>
          <div className="flex justify-center">
            <PieChartComponent
              data={awayResultsData}
              height={200}
              innerRadius={50}
              outerRadius={80}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
