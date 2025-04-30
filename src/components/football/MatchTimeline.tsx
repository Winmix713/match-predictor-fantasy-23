
import React from 'react';
import { Clock, User, Flag, Whistle } from 'lucide-react';
import type { Match } from '@/types/football';

interface MatchEvent {
  time: number;
  type: 'goal' | 'yellow-card' | 'red-card' | 'substitution' | 'start' | 'half-time' | 'end';
  team: 'home' | 'away';
  player?: string;
  assistedBy?: string;
  playerOut?: string;
  playerIn?: string;
  description?: string;
}

interface MatchTimelineProps {
  match: Match;
  events: MatchEvent[];
}

export const MatchTimeline: React.FC<MatchTimelineProps> = ({ match, events }) => {
  // Sort events by time
  const sortedEvents = [...events].sort((a, b) => a.time - b.time);
  
  const renderEventIcon = (event: MatchEvent) => {
    switch (event.type) {
      case 'goal':
        return (
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-sm">⚽</span>
          </div>
        );
      case 'yellow-card':
        return (
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
            <div className="w-4 h-6 bg-yellow-400"></div>
          </div>
        );
      case 'red-card':
        return (
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
            <div className="w-4 h-6 bg-red-600"></div>
          </div>
        );
      case 'substitution':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
        );
      case 'start':
        return (
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <Whistle className="w-4 h-4 text-white" />
          </div>
        );
      case 'half-time':
        return (
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
        );
      case 'end':
        return (
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <Flag className="w-4 h-4 text-white" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        );
    }
  };
  
  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-4">Match Timeline</h3>
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center">
          {match.homeTeam.logo && (
            <img 
              src={match.homeTeam.logo} 
              alt={match.homeTeam.name} 
              className="w-10 h-10 object-contain mr-2" 
            />
          )}
          <span className="text-white font-medium">{match.homeTeam.name}</span>
        </div>
        <div className="px-3 py-1 bg-black/30 rounded-lg">
          <span className="text-white font-bold text-lg">
            {match.homeScore !== undefined ? match.homeScore : '?'} - {match.awayScore !== undefined ? match.awayScore : '?'}
          </span>
        </div>
        <div className="flex items-center">
          {match.awayTeam.logo && (
            <img 
              src={match.awayTeam.logo} 
              alt={match.awayTeam.name} 
              className="w-10 h-10 object-contain mr-2" 
            />
          )}
          <span className="text-white font-medium">{match.awayTeam.name}</span>
        </div>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700 z-0"></div>
        
        {/* Events */}
        <div className="space-y-6">
          {sortedEvents.map((event, index) => (
            <div key={index} className="relative flex items-start pl-12">
              {/* Event Marker */}
              <div className="absolute left-0 top-0 z-10">
                {renderEventIcon(event)}
              </div>
              
              {/* Time */}
              <div className="min-w-[40px] mr-4 font-mono">
                <span className="text-gray-400">{event.time}'</span>
              </div>
              
              {/* Event Content */}
              <div className="flex-1 bg-black/30 rounded-lg p-3">
                {event.type === 'goal' && (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 font-medium">⚽ GOAL!</span>
                      <span className="text-white">{event.player}</span>
                    </div>
                    {event.assistedBy && (
                      <span className="text-gray-400 text-sm">Assisted by {event.assistedBy}</span>
                    )}
                    {event.description && (
                      <p className="text-gray-400 text-sm mt-1">{event.description}</p>
                    )}
                  </div>
                )}
                
                {event.type === 'yellow-card' && (
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 font-medium">Yellow Card</span>
                      <span className="text-white">{event.player}</span>
                    </div>
                    {event.description && (
                      <p className="text-gray-400 text-sm mt-1">{event.description}</p>
                    )}
                  </div>
                )}
                
                {event.type === 'red-card' && (
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500 font-medium">Red Card</span>
                      <span className="text-white">{event.player}</span>
                    </div>
                    {event.description && (
                      <p className="text-gray-400 text-sm mt-1">{event.description}</p>
                    )}
                  </div>
                )}
                
                {event.type === 'substitution' && (
                  <div>
                    <span className="text-blue-400 font-medium">Substitution</span>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-red-400">↑ {event.playerOut}</span>
                      <span className="text-white mx-1">→</span>
                      <span className="text-green-400">↓ {event.playerIn}</span>
                    </div>
                  </div>
                )}
                
                {(event.type === 'start' || event.type === 'half-time' || event.type === 'end') && (
                  <div>
                    <span className="text-gray-300 font-medium">
                      {event.type === 'start' ? 'Match Started' : 
                       event.type === 'half-time' ? 'Half Time' : 'Match Ended'}
                    </span>
                    {event.description && (
                      <p className="text-gray-400 text-sm mt-1">{event.description}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
