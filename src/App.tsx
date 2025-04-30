
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Matches from "./pages/Matches";
import NotFound from "./pages/NotFound";
import AdvancedPattern from "./pages/AdvancedPattern";
import Analysis from "./pages/Analysis";
import League from "./pages/League";
import LeagueManagement from "./pages/LeagueManagement";
import Brandbook from "./components/Brandbook";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./features/dashboard/DashboardPage";
import TeamsPage from "./features/teams/TeamsPage";
import AnalyticsPage from "./features/analytics/AnalyticsPage";
import FootballAnalytics from "./pages/FootballAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Dashboard as home page */}
          <Route path="/" element={<MainLayout><DashboardPage /></MainLayout>} />
          
          {/* Existing pages with MainLayout */}
          <Route path="/matches" element={<MainLayout><Matches /></MainLayout>} />
          <Route path="/advanced-pattern" element={<MainLayout><AdvancedPattern /></MainLayout>} />
          <Route path="/analysis" element={<MainLayout><Analysis /></MainLayout>} />
          <Route path="/league" element={<MainLayout><League /></MainLayout>} />
          <Route path="/league-management" element={<MainLayout><LeagueManagement /></MainLayout>} />
          
          {/* New pages */}
          <Route path="/teams" element={<MainLayout><TeamsPage /></MainLayout>} />
          <Route path="/analytics" element={<MainLayout><AnalyticsPage /></MainLayout>} />
          <Route path="/football-analytics" element={<MainLayout><FootballAnalytics /></MainLayout>} />
          
          {/* Development pages */}
          <Route path="/brandbook" element={<Brandbook />} />
          <Route path="/components" element={<Index />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
