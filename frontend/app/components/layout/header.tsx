import { useAuth } from "@/provider/auth-context";
import type { Workspace } from "@/types";
import React from "react";
import { Button } from "../ui/button";
import { Bell, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useLoaderData } from "react-router";
import WorkspaceAvatar from "../workspace/workspace-avatar";

// ---------------------------------------------
// 🔑 Header Component Props
// ---------------------------------------------
interface HeaderProps {
  onWorkspaceSelected: (workspace: Workspace) => void; // function when workspace is picked
  selectedWorkspace: Workspace | null; // current selected workspace
  onCreateWorkspace: () => void; // function when "create workspace" is clicked
}

const Header = ({
  onWorkspaceSelected,
  selectedWorkspace,
  onCreateWorkspace,
}: HeaderProps) => {
  const { user, logout } = useAuth(); // get logged-in user + logout method
  const { workspaces } = useLoaderData() as { workspaces: Workspace[] };
  console.log(workspaces)

  return (
    // 🔒 Sticky header always visible, with border
    <div className="bg-background sticky top-0 z-40 border-b">
      {/* Inner container with flex: space between WorkspaceDropdown (left) & UserMenu (right) */}
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* ---------------------------------------------
            LEFT SECTION: Workspace Selector
           --------------------------------------------- */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedWorkspace ? (
                <>
                  {/* If workspace selected, show its avatar + name */}
                  {selectedWorkspace.color && (
                    <WorkspaceAvatar
                      color={selectedWorkspace.color}
                      name={selectedWorkspace.name}
                    />
                  )}
                  <span>{selectedWorkspace?.name}</span>
                </>
              ) : (
                // Default text when no workspace is selected
                <span className="font-medium">Select Workspace</span>
              )}
            </Button>
          </DropdownMenuTrigger>

          {/* Dropdown content for workspaces */}
          <DropdownMenuContent>
            <DropdownMenuLabel>Workspace</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* List of workspaces (click → select) */}
            <DropdownMenuGroup>
              {workspaces.map((ws) => (
                <DropdownMenuItem
                  key={ws.id}
                  onClick={() => onWorkspaceSelected(ws)}
                >
                  {ws.color && (
                    <WorkspaceAvatar color={ws.color} name={ws.name} />
                  )}
                  <span className="ml-2">{ws.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            {/* Option to create a new workspace */}
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onCreateWorkspace}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Create Workspace
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ---------------------------------------------
            RIGHT SECTION: Notification Bell + User Menu
           --------------------------------------------- */}
        <div className="flex items-center gap-2 p-6">
          {/* Notification Bell Button */}
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center justify-center"
          >
            <Bell />
          </Button>

          {/* User Dropdown (Profile + Logout) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center justify-center rounded-full border p-1 w-8 h-8">
                <Avatar className="w-8 h-8">
                  {/* Profile picture if exists, else fallback with first letter of name */}
                  <AvatarImage src={user?.profilePicture} alt={user?.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            {/* User menu content */}
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Profile link */}
              <DropdownMenuItem>
                <Link to="/user/profile">Profile</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Logout action */}
              <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
