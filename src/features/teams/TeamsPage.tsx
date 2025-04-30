
import React from 'react';
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

const TeamsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Teams Management"
        subtitle="Manage your teams and players"
        dataUpdatedAt={new Date()}
        isRefreshing={false}
        onRefresh={() => {}}
        actionButton={
          <Button className="gap-2">
            <Users className="h-4 w-4" />
            Add Team
          </Button>
        }
      />
      
      <div className="flex items-center justify-center h-64 bg-black/20 rounded-lg border border-white/10">
        <p className="text-white">Teams management module will be implemented in Phase 2</p>
      </div>
    </div>
  );
};

export default TeamsPage;
