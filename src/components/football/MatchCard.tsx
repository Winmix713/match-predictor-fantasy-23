
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import type { Match } from '@/types/football';
import { formatDate } from '@/lib/utils';

interface MatchCardProps {
  match: Match;
  className?: string;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, className }) => {
  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED';
  const isScheduled = match.status === 'SCHEDULED';
  
  const getStatusClass = () => {
    if (isLive) return 'bg-red-500 animate-pulse-slow';
    if (isFinished) return 'bg-gray-500';
    return 'bg-blue-500';
  };
  
  const getStatusText = () => {
    if (isLive) return `LIVE ${match.minute}'`;
    if (isFinished) return 'FINISHED';
    return formatDate(match.date, 'HH:mm');
  };
  
  return (
    <div className={`bg-gray-900/70 rounded-xl border border-gray-800 overflow-hidden shadow-lg hover:border-gray-700 transition-colors ${className}`}>
      {/* Competition header */}
      {match.competition && (
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2">
          <div className="flex items-center gap-2">
            {match.competition.logo && (
              <img src={match.competition.logo} alt={match.competition.name} className="h-4 w-4" />
            )}
            <span className="text-xs text-gray-400">{match.competition.name}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            {isScheduled ? (
              <>
                <Calendar className="h-3 w-3" />
                <span>{formatDate(match.date, 'dd MMM')}</span>
              </>
            ) : (
              <>
                <Clock className="h-3 w-3" />
                <span>{getStatusText()}</span>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Match content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          {/* Home team */}
          <div className="flex flex-col items-center gap-2">
            {match.homeTeam.logo ? (
              <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="h-12 w-12 object-contain" />
            ) : (
              <div className="h-12 w-12 rounded-full flex items-center justify-center bg-gray-800 text-xl font-bold">
                {match.homeTeam.name.charAt(0)}
              </div>
            )}
            <span className="text-sm text-center font-medium text-white line-clamp-1">{match.homeTeam.name}</span>
          </div>
          
          {/* Score */}
          <div className="flex flex-col items-center">
            {isLive && (
              <span className={`text-xs px-3 py-1 rounded-full ${getStatusClass()} mb-2`}>
                {getStatusText()}
              </span>
            )}
            
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-white">
                {isFinished || isLive ? match.homeScore : '-'}
              </span>
              <span className="text-xl text-gray-500 font-light">:</span>
              <span className="text-2xl font-bold text-white">
                {isFinished || isLive ? match.awayScore : '-'}
              </span>
            </div>
            
            {isScheduled && (
              <span className="text-sm text-gray-400 mt-2">{formatDate(match.date, 'HH:mm')}</span>
            )}
          </div>
          
          {/* Away team */}
          <div className="flex flex-col items-center gap-2">
            {match.awayTeam.logo ? (
              <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="h-12 w-12 object-contain" />
            ) : (
              <div className="h-12 w-12 rounded-full flex items-center justify-center bg-gray-800 text-xl font-bold">
                {match.awayTeam.name.charAt(0)}
              </div>
            )}
            <span className="text-sm text-center font-medium text-white line-clamp-1">{match.awayTeam.name}</span>
          </div>
        </div>
        
        {/* Additional info if needed */}
        {match.stadium && (
          <div className="text-center text-xs text-gray-400 border-t border-gray-800 pt-3">
            {match.stadium}
          </div>
        )}
      </div>
    </div>
  );
};
