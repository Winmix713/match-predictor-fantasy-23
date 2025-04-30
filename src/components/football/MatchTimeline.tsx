import React from 'react';
import { Clock, User, Flag, Play, ArrowDownUp } from 'lucide-react';
import type { Match } from '@/types/football';

/**
 * Meccs esemény típusok
 */
export type EventType = 'goal' | 'yellow-card' | 'red-card' | 'substitution' | 'start' | 'half-time' | 'end';

/**
 * Meccs esemény interfész
 */
export interface MatchEvent {
  id: string;                // Egyedi azonosító
  time: number;              // Esemény ideje percben
  type: EventType;           // Esemény típusa
  team: 'home' | 'away';     // Melyik csapathoz tartozik
  player?: string;           // Érintett játékos
  assistedBy?: string;       // Gólpasszt adó játékos
  playerOut?: string;        // Lecserélt játékos
  playerIn?: string;         // Becserélt játékos
  description?: string;      // Esemény leírása
}

/**
 * MatchTimeline komponens tulajdonságai
 */
export interface MatchTimelineProps {
  match: Match;              // Meccs adatok
  events: MatchEvent[];      // Meccs események
  className?: string;        // CSS osztályok
}

/**
 * Meccs idővonal komponens
 * 
 * Megjeleníti egy futball meccs eseményeit időrendi sorrendben
 */
export const MatchTimeline: React.FC<MatchTimelineProps> = ({ 
  match, 
  events, 
  className = ''
}) => {
  // Rendezzük az eseményeket idő szerint
  const sortedEvents = React.useMemo(() => 
    [...events].sort((a, b) => a.time - b.time), 
    [events]
  );

  return (
    <div className={`bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 p-6 shadow-lg ${className}`}>
      <h3 className="text-xl font-semibold text-white mb-4">Match Timeline</h3>
      
      {/* Meccs eredmény fejléc */}
      <MatchHeader match={match} />
      
      {/* Idővonal események */}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700 z-0"></div>
        <div className="space-y-6">
          {sortedEvents.map((event) => (
            <TimelineEvent key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Meccs fejléc komponens
 */
const MatchHeader: React.FC<{ match: Match }> = ({ match }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <TeamDisplay 
        logo={match.homeTeam.logo} 
        name={match.homeTeam.name} 
      />
      
      <ScoreDisplay 
        homeScore={match.homeScore} 
        awayScore={match.awayScore} 
      />
      
      <TeamDisplay 
        logo={match.awayTeam.logo} 
        name={match.awayTeam.name} 
      />
    </div>
  );
};

/**
 * Csapat megjelenítés komponens
 */
const TeamDisplay: React.FC<{ logo?: string; name: string }> = ({ logo, name }) => {
  return (
    <div className="flex items-center">
      {logo && (
        <img 
          src={logo} 
          alt={`${name} logo`} 
          className="w-10 h-10 object-contain mr-2" 
        />
      )}
      <span className="text-white font-medium">{name}</span>
    </div>
  );
};

/**
 * Eredmény megjelenítés komponens
 */
const ScoreDisplay: React.FC<{ homeScore?: number; awayScore?: number }> = ({ 
  homeScore, 
  awayScore 
}) => {
  return (
    <div className="px-3 py-1 bg-black/30 rounded-lg">
      <span className="text-white font-bold text-lg">
        {homeScore !== undefined ? homeScore : '?'} - {awayScore !== undefined ? awayScore : '?'}
      </span>
    </div>
  );
};

/**
 * Idővonal esemény komponens
 */
const TimelineEvent: React.FC<{ event: MatchEvent }> = ({ event }) => {
  return (
    <div className="relative flex items-start pl-12">
      <div className="absolute left-0 top-0 z-10">
        <EventIcon event={event} />
      </div>
      <div className="min-w-[40px] mr-4 font-mono">
        <span className="text-gray-400">{event.time}'</span>
      </div>
      <div className="flex-1 bg-black/30 rounded-lg p-3">
        <EventContent event={event} />
      </div>
    </div>
  );
};

/**
 * Esemény ikon komponens
 */
const EventIcon: React.FC<{ event: MatchEvent }> = ({ event }) => {
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
          <ArrowDownUp className="w-4 h-4 text-white" />
        </div>
      );
    case 'start':
      return (
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
          <Play className="w-4 h-4 text-white" />
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

/**
 * Esemény tartalom komponens
 */
const EventContent: React.FC<{ event: MatchEvent }> = ({ event }) => {
  switch (event.type) {
    case 'goal':
      return (
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
      );
    case 'yellow-card':
      return (
        <div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-medium">Yellow Card</span>
            <span className="text-white">{event.player}</span>
          </div>
          {event.description && (
            <p className="text-gray-400 text-sm mt-1">{event.description}</p>
          )}
        </div>
      );
    case 'red-card':
      return (
        <div>
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-medium">Red Card</span>
            <span className="text-white">{event.player}</span>
          </div>
          {event.description && (
            <p className="text-gray-400 text-sm mt-1">{event.description}</p>
          )}
        </div>
      );
    case 'substitution':
      return (
        <div>
          <span className="text-blue-400 font-medium">Substitution</span>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-red-400">↑ {event.playerOut}</span>
            <span className="text-white mx-1">→</span>
            <span className="text-green-400">↓ {event.playerIn}</span>
          </div>
        </div>
      );
    case 'start':
    case 'half-time':
    case 'end':
      return (
        <div>
          <span className="text-gray-300 font-medium">
            {event.type === 'start' ? 'Match Started' : 
             event.type === 'half-time' ? 'Half Time' : 'Match Ended'}
          </span>
          {event.description && (
            <p className="text-gray-400 text-sm mt-1">{event.description}</p>
          )}
        </div>
      );
    default:
      return null;
  }
};

export default MatchTimeline;
