import { NoDataFound } from "@/components/no-data-found";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateWorkspace } from "@/components/workspace/create-workpace";
import WorkspaceAvatar from "@/components/workspace/workspace-avatar";

import { useGetWorkspacesQuery } from "@/hooks/use-workspace";
import type { Workspace } from "@/types";
import { Loader, PlusCircle, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { format } from "date-fns";

// ----------------------------------------------------
// 📌 Workspaces Page
// - Lists all workspaces for the logged-in user
// - Allows creating a new workspace (modal)
// - Shows fallback when no workspaces exist
// ----------------------------------------------------
const Workspaces = () => {
  // ✅ State to toggle "Create Workspace" modal
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);

  // ✅ Fetch workspaces using RTK Query
  const { data: workspaces, isLoading } = useGetWorkspacesQuery() as {
    data: Workspace[];
    isLoading: boolean;
  };

  // ⏳ Loader while fetching workspaces
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* ---------------------------------------------
        🔹 Header section with title + create button
      ---------------------------------------------- */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-3xl font-bold">Workspaces</h2>

          <Button onClick={() => setIsCreatingWorkspace(true)}>
            <PlusCircle className="size-4 mr-2" />
            New Workspace
          </Button>
        </div>

        {/* ---------------------------------------------
          🔹 Grid of workspaces
          - Shows WorkspaceCard for each workspace
          - If none exist → show NoDataFound component
        ---------------------------------------------- */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workspaces.map((ws) => (
            <WorkspaceCard key={ws._id} workspace={ws} />
          ))}

          {workspaces.length === 0 && (
            <NoDataFound
              title="No workspaces found"
              description="Create a new workspace to get started"
              buttonText="Create Workspace"
              buttonAction={() => setIsCreatingWorkspace(true)}
            />
          )}
        </div>
      </div>

      {/* ---------------------------------------------
        🔹 CreateWorkspace modal
        - Controlled by isCreatingWorkspace state
      ---------------------------------------------- */}
      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </>
  );
};

// ----------------------------------------------------
// 📌 WorkspaceCard
// - Represents a single workspace in the list
// - Shows name, creation date, member count, description
// ----------------------------------------------------
const WorkspaceCard = ({ workspace }: { workspace: Workspace }) => {
  return (
    <Link to={`/workspaces/${workspace._id}`}>
      <Card className="transition-all hover:shadow-md hover:-translate-y-1">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            {/* Left side → avatar + name + createdAt */}
            <div className="flex gap-2">
              <WorkspaceAvatar name={workspace.name} color={workspace.color} />

              <div>
                <CardTitle>{workspace.name}</CardTitle>
                <span className="text-xs text-muted-foreground">
                  Created at {format(workspace.createdAt, "MMM d, yyyy h:mm a")}
                </span>
              </div>
            </div>

            {/* Right side → members count */}
            <div className="flex items-center text-muted-foreground">
              <Users className="size-4 mr-1" />
              <span className="text-xs">{workspace.members.length}</span>
            </div>
          </div>

          {/* Workspace description */}
          <CardDescription>
            {workspace.description || "No description"}
          </CardDescription>
        </CardHeader>

        {/* Footer text */}
        <CardContent>
          <div className="text-sm text-muted-foreground">
            View workspace details and projects
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Workspaces;
