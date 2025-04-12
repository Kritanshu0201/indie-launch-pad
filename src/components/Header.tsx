
import React from "react";
import { PlusCircle, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Dashboard";
    if (path.startsWith("/projects/")) return "Project Details";
    if (path === "/calendar") return "Calendar";
    return "ProjectPilot";
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {isMobile && <h1 className="font-semibold text-lg">{getPageTitle()}</h1>}
          {!isMobile && (
            <div className="relative w-60">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-9 bg-muted"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Bell size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <div className="flex items-center justify-between p-2 border-b border-border">
                <span className="font-medium">Notifications</span>
                <Button variant="link" size="sm" className="h-auto p-0">
                  Mark all read
                </Button>
              </div>
              <div className="py-2 text-center text-muted-foreground">
                No new notifications
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            size={isMobile ? "icon" : "default"} 
            onClick={() => {
              // Open modal to create new project
              console.log("Create new project");
            }}
          >
            <PlusCircle size={18} className="mr-1" />
            {!isMobile && "New Project"}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
