
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon: Icon, label, isCollapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
          isCollapsed && "justify-center"
        )
      }
    >
      <Icon size={20} />
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const links = [
    {
      to: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      to: "/calendar",
      icon: Calendar,
      label: "Calendar",
    },
    {
      to: "/settings",
      icon: Settings,
      label: "Settings",
    },
  ];

  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-3 left-3 z-50"
          onClick={toggleMobileSidebar}
        >
          <Menu size={20} />
        </Button>
        <div
          className={cn(
            "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity",
            isMobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={toggleMobileSidebar}
        />
        <aside
          className={cn(
            "fixed left-0 top-0 z-40 h-full w-64 bg-card border-r border-border transition-transform duration-300",
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex justify-between items-center h-14 px-4 border-b border-border">
            <h2 className="font-semibold text-lg">ProjectPilot</h2>
            <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
              <ChevronLeft size={18} />
            </Button>
          </div>
          <nav className="flex flex-col gap-1 p-2">
            {links.map((link) => (
              <SidebarLink
                key={link.to}
                to={link.to}
                icon={link.icon}
                label={link.label}
                isCollapsed={false}
              />
            ))}
          </nav>
        </aside>
      </>
    );
  }

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 border-r border-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex justify-between items-center h-14 px-4 border-b border-border">
        {!isCollapsed && <h2 className="font-semibold text-lg">ProjectPilot</h2>}
        <Button
          variant="ghost"
          size="icon"
          className={cn(!isCollapsed && "ml-auto")}
          onClick={toggleSidebar}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      <nav className="flex flex-col gap-1 p-2">
        {links.map((link) => (
          <SidebarLink
            key={link.to}
            to={link.to}
            icon={link.icon}
            label={link.label}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
