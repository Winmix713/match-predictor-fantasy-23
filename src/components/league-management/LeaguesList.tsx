
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Users, Settings, Trash2, Copy, Edit } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { LeagueData } from "@/types/league";

interface LeaguesListProps {
  type: 'active' | 'archive' | 'template';
  isLoading: boolean;
}

const LeaguesList: React.FC<LeaguesListProps> = ({ type, isLoading }) => {
  // Mock data for demo purposes
  const mockLeagues: LeagueData[] = [
    { 
      id: "1", 
      name: "Premier League", 
      season: "2023-2024",
      status: 'in-progress',
      teams: ["Manchester United", "Liverpool", "Chelsea", "Arsenal"]
    },
    { 
      id: "2", 
      name: "La Liga", 
      season: "2023-2024",
      status: 'in-progress',
      teams: ["Barcelona", "Real Madrid", "Atletico Madrid", "Valencia"]
    },
    { 
      id: "3", 
      name: "Bundesliga", 
      season: "2023-2024",
      status: 'in-progress',
      teams: ["Bayern Munich", "Dortmund", "Leipzig", "Leverkusen"]
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <Card key={item} className="border border-border bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
                <div className="flex items-center gap-4 mt-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <div className="flex justify-between mt-2">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Filter leagues based on type for a real application
  const leagues = mockLeagues;

  if (leagues.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Trophy className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">Nincsenek {type === 'active' ? 'aktív bajnokságok' : type === 'archive' ? 'archivált bajnokságok' : 'sablonok'}</h3>
        <p className="text-muted-foreground mt-2 mb-6">
          {type === 'active' 
            ? 'Hozzon létre egy új bajnokságot a kezdéshez.' 
            : type === 'archive' 
            ? 'A befejezett bajnokságok itt fognak megjelenni.' 
            : 'Hozzon létre bajnokság sablonokat a gyors indításhoz.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {leagues.map((league) => (
        <Card key={league.id} className="border border-border bg-card hover:border-blue-500/30 transition-colors duration-200">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{league.name}</h3>
                <p className="text-muted-foreground text-sm">{league.season}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-sm">{league.teams?.length || 0} csapat</span>
              </div>
              
              <div className="flex justify-between pt-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Settings className="h-4 w-4" />
                  <span>Kezelés</span>
                </Button>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Copy className="h-4 w-4" />
                  </Button>
                  {type === 'active' && (
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LeaguesList;
