import React from 'react';
import { EnhancedPlayerCard } from '@/components/football/EnhancedPlayerCard';
import { PlayerComparisonCard } from '@/components/football/PlayerComparisonCard';
import { MatchTimeline } from '@/components/football/MatchTimeline';
import { TeamPerformanceDashboard } from '@/components/football/TeamPerformanceDashboard';
import { MatchHeatmap } from '@/components/football/MatchHeatmap';
import { MatchStatsDashboard } from '@/components/football/MatchStatsDashboard';
import { LineChartComponent } from '@/components/football/LineChartComponent';
import { BarChartComponent } from '@/components/football/BarChartComponent';
import { PieChartComponent } from '@/components/football/PieChartComponent';
import { AreaChartComponent } from '@/components/football/AreaChartComponent';

const FootballAnalytics: React.FC = () => {
  // Sample player data
  const player1 = {
    id: '1',
    name: 'Phil Foden',
    position: 'Attacking Midfielder',
    image: '/lovable-uploads/800840d2-8461-45d0-811c-1a3cbf2df949.png',
    team: {
      id: '1',
      name: 'Manchester City',
      logo: 'https://media.api-sports.io/football/teams/50.png',
      color: '#6CABDD'
    }
  };
  
  const player2 = {
    id: '2',
    name: 'Bruno Fernandes',
    position: 'Attacking Midfielder',
    image: 'https://media.api-sports.io/football/players/1485.png',
    team: {
      id: '2',
      name: 'Manchester United',
      logo: 'https://media.api-sports.io/football/teams/33.png',
      color: '#DA020E'
    }
  };
  
  // Sample match data
  const matchData = {
    id: '1',
    homeTeam: {
      id: '1',
      name: 'Manchester City',
      logo: 'https://media.api-sports.io/football/teams/50.png',
      color: '#6CABDD'
    },
    awayTeam: {
      id: '2',
      name: 'Liverpool',
      logo: 'https://media.api-sports.io/football/teams/40.png',
      color: '#C8102E'
    },
    homeScore: 2,
    awayScore: 1,
    date: new Date().toISOString(),
    status: 'FINISHED' as const,
    competition: {
      id: '1',
      name: 'Premier League',
      logo: 'https://media.api-sports.io/football/leagues/39.png',
    }
  } as const;
  
  // Sample match events
  const matchEvents = [
    { time: 0, type: 'start', team: 'home' },
    { time: 23, type: 'goal', team: 'home', player: 'Kevin De Bruyne', assistedBy: 'Phil Foden', description: 'Stunning long-range strike' },
    { time: 36, type: 'yellow-card', team: 'away', player: 'Virgil van Dijk', description: 'Late tackle' },
    { time: 45, type: 'half-time', team: 'home' },
    { time: 52, type: 'goal', team: 'away', player: 'Mohamed Salah', assistedBy: 'Trent Alexander-Arnold', description: 'Counter attack' },
    { time: 67, type: 'substitution', team: 'home', playerOut: 'Jack Grealish', playerIn: 'Bernardo Silva' },
    { time: 78, type: 'goal', team: 'home', player: 'Erling Haaland', assistedBy: 'Bernardo Silva', description: 'Header from corner' },
    { time: 90, type: 'end', team: 'home' },
  ];
  
  // Sample team stats
  const teamStats = {
    wins: 15,
    draws: 3,
    losses: 2,
    goalsScored: 45,
    goalsConceded: 18,
    cleanSheets: 8,
    position: 2,
    points: 48,
    formData: [
      { match: 'LEI', result: 'W' as const, goalsFor: 4, goalsAgainst: 1 },
      { match: 'NEW', result: 'W' as const, goalsFor: 2, goalsAgainst: 0 },
      { match: 'CHE', result: 'D' as const, goalsFor: 1, goalsAgainst: 1 },
      { match: 'LIV', result: 'L' as const, goalsFor: 1, goalsAgainst: 3 },
      { match: 'TOT', result: 'W' as const, goalsFor: 2, goalsAgainst: 0 },
    ],
    topScorers: [
      { name: 'Erling Haaland', goals: 15, color: '#6CABDD' },
      { name: 'Phil Foden', goals: 9, color: '#6CABDD' },
      { name: 'Kevin De Bruyne', goals: 6, color: '#6CABDD' },
      { name: 'Bernardo Silva', goals: 4, color: '#6CABDD' },
      { name: 'Julian Alvarez', goals: 3, color: '#6CABDD' },
    ],
    resultDistribution: {
      home: { wins: 8, draws: 1, losses: 1 },
      away: { wins: 7, draws: 2, losses: 1 },
    },
  };
  
  // Sample match stats
  const matchStats = [
    { type: 'Shots', home: 15, away: 8 },
    { type: 'Shots on Target', home: 7, away: 3 },
    { type: 'Corners', home: 7, away: 2 },
    { type: 'Fouls', home: 8, away: 12 },
    { type: 'Offsides', home: 2, away: 3 },
  ];
  
  // Sample match stats details
  const matchStatDetails = {
    possession: { home: 65, away: 35 },
    xG: { home: 2.3, away: 0.8 },
    shots: { 
      home: { onTarget: 7, offTarget: 8 }, 
      away: { onTarget: 3, offTarget: 5 } 
    },
    passAccuracy: { home: 91, away: 84 },
  };
  
  // Sample heatmap data
  const heatmapPoints = Array(60).fill(0).map((_, i) => ({
    x: Math.random() * 600,
    y: Math.random() * 400,
    value: Math.random() * 100,
    team: Math.random() > 0.5 ? 'home' : 'away'
  }));
  
  // Sample line chart data - updated to match expected format
  const lineChartData = [
    { name: 'Aug', value: 6, teamA: 6, teamB: 9 },
    { name: 'Sep', value: 14, teamA: 14, teamB: 15 },
    { name: 'Oct', value: 20, teamA: 20, teamB: 21 },
    { name: 'Nov', value: 26, teamA: 26, teamB: 24 },
    { name: 'Dec', value: 33, teamA: 33, teamB: 30 },
    { name: 'Jan', value: 39, teamA: 39, teamB: 36 },
    { name: 'Feb', value: 45, teamA: 45, teamB: 42 },
  ];
  
  // Sample area chart data
  const areaChartData = [
    { name: '2018', goals: 80, assists: 35, cleanSheets: 15 },
    { name: '2019', goals: 95, assists: 42, cleanSheets: 18 },
    { name: '2020', goals: 76, assists: 39, cleanSheets: 12 },
    { name: '2021', goals: 83, assists: 45, cleanSheets: 16 },
    { name: '2022', goals: 99, assists: 50, cleanSheets: 20 },
    { name: '2023', goals: 93, assists: 48, cleanSheets: 19 },
  ];
  
  // Sample pie chart data
  const pieChartData = [
    { name: 'Home Wins', value: 10, color: '#4CAF50' },
    { name: 'Away Wins', value: 7, color: '#2196F3' },
    { name: 'Draws', value: 3, color: '#FFC107' },
  ];
  
  // Sample bar chart data
  const barChartData = [
    { name: 'Man City', goals: 45, conceded: 18 },
    { name: 'Arsenal', goals: 42, conceded: 15 },
    { name: 'Liverpool', goals: 39, conceded: 20 },
    { name: 'Tottenham', goals: 35, conceded: 25 },
    { name: 'Man United', goals: 30, conceded: 28 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-black">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-white mb-2">Football Analytics Dashboard</h1>
        <p className="text-gray-400 mb-8">Advanced visualization and analysis components</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <LineChartComponent
            data={lineChartData}
            lines={[
              { key: 'teamA', color: '#1E88E5', label: 'Manchester City' },
              { key: 'teamB', color: '#E53935', label: 'Liverpool' }
            ]}
            height={300}
            title="League Points Progression"
            subtitle="2023/24 Season"
          />
          
          <AreaChartComponent
            data={areaChartData}
            areas={[
              { key: 'goals', color: '#E53935', label: 'Goals' },
              { key: 'assists', color: '#1E88E5', label: 'Assists' },
              { key: 'cleanSheets', color: '#43A047', label: 'Clean Sheets' }
            ]}
            height={300}
            title="Team Performance Trends"
            subtitle="5-Year Overview"
            stacked={false}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <PieChartComponent
            data={pieChartData}
            height={300}
            title="Result Distribution"
            subtitle="Current Season"
            innerRadius={60}
            outerRadius={100}
          />
          
          <BarChartComponent
            data={barChartData}
            bars={[
              { key: 'goals', color: '#4CAF50', label: 'Goals Scored' },
              { key: 'conceded', color: '#F44336', label: 'Goals Conceded' }
            ]}
            height={300}
            title="Top 5 Teams Comparison"
            subtitle="Goals Scored vs Conceded"
          />
          
          <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 p-5">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
            
            <div className="space-y-4">
              <div className="bg-black/30 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400 text-sm">Top Scorer</span>
                  <span className="text-white text-sm">Erling Haaland (15)</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[75%]"></div>
                </div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400 text-sm">Most Assists</span>
                  <span className="text-white text-sm">Kevin De Bruyne (12)</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[60%]"></div>
                </div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400 text-sm">Possession</span>
                  <span className="text-white text-sm">65.3%</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 w-[65%]"></div>
                </div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400 text-sm">Win Rate</span>
                  <span className="text-white text-sm">75%</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[75%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-10">
          <TeamPerformanceDashboard 
            team={matchData.homeTeam as any}
            stats={teamStats}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <MatchStatsDashboard
            match={matchData as any}
            stats={matchStats}
            possession={matchStatDetails.possession}
            xG={matchStatDetails.xG}
            shots={matchStatDetails.shots}
            passAccuracy={matchStatDetails.passAccuracy}
          />
          
          <MatchHeatmap
            match={matchData as any}
            homeTeamColor={matchData.homeTeam.color}
            awayTeamColor={matchData.awayTeam.color}
            heatmapData={heatmapPoints as any}
            width={500}
            height={350}
          />
        </div>
        
        <div className="mb-10">
          <MatchTimeline 
            match={matchData as any}
            events={matchEvents as any}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <EnhancedPlayerCard
            player={player1}
            number={47}
            position="Attacking Midfielder"
            stats={{
              rating: 8.7,
              mainStat: 15,
              mainStatLabel: "Goals",
              secondaryStat: 8,
              secondaryStatLabel: "Assists",
              detailedStats: [
                { label: 'Pass Accuracy', value: 89, maxValue: 100 },
                { label: 'Shot Accuracy', value: 75, maxValue: 100 },
                { label: 'Dribbling Success', value: 68, maxValue: 100 },
                { label: 'Tackle Success', value: 42, maxValue: 100 }
              ],
              formData: [
                { match: 'vs CHE', rating: 8.2 },
                { match: 'vs NEW', rating: 7.5 },
                { match: 'vs TOT', rating: 8.8 },
                { match: 'vs BHA', rating: 9.1 },
                { match: 'vs ARS', rating: 8.4 }
              ]
            }}
            teamColor="#6CABDD"
          />
          
          <PlayerComparisonCard
            player1={player1}
            player2={player2}
            stats={{
              player1Stats: {
                pace: 85,
                shooting: 82,
                passing: 88,
                dribbling: 90,
                defending: 65,
                physical: 70,
                rating: 8.5
              },
              player2Stats: {
                pace: 75,
                shooting: 85,
                passing: 92,
                dribbling: 84,
                defending: 60,
                physical: 78,
                rating: 8.3
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FootballAnalytics;
