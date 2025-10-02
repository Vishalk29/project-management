import { cn } from "@/lib/utils";
import { useAuth } from "@/provider/auth-context";
import type { Workspace } from "@/types";
import {
  CheckCircle2,
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  ListCheck,
  LogOut,
  Settings,
  Users,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { SidebarNav } from "./sidebar-nav";

// ---------------------------------------------
// 🔑 Sidebar Component
// Props: currentWorkspace (optional)
// ---------------------------------------------
export const SidebarComponent = ({
  currentWorkspace,
}: {
  currentWorkspace: Workspace | null;
}) => {
  const { logout } = useAuth(); // logout function from auth context
  const [isCollapsed, setIsCollapsed] = useState(false); // toggle sidebar collapse/expand

  // ---------------------------------------------
  // 📌 Sidebar Navigation Items
  // ---------------------------------------------
  const navItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Workspaces", href: "/workspaces", icon: Users },
    { title: "My Tasks", href: "/my-tasks", icon: ListCheck },
    { title: "Members", href: "/members", icon: Users },
    { title: "Achieved", href: "/achieved", icon: CheckCircle2 },
    { title: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    // ---------------------------------------------
    // 🖼 Sidebar Wrapper
    // ---------------------------------------------
    <div
      className={cn(
        "flex flex-col border-r bg-sidebar transition-all duration-300",
        isCollapsed ? "w-16 md:w-[80px]" : "w-16 md:w-[240px]"
      )}
    >
      {/* ---------------------------------------------
          HEADER SECTION (Logo + Collapse Toggle)
         --------------------------------------------- */}
      <div className="flex h-14 items-center border-b px-4 mb-4">
        {/* Logo / App Name */}
        <Link to="/dashboard" className="flex items-center">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Wrench className="size-6 text-blue-600" />
              <span className="font-semibold text-lg hidden md:block">
                Tasks
              </span>
            </div>
          )}
          {isCollapsed && <Wrench className="size-6 text-blue-600" />}
        </Link>

        {/* Collapse/Expand Button (only visible on md+) */}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto hidden md:block"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronsRight className="size-4" />
          ) : (
            <ChevronsLeft className="size-4" />
          )}
        </Button>
      </div>

      {/* ---------------------------------------------
          NAVIGATION SECTION
         --------------------------------------------- */}
      <ScrollArea className="flex-1 px-3 py-2">
        <SidebarNav
          items={navItems}
          isCollapsed={isCollapsed}
          className={cn(isCollapsed && "items-center space-y-2")}
          currentWorkspace={currentWorkspace}
        />
      </ScrollArea>

      {/* ---------------------------------------------
          FOOTER SECTION (Logout Button)
         --------------------------------------------- */}
      <div>
        <Button
          variant="ghost"
          size={isCollapsed ? "icon" : "default"}
          onClick={logout}
          className="hover:pointer"
        >
          <LogOut className={cn("size-4", isCollapsed && "mr-2")} />
          <span className="hidden md:block">Logout</span>
        </Button>
      </div>
    </div>
  );
};
