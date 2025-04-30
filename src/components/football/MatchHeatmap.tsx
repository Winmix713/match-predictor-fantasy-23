
import React from 'react';
import type { Match } from '@/types/football';

// Define heatmap data type
interface HeatmapPoint {
  x: number;
  y: number;
  value: number; // 0-100 intensity
  team: 'home' | 'away';
}

interface MatchHeatmapProps {
  match: Match;
  homeTeamColor?: string;
  awayTeamColor?: string;
  heatmapData: HeatmapPoint[];
  width?: number;
  height?: number;
  showLegend?: boolean;
}

export const MatchHeatmap: React.FC<MatchHeatmapProps> = ({
  match,
  homeTeamColor = '#ff3d41',
  awayTeamColor = '#1E3A8A',
  heatmapData,
  width = 600,
  height = 400,
  showLegend = true
}) => {
  const fieldWidth = width;
  const fieldHeight = height;
  const padding = 20;
  
  // Function to generate heatmap gradient
  const generateGradient = (color: string, id: string) => (
    <defs>
      <radialGradient id={id} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.7" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
  
  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 p-5 shadow-lg">
      <h3 className="text-white font-semibold text-lg mb-4">Match Activity Heatmap</h3>
      
      <div className="flex items-center justify-center mb-4 gap-8">
        <div className="flex items-center">
          {match.homeTeam.logo && (
            <img 
              src={match.homeTeam.logo} 
              alt={match.homeTeam.name} 
              className="w-8 h-8 object-contain mr-2" 
            />
          )}
          <span className="text-white">{match.homeTeam.name}</span>
        </div>
        
        <div className="px-3 py-1 bg-gray-800 rounded text-white">
          VS
        </div>
        
        <div className="flex items-center">
          {match.awayTeam.logo && (
            <img 
              src={match.awayTeam.logo} 
              alt={match.awayTeam.name} 
              className="w-8 h-8 object-contain mr-2" 
            />
          )}
          <span className="text-white">{match.awayTeam.name}</span>
        </div>
      </div>
      
      {/* Legend if enabled */}
      {showLegend && (
        <div className="flex justify-center gap-6 mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: homeTeamColor }}></div>
            <span className="text-gray-300 text-sm">{match.homeTeam.name} activity</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: awayTeamColor }}></div>
            <span className="text-gray-300 text-sm">{match.awayTeam.name} activity</span>
          </div>
        </div>
      )}
      
      <div className="relative flex justify-center">
        <svg width={width} height={height} viewBox={`0 0 ${fieldWidth} ${fieldHeight}`}>
          {/* Soccer field background */}
          <rect x="0" y="0" width={fieldWidth} height={fieldHeight} fill="#0a1c0a" />
          
          {/* Field markings */}
          <rect
            x={padding}
            y={padding}
            width={fieldWidth - 2 * padding}
            height={fieldHeight - 2 * padding}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
          
          {/* Center circle */}
          <circle
            cx={fieldWidth / 2}
            cy={fieldHeight / 2}
            r={60}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
          
          {/* Center line */}
          <line
            x1={fieldWidth / 2}
            y1={padding}
            x2={fieldWidth / 2}
            y2={fieldHeight - padding}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
          
          {/* Center spot */}
          <circle
            cx={fieldWidth / 2}
            cy={fieldHeight / 2}
            r={3}
            fill="rgba(255,255,255,0.5)"
          />
          
          {/* Penalty areas */}
          <rect
            x={padding}
            y={(fieldHeight - 120) / 2}
            width={100}
            height={120}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
          <rect
            x={fieldWidth - padding - 100}
            y={(fieldHeight - 120) / 2}
            width={100}
            height={120}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
          
          {/* Goals */}
          <rect
            x={padding - 5}
            y={(fieldHeight - 40) / 2}
            width={5}
            height={40}
            fill="rgba(255,255,255,0.5)"
          />
          <rect
            x={fieldWidth - padding}
            y={(fieldHeight - 40) / 2}
            width={5}
            height={40}
            fill="rgba(255,255,255,0.5)"
          />
          
          {/* Gradient definitions */}
          {generateGradient(homeTeamColor, 'homeGradient')}
          {generateGradient(awayTeamColor, 'awayGradient')}
          
          {/* Heatmap points */}
          {heatmapData.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={point.value / 5 + 10} // Scale the radius based on intensity
              fill={`url(#${point.team}Gradient)`}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};
