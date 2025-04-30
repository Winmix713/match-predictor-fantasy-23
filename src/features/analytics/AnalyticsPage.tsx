
import React from 'react';
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { BarChart3 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Analytics & Reports"
        subtitle="Visualize data and generate insights"
        dataUpdatedAt={new Date()}
        isRefreshing={false}
        onRefresh={() => {}}
        actionButton={
          <Button className="gap-2">
            <BarChart3 className="h-4 w-4" />
            New Report
          </Button>
        }
      />
      
      <div className="flex items-center justify-center h-64 bg-black/20 rounded-lg border border-white/10">
        <p className="text-white">Analytics module will be implemented in Phase 3</p>
      </div>
    </div>
  );
};

export default AnalyticsPage;
