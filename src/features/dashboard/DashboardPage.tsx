
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Calendar, Users, BarChart3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const DashboardPage: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Soccer League Manager"
        subtitle="Welcome to your league management dashboard"
        dataUpdatedAt={new Date()}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        actionButton={
          <Button className="gap-2">
            <Trophy className="h-4 w-4" />
            Create League
          </Button>
        }
      />
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-black/30 border-white/10">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Leagues</p>
              <h3 className="text-2xl font-bold text-white mt-1">24</h3>
            </div>
            <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-white/10">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Active Teams</p>
              <h3 className="text-2xl font-bold text-white mt-1">186</h3>
            </div>
            <div className="h-12 w-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-white/10">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Upcoming Matches</p>
              <h3 className="text-2xl font-bold text-white mt-1">32</h3>
            </div>
            <div className="h-12 w-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-white/10">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Match Reports</p>
              <h3 className="text-2xl font-bold text-white mt-1">157</h3>
            </div>
            <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Leagues Overview */}
      <Card className="bg-black/30 border-white/10">
        <CardHeader>
          <CardTitle className="text-xl text-white">Leagues Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Active Leagues</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-blue-900/20 border border-blue-500/20">
                  <div>
                    <h3 className="font-medium text-white">Premier League 2025</h3>
                    <p className="text-sm text-blue-300">12 teams • In progress</p>
                  </div>
                  <Button variant="outline" size="sm" className="bg-blue-500/20 border-blue-500/20 text-blue-300 hover:bg-blue-500/30">
                    View
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-green-900/20 border border-green-500/20">
                  <div>
                    <h3 className="font-medium text-white">Champions Cup</h3>
                    <p className="text-sm text-green-300">16 teams • Group stage</p>
                  </div>
                  <Button variant="outline" size="sm" className="bg-green-500/20 border-green-500/20 text-green-300 hover:bg-green-500/30">
                    View
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-purple-900/20 border border-purple-500/20">
                  <div>
                    <h3 className="font-medium text-white">Regional League</h3>
                    <p className="text-sm text-purple-300">8 teams • Week 3/10</p>
                  </div>
                  <Button variant="outline" size="sm" className="bg-purple-500/20 border-purple-500/20 text-purple-300 hover:bg-purple-500/30">
                    View
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <p className="text-gray-400 py-4">Completed leagues will appear here.</p>
            </TabsContent>
            <TabsContent value="upcoming">
              <p className="text-gray-400 py-4">Upcoming leagues will appear here.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Recent Matches & Upcoming Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-xl text-white">Recent Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center">
                <div className="w-16 text-center">
                  <span className="text-green-400 text-sm font-medium">3-1</span>
                </div>
                <div className="flex-1 flex items-center justify-between px-3">
                  <span className="text-white">Manchester United</span>
                  <span className="text-white">Arsenal</span>
                </div>
                <div className="w-24 text-right">
                  <span className="text-gray-400 text-sm">Yesterday</span>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center">
                <div className="w-16 text-center">
                  <span className="text-blue-400 text-sm font-medium">2-2</span>
                </div>
                <div className="flex-1 flex items-center justify-between px-3">
                  <span className="text-white">Liverpool</span>
                  <span className="text-white">Chelsea</span>
                </div>
                <div className="w-24 text-right">
                  <span className="text-gray-400 text-sm">2 days ago</span>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center">
                <div className="w-16 text-center">
                  <span className="text-red-400 text-sm font-medium">0-2</span>
                </div>
                <div className="flex-1 flex items-center justify-between px-3">
                  <span className="text-white">Tottenham</span>
                  <span className="text-white">Manchester City</span>
                </div>
                <div className="w-24 text-right">
                  <span className="text-gray-400 text-sm">3 days ago</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-xl text-white">Upcoming Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center">
                <div className="w-16 text-center">
                  <span className="text-amber-400 text-sm font-medium">15:30</span>
                </div>
                <div className="flex-1 flex items-center justify-between px-3">
                  <span className="text-white">Newcastle</span>
                  <span className="text-white">Everton</span>
                </div>
                <div className="w-24 text-right">
                  <span className="text-gray-400 text-sm">Tomorrow</span>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center">
                <div className="w-16 text-center">
                  <span className="text-amber-400 text-sm font-medium">18:00</span>
                </div>
                <div className="flex-1 flex items-center justify-between px-3">
                  <span className="text-white">West Ham</span>
                  <span className="text-white">Brighton</span>
                </div>
                <div className="w-24 text-right">
                  <span className="text-gray-400 text-sm">Tomorrow</span>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center">
                <div className="w-16 text-center">
                  <span className="text-amber-400 text-sm font-medium">12:45</span>
                </div>
                <div className="flex-1 flex items-center justify-between px-3">
                  <span className="text-white">Aston Villa</span>
                  <span className="text-white">Leicester</span>
                </div>
                <div className="w-24 text-right">
                  <span className="text-gray-400 text-sm">Sat, May 3</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <Card className="bg-black/30 border-white/10">
        <CardHeader>
          <CardTitle className="text-xl text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 bg-green-900/20 border-green-500/20 hover:bg-green-900/30 hover:border-green-500/30">
              <Trophy className="h-6 w-6 text-green-400" />
              <span className="text-white">Create League</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 bg-blue-900/20 border-blue-500/20 hover:bg-blue-900/30 hover:border-blue-500/30">
              <Calendar className="h-6 w-6 text-blue-400" />
              <span className="text-white">Schedule Match</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 bg-amber-900/20 border-amber-500/20 hover:bg-amber-900/30 hover:border-amber-500/30">
              <Users className="h-6 w-6 text-amber-400" />
              <span className="text-white">Add Team</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 bg-purple-900/20 border-purple-500/20 hover:bg-purple-900/30 hover:border-purple-500/30">
              <BarChart3 className="h-6 w-6 text-purple-400" />
              <span className="text-white">View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
