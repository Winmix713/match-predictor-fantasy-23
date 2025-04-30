
import React from 'react';
import { RadarChart } from '@/components/football/RadarChart';
import { PlayerProfileCard } from '@/components/football/PlayerProfileCard';
import { MatchCard } from '@/components/football/MatchCard';
import { StatsProgressBar } from '@/components/football/StatsProgressBar';
import { CircularProgressChart } from '@/components/football/CircularProgressChart';
import { TeamCardWithStats } from '@/components/football/TeamCardWithStats';
import { HeadToHeadComparison } from '@/components/football/HeadToHeadComparison';

const Index = () => {
  // Sample data for RadarChart
  const team1Performance = {
    team: {
      id: '1',
      name: 'Barcelona',
      color: '#AA0000',
    },
    stats: {
      shots: 20,
      passes: 650,
      crosses: 25,
      corners: 8,
      saves: 5,
      outs: 20
    }
  };
  
  const team2Performance = {
    team: {
      id: '2',
      name: 'Real Madrid',
      color: '#1E3A8A',
    },
    stats: {
      shots: 15,
      passes: 580,
      crosses: 15,
      corners: 5,
      saves: 7,
      outs: 18
    }
  };

  // Sample match data
  const matchData = {
    id: '1',
    homeTeam: {
      id: '1',
      name: 'Manchester City',
      logo: 'https://media.api-sports.io/football/teams/50.png',
    },
    awayTeam: {
      id: '2',
      name: 'Liverpool',
      logo: 'https://media.api-sports.io/football/teams/40.png',
    },
    homeScore: 2,
    awayScore: 1,
    date: new Date().toISOString(),
    status: 'LIVE',
    minute: 67,
    competition: {
      id: '1',
      name: 'Premier League',
      logo: 'https://media.api-sports.io/football/leagues/39.png',
    }
  } as const;
  
  // Sample player data
  const playerData = {
    id: '1',
    name: 'Phil Foden',
    position: 'Attacking Midfielder',
    image: 'public/lovable-uploads/800840d2-8461-45d0-811c-1a3cbf2df949.png',
    team: {
      id: '1',
      name: 'Manchester City',
      logo: 'https://media.api-sports.io/football/teams/50.png',
    }
  };
  
  // Sample match stats
  const matchStats = [
    { type: 'Possession', home: 65, away: 35 },
    { type: 'Shots', home: 12, away: 8 },
    { type: 'Shots on Target', home: 5, away: 3 },
    { type: 'Corners', home: 7, away: 2 },
    { type: 'Fouls', home: 10, away: 14 }
  ];
  
  // Sample team data for TeamCardWithStats
  const teamData = {
    id: '1',
    name: 'Manchester United',
    logo: 'https://media.api-sports.io/football/teams/33.png',
    city: 'Manchester',
    country: 'England',
    color: '#DA020E'
  };
  
  // Sample team stats
  const teamStats = {
    wins: 12,
    draws: 5,
    losses: 3,
    points: 41,
    position: 3,
    form: ['W', 'W', 'D', 'L', 'W'] as ('W' | 'D' | 'L')[],
    rating: 76
  };
  
  // Sample head-to-head data
  const headToHeadData = {
    team1: {
      id: '1',
      name: 'Real Madrid',
      shortName: 'Madrid',
      logo: 'https://media.api-sports.io/football/teams/541.png',
      city: 'Madrid',
      country: 'Spain',
      color: '#FFFFFF'
    },
    team2: {
      id: '2',
      name: 'Manchester United',
      shortName: 'Man United',
      logo: 'https://media.api-sports.io/football/teams/33.png',
      city: 'Manchester',
      country: 'England',
      color: '#DA020E'
    },
    team1Wins: 14,
    team2Wins: 16,
    draws: 4,
    lastMatches: Array(10).fill(null).map((_, i) => ({
      id: `match-${i}`,
      homeTeam: i % 2 === 0 ? {id: '1', name: 'Real Madrid'} : {id: '2', name: 'Manchester United'},
      awayTeam: i % 2 === 0 ? {id: '2', name: 'Manchester United'} : {id: '1', name: 'Real Madrid'},
      homeScore: Math.floor(Math.random() * 4),
      awayScore: Math.floor(Math.random() * 4),
      date: new Date(Date.now() - (i * 30 * 24 * 60 * 60 * 1000)).toISOString(), // Approx every 30 days back
      status: 'FINISHED' as 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'POSTPONED'
    })),
    team1GoalsPerMatch: 1.47,
    team2GoalsPerMatch: 1.47,
    team1BestScore: '5 : 0',
    team2BestScore: '5 : 0'
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black overflow-x-hidden">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-6">Football Analytics UI Components</h1>
        <p className="text-gray-400 mb-10">Modern, beautiful components for displaying football/soccer statistics and data.</p>
        
        {/* First Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <PlayerProfileCard 
              player={playerData}
              number={47}
              stats={{
                rating: 8.7,
                mainStat: 15,
                secondaryStat: 8,
                tertiaryStats: [
                  { value: 89, label: 'Pass accuracy' },
                  { value: 75, label: 'Shot accuracy' },
                  { value: 68, label: 'Dribbling success' }
                ]
              }}
            />
          </div>
          
          <div>
            <div className="bg-gray-900/70 rounded-xl p-6 h-full flex flex-col justify-center">
              <h3 className="text-xl font-bold text-white mb-6">Performance Rating</h3>
              <div className="flex justify-center mb-8">
                <CircularProgressChart
                  percentage={67}
                  size={180}
                  strokeWidth={12}
                  color="#9C27B0"
                  value="67%"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 rounded-lg p-4 flex flex-col items-center">
                  <CircularProgressChart
                    percentage={76}
                    size={80}
                    color="#2196f3"
                    value={1.68}
                    label="xG"
                  />
                </div>
                <div className="bg-black/20 rounded-lg p-4 flex flex-col items-center">
                  <CircularProgressChart
                    percentage={83}
                    size={80}
                    color="#4caf50"
                    value={2.01}
                    label="Rating"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div>
            <MatchCard match={matchData} />
          </div>
          
          <div className="bg-gray-900/70 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Match Stats</h3>
            <div className="space-y-4">
              {matchStats.map((stat, index) => (
                <StatsProgressBar key={index} stat={stat} />
              ))}
            </div>
          </div>
          
          <div className="bg-gray-900/70 rounded-xl p-6">
            <TeamCardWithStats
              team={teamData}
              stats={teamStats}
            />
          </div>
        </div>
        
        {/* Third Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900/70 rounded-xl p-6 flex flex-col items-center justify-center">
            <RadarChart 
              performance1={team1Performance}
              performance2={team2Performance}
              size={350}
            />
          </div>
          
          <HeadToHeadComparison headToHead={headToHeadData} />
        </div>
        
        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>Football/Soccer Analytics UI Components • Built with React, TypeScript and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
