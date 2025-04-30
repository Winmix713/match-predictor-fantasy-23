
import React from 'react';
import type { PerformanceStats, TeamPerformance } from '@/types/football';

interface RadarChartProps {
  title?: string;
  performance1: TeamPerformance;
  performance2?: TeamPerformance;
  maxValues?: {[key in keyof PerformanceStats]: number};
  size?: number;
  className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  title = 'Passes stats',
  performance1,
  performance2,
  maxValues = {
    shots: 30,
    passes: 800,
    crosses: 40,
    corners: 15,
    saves: 10,
    outs: 30
  },
  size = 300,
  className,
}) => {
  // Calculate center and radius
  const center = size / 2;
  const radius = center * 0.8;
  
  // Define stat categories and their angles
  const categories = [
    { key: 'shots', label: 'SHOTS' },
    { key: 'crosses', label: 'CROSSES' },
    { key: 'outs', label: 'OUTS' },
    { key: 'saves', label: 'SAVES' },
    { key: 'corners', label: 'CORNERS' },
    { key: 'passes', label: 'PASSES' }
  ] as const;
  
  const angleStep = (Math.PI * 2) / categories.length;
  
  // Create point for each stat
  const getPoints = (stats: PerformanceStats) => {
    return categories.map((category, i) => {
      const value = stats[category.key];
      const maxValue = maxValues[category.key];
      const normalizedValue = value / maxValue; // 0 to 1
      const value2use = Math.min(normalizedValue, 1) * radius; // Clamp to radius
      
      const angle = i * angleStep - Math.PI / 2; // Start from top (- PI/2)
      const x = center + value2use * Math.cos(angle);
      const y = center + value2use * Math.sin(angle);
      
      return { x, y, value, maxValue, label: category.label };
    });
  };
  
  // Generate SVG path for each team's polygon
  const generatePath = (points: ReturnType<typeof getPoints>) => {
    return points.map((point, i) => `${i === 0 ? 'M' : 'L'}${point.x},${point.y}`).join(' ') + 'Z';
  };

  // Get first and second team colors
  const team1Color = performance1.team.color || '#ff3d41';
  const team2Color = performance2?.team.color || '#2196f3';
  
  const team1Points = getPoints(performance1.stats);
  const team1Path = generatePath(team1Points);
  
  const team2Points = performance2 ? getPoints(performance2.stats) : [];
  const team2Path = performance2 ? generatePath(team2Points) : '';

  return (
    <div className={`${className}`}>
      <h3 className="text-white font-medium mb-4">{title}</h3>
      
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background grid */}
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, i) => (
          <polygon
            key={`grid-${i}`}
            points={categories.map((_, j) => {
              const angle = j * angleStep - Math.PI / 2;
              const x = center + radius * level * Math.cos(angle);
              const y = center + radius * level * Math.sin(angle);
              return `${x},${y}`;
            }).join(' ')}
            className="radar-chart-grid fill-none"
          />
        ))}
        
        {/* Axis lines */}
        {categories.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              className="radar-chart-axis"
            />
          );
        })}
        
        {/* Category labels */}
        {categories.map((category, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + (radius + 20) * Math.cos(angle);
          const y = center + (radius + 20) * Math.sin(angle);
          
          return (
            <text
              key={`label-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] fill-gray-400 uppercase font-medium"
            >
              {category.label}
            </text>
          );
        })}
        
        {/* Team 2 polygon (render below team 1) */}
        {performance2 && (
          <path
            d={team2Path}
            fill={team2Color}
            stroke={team2Color}
            className="radar-chart-area"
            fillOpacity="0.2"
          />
        )}
        
        {/* Team 1 polygon */}
        <path
          d={team1Path}
          fill={team1Color}
          stroke={team1Color}
          className="radar-chart-area"
          fillOpacity="0.2"
        />
        
        {/* Data points for team 1 */}
        {team1Points.map((point, i) => (
          <circle
            key={`point1-${i}`}
            cx={point.x}
            cy={point.y}
            r="3"
            fill={team1Color}
          />
        ))}
        
        {/* Data points for team 2 */}
        {performance2 && team2Points.map((point, i) => (
          <circle
            key={`point2-${i}`}
            cx={point.x}
            cy={point.y}
            r="3"
            fill={team2Color}
          />
        ))}
      </svg>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: team1Color }} />
          <span className="text-xs text-white font-medium">{performance1.team.name}</span>
        </div>
        
        {performance2 && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: team2Color }} />
            <span className="text-xs text-white font-medium">{performance2.team.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};
