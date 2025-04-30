
import React from 'react';
import type { HeadToHead } from '@/types/football';

interface HeadToHeadComparisonProps {
  headToHead: HeadToHead;
  className?: string;
}

export const HeadToHeadComparison: React.FC<HeadToHeadComparisonProps> = ({ headToHead, className }) => {
  const { team1, team2, team1Wins, team2Wins, draws } = headToHead;
  const totalMatches = team1Wins + team2Wins + draws;
  const team1WinsPercentage = totalMatches > 0 ? (team1Wins / totalMatches) * 100 : 0;
  const team2WinsPercentage = totalMatches > 0 ? (team2Wins / totalMatches) * 100 : 0;
  const drawsPercentage = totalMatches > 0 ? (draws / totalMatches) * 100 : 0;

  return (
    <div className={`bg-gray-900/70 rounded-xl p-6 ${className}`}>
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4V16H22V18H20V20H18V18H6V20H4V18H2V16H4V4H20Z" fill="currentColor" />
          <path d="M16 8H13V14H11V8H8V6H16V8Z" fill="currentColor" />
        </svg>
        HEAD TO HEAD
      </h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-1 flex flex-col items-center">
          {team1.logo ? (
            <img src={team1.logo} alt={team1.name} className="h-16 w-16 mb-3 object-contain" />
          ) : (
            <div className="h-16 w-16 rounded-full bg-gray-800 mb-3 flex items-center justify-center">
              <span className="text-lg font-bold text-white">{team1.shortName || team1.name.substring(0, 3)}</span>
            </div>
          )}
          <div className="text-center">
            <div className="font-bold text-white mb-1">{team1.shortName || team1.name}</div>
            <div className="text-xs text-gray-400">{team1.city}, {team1.country}</div>
          </div>
          <div className="mt-4">
            <div className="font-bold text-xl text-white">Won</div>
            <div className="text-3xl font-bold text-blue-500 mt-1">{team1Wins}</div>
          </div>
          <div className="text-sm text-gray-400 mt-4">
            <div>Avg. goals/match: <span className="text-white">{headToHead.team1GoalsPerMatch.toFixed(2)}</span></div>
            <div>Best score: <span className="text-white">{headToHead.team1BestScore}</span></div>
          </div>
        </div>
        
        <div className="col-span-1 flex flex-col items-center">
          <div className="w-full h-1 bg-gray-800 mt-6 mb-3"></div>
          <div className="bg-gray-800/50 p-3 rounded-full mb-3">
            <svg className="w-10 h-10 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3ZM19 19H5V5H19V19Z" fill="currentColor" />
              <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8Z" fill="currentColor" />
              <path d="M12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20Z" fill="currentColor" />
              <path d="M12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14Z" fill="currentColor" />
            </svg>
          </div>
          
          {/* Timeline or wave chart here */}
          <div className="my-4 w-full relative h-16">
            <svg className="w-full h-full" viewBox="0 0 500 80" preserveAspectRatio="none">
              <path 
                d="M0,40 C50,20 100,60 150,40 C200,20 250,60 300,40 C350,20 400,60 450,40 C500,20 550,60 600,40" 
                fill="none" 
                stroke="url(#gradient)" 
                strokeWidth="3"
              />
              
              <defs>
                <linearGradient id="gradient" gradientTransform="rotate(90)">
                  <stop offset="0%" stopColor={team1.color || '#ff3d41'} />
                  <stop offset="100%" stopColor={team2.color || '#2196f3'} />
                </linearGradient>
              </defs>
              
              {/* Add dots for significant matches */}
              {[0.15, 0.28, 0.42, 0.55, 0.68, 0.82].map((pos, i) => {
                const teamColor = i % 2 === 0 ? (team1.color || '#ff3d41') : (team2.color || '#2196f3');
                return (
                  <circle
                    key={i}
                    cx={pos * 500}
                    cy={40 + (i % 2 === 0 ? -10 : 10)}
                    r="4"
                    fill={teamColor}
                    stroke="#111"
                    strokeWidth="1"
                  />
                );
              })}
            </svg>
          </div>
          
          <div className="mt-4 text-lg font-bold text-white">vs</div>
          <div className="mt-4">
            <div className="font-bold text-xl text-white text-center">Draws</div>
            <div className="text-3xl font-bold text-gray-400 mt-1 text-center">{draws}</div>
          </div>
          <div className="mt-4 w-full bg-gray-800/50 h-1 rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${team1WinsPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="col-span-1 flex flex-col items-center">
          {team2.logo ? (
            <img src={team2.logo} alt={team2.name} className="h-16 w-16 mb-3 object-contain" />
          ) : (
            <div className="h-16 w-16 rounded-full bg-gray-800 mb-3 flex items-center justify-center">
              <span className="text-lg font-bold text-white">{team2.shortName || team2.name.substring(0, 3)}</span>
            </div>
          )}
          <div className="text-center">
            <div className="font-bold text-white mb-1">{team2.shortName || team2.name}</div>
            <div className="text-xs text-gray-400">{team2.city}, {team2.country}</div>
          </div>
          <div className="mt-4">
            <div className="font-bold text-xl text-white">Won</div>
            <div className="text-3xl font-bold text-red-500 mt-1">{team2Wins}</div>
          </div>
          <div className="text-sm text-gray-400 mt-4">
            <div>Avg. goals/match: <span className="text-white">{headToHead.team2GoalsPerMatch.toFixed(2)}</span></div>
            <div>Best score: <span className="text-white">{headToHead.team2BestScore}</span></div>
          </div>
        </div>
      </div>
      
      {/* Record dates display */}
      <div className="grid grid-cols-10 mt-2 gap-1 overflow-x-auto">
        {Array.from({ length: 10 }, (_, i) => {
          const match = headToHead.lastMatches[i] || null;
          if (!match) return <div key={`empty-${i}`} className="h-1"></div>;
          
          const isTeam1Win = match.homeTeam.id === team1.id && match.homeScore! > match.awayScore! || 
                             match.awayTeam.id === team1.id && match.awayScore! > match.homeScore!;
          const isTeam2Win = match.homeTeam.id === team2.id && match.homeScore! > match.awayScore! || 
                             match.awayTeam.id === team2.id && match.awayScore! > match.homeScore!;
          const isDraw = match.homeScore === match.awayScore;
          
          const color = isTeam1Win ? (team1.color || '#ff3d41') : 
                       isTeam2Win ? (team2.color || '#2196f3') : 
                       '#888888';
          
          return (
            <div 
              key={match.id}
              className="text-xs text-center p-1"
            >
              <div className="text-[8px] text-gray-500">{new Date(match.date).toLocaleDateString('en-GB')}</div>
              <div className="py-1 px-2 rounded bg-gray-800/50 text-white">
                {match.homeScore}:{match.awayScore}
              </div>
              <div 
                className="h-1 w-full mt-1 rounded-full" 
                style={{ backgroundColor: color }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
