
import React from 'react';
import type { MatchStat } from '@/types/football';

interface StatsProgressBarProps {
  stat: MatchStat;
  homeColor?: string;
  awayColor?: string;
  showValues?: boolean;
  className?: string;
}

export const StatsProgressBar: React.FC<StatsProgressBarProps> = ({
  stat,
  homeColor = '#ff3d41',
  awayColor = '#2196f3',
  showValues = true,
  className,
}) => {
  const total = stat.home + stat.away;
  const homePercentage = total === 0 ? 50 : (stat.home / total) * 100;
  
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between text-xs text-gray-400">
        <span>{stat.type}</span>
        {showValues && (
          <span>
            {stat.home} - {stat.away}
          </span>
        )}
      </div>
      
      <div className="h-2 flex rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-500 animate-line-growth"
          style={{ 
            width: `${homePercentage}%`,
            backgroundColor: homeColor,
          }}
        />
        <div 
          className="h-full transition-all duration-500 animate-line-growth"
          style={{ 
            width: `${100 - homePercentage}%`,
            backgroundColor: awayColor,
          }}
        />
      </div>
    </div>
  );
};
