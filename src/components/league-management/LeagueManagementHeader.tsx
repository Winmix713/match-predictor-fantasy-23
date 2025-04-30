
import React from 'react';
import { ArrowLeft, Trophy, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface LeagueManagementHeaderProps {
  onCreateLeague: () => void;
  isCreateMode: boolean;
  onBackToList: () => void;
}

const LeagueManagementHeader: React.FC<LeagueManagementHeaderProps> = ({
  onCreateLeague,
  isCreateMode,
  onBackToList
}) => {
  return (
    <div className="flex flex-col space-y-6">
      {isCreateMode ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBackToList} className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Új bajnokság létrehozása</h1>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Trophy className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Bajnokság kezelés</h1>
              <p className="text-muted-foreground text-sm">Kezelje bajnokságait és tornáit</p>
            </div>
          </div>
          
          <Button onClick={onCreateLeague} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Új bajnokság</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default LeagueManagementHeader;
