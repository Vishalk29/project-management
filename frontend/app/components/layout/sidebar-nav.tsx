import { cn } from "@/lib/utils";
import type { Workspace } from "@/types";
import type { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router";

// ---------------------------------------------
// 🔑 SidebarNav Component
// Props:
//  - items: list of navigation links { title, href, icon }
//  - isCollapsed: whether sidebar is collapsed (icon-only view)
//  - currentWorkspace: selected workspace (used to build URLs)
//  - className: optional extra classes for nav wrapper
// ---------------------------------------------
interface SidebarNavProps extends React.HtmlHTMLAttributes<HTMLElement> {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
  isCollapsed: boolean;
  currentWorkspace: Workspace | null;
  className?: string;
}

export const SidebarNav = ({
  items,
  isCollapsed,
  className,
  currentWorkspace,
  ...props
}: SidebarNavProps) => {
  const location = useLocation(); // current URL path
  const navigate = useNavigate(); // programmatic navigation

  return (
    // ---------------------------------------------
    // 🖼 Wrapper <nav>
    // - Flex column layout
    // - Optional extra className
    // ---------------------------------------------
    <nav className={cn("flex flex-col gap-y-2", className)} {...props}>
      {/* Map through navigation items */}
      {items.map((el) => {
        const Icon = el.icon;
        const isActive = location.pathname === el.href; // highlight active item

        // Handle button click (workspace-aware navigation)
        const handleClick = () => {
          if (el.href === "/workspaces") {
            // Workspaces route → navigate directly
            navigate(el.href);
          } else if (currentWorkspace && currentWorkspace._id) {
            // If workspace is selected → append ?workspaceId
            navigate(`${el.href}?workspaceId=${currentWorkspace._id}`);
          } else {
            // Fallback → plain navigation
            navigate(el.href);
          }
        };

        return (
          <Button
            key={el.href}
            variant={isActive ? "outline" : "ghost"} // outlined if active, ghost otherwise
            className={cn(
              "justify-start", // align icon+text to start
              isActive && "bg-blue-800/20 text-blue-600 font-medium" // active styling
            )}
            onClick={handleClick}
          >
            {/* Icon always visible */}
            <Icon className="mr-2 size-4" />

            {/* Title:
                - Collapsed → hide visually but keep accessible via sr-only
                - Expanded → show text
             */}
            {isCollapsed ? (
              <span className="sr-only">{el.title}</span>
            ) : (
              el.title
            )}
          </Button>
        );
      })}
    </nav>
  );
};
