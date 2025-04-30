
import React, { useState } from 'react';
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { PlusCircle, List, Grid, Database, TableProperties } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LeagueManagementHeader from "@/components/league-management/LeagueManagementHeader";
import LeaguesList from "@/components/league-management/LeaguesList";
import LeagueCreator from "@/components/LeagueCreator";

const LeagueManagement = () => {
  const [activeView, setActiveView] = useState<'list' | 'create'>('list');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateLeague = () => {
    setActiveView('create');
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <Header />
      <div className="container mx-auto px-4">
        <LeagueManagementHeader 
          onCreateLeague={handleCreateLeague}
          isCreateMode={activeView === 'create'}
          onBackToList={() => setActiveView('list')}
        />
        
        {activeView === 'list' ? (
          <div className="mt-6">
            <Tabs defaultValue="active" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="active">Aktív bajnokságok</TabsTrigger>
                  <TabsTrigger value="archive">Archívum</TabsTrigger>
                  <TabsTrigger value="templates">Sablonok</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-9 gap-1">
                    <List className="h-4 w-4" />
                    <span>Lista</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 gap-1">
                    <Grid className="h-4 w-4" />
                    <span>Kártya</span>
                  </Button>
                </div>
              </div>
              
              <TabsContent value="active">
                <LeaguesList type="active" isLoading={isLoading} />
              </TabsContent>
              
              <TabsContent value="archive">
                <LeaguesList type="archive" isLoading={isLoading} />
              </TabsContent>
              
              <TabsContent value="templates">
                <LeaguesList type="template" isLoading={isLoading} />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <LeagueCreator onCancel={() => setActiveView('list')} />
        )}
      </div>
    </div>
  );
};

export default LeagueManagement;
