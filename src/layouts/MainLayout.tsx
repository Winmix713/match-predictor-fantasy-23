
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "@/components/Header";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from "@/components/ui/sidebar";
import { Calendar, Database, Trophy, Users, BarChart3, Home } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navigationItems = [
    { title: "Dashboard", path: "/", icon: Home },
    { title: "Matches", path: "/matches", icon: Calendar },
    { title: "League Management", path: "/league-management", icon: Trophy },
    { title: "Teams", path: "/teams", icon: Users },
    { title: "Analytics", path: "/analytics", icon: BarChart3 },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-b from-gray-950 via-gray-950 to-black">
        <Sidebar className="border-r border-white/10 bg-black/40 backdrop-blur-lg">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        active={location.pathname === item.path}
                      >
                        <a 
                          href={item.path} 
                          className={`flex items-center gap-3 ${
                            location.pathname === item.path 
                              ? 'text-blue-400' 
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 pt-24 pb-16 px-4 md:px-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
