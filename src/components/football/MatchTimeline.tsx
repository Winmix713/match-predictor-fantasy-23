
import React from 'react';
import { Clock, AlertTriangle, Users, ArrowRight, Trophy, Flag } from 'lucide-react';
import type { Match } from '@/types/football';

interface MatchEvent {
  time: number;
  type: 'kickoff' | 'goal' | 'yellow-card' | 'red-card' | 'substitution' | 'end';
  team: 'home' | 'away';
  player?: string;
  assistedBy?: string;
  playerOut?: string;
  playerIn?: string;
  description?: string;
}

interface MatchTimelineProps {
  events: MatchEvent[];
  match?: Match;
  homeTeam?: string;
  awayTeam?: string;
}

export const MatchTimeline: React.FC<MatchTimelineProps> = ({ events, match, homeTeam, awayTeam }) => {
  // Use team names from match object if provided, otherwise use the props
  const home = match ? match.homeTeam.name : homeTeam;
  const away = match ? match.awayTeam.name : awayTeam;
  
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'kickoff':
        return <Flag className="h-4 w-4 text-blue-400" />;
      case 'goal':
        return <Trophy className="h-4 w-4 text-yellow-400" />;
      case 'yellow-card':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'red-card':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'substitution':
        return <Users className="h-4 w-4 text-green-400" />;
      case 'end':
        return <Flag className="h-4 w-4 text-blue-400" />;
      case 'start':
        return <Flag className="h-4 w-4 text-blue-400" />;
      case 'half-time':
        return <Clock className="h-4 w-4 text-blue-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
      <h3 className="text-lg font-medium text-white mb-4">Match Timeline</h3>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 text-center">
              <span className="text-sm font-medium text-white">{event.time}'</span>
            </div>
            
            <div className="h-8 w-8 rounded-full bg-gray-800/70 flex items-center justify-center">
              {getEventIcon(event.type)}
            </div>
            
            <div className="flex-1">
              {event.type === 'goal' && (
                <div className="text-white">
                  <span className="font-medium">{event.player}</span>
                  {event.assistedBy && (
                    <span className="text-sm text-gray-400"> (assisted by {event.assistedBy})</span>
                  )}
                  {event.description && (
                    <div className="text-xs text-gray-400 mt-1">{event.description}</div>
                  )}
                </div>
              )}
              
              {event.type === 'yellow-card' && (
                <div className="text-white">
                  <span className="font-medium">{event.player}</span>
                  <span className="text-sm text-yellow-400 ml-1">Yellow Card</span>
                  {event.description && (
                    <div className="text-xs text-gray-400 mt-1">{event.description}</div>
                  )}
                </div>
              )}
              
              {event.type === 'red-card' && (
                <div className="text-white">
                  <span className="font-medium">{event.player}</span>
                  <span className="text-sm text-red-500 ml-1">Red Card</span>
                  {event.description && (
                    <div className="text-xs text-gray-400 mt-1">{event.description}</div>
                  )}
                </div>
              )}
              
              {event.type === 'substitution' && (
                <div className="text-white flex items-center gap-2">
                  <span className="text-sm text-gray-400">{event.playerOut}</span>
                  <ArrowRight className="h-3 w-3 text-green-400" />
                  <span className="font-medium">{event.playerIn}</span>
                </div>
              )}
              
              {event.type === 'kickoff' && (
                <div className="text-gray-400">Kickoff</div>
              )}
              
              {event.type === 'start' && (
                <div className="text-gray-400">Match Start</div>
              )}
              
              {event.type === 'half-time' && (
                <div className="text-gray-400">Half Time</div>
              )}
              
              {event.type === 'end' && (
                <div className="text-gray-400">Full Time</div>
              )}
            </div>
            
            <div className="text-sm text-right w-24">
              {event.team === 'home' ? (
                <span className="text-blue-400">{home}</span>
              ) : (
                <span className="text-red-400">{away}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
