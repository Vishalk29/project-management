import type { Project } from "@/types";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Progress } from "../ui/progress";
import { getTaskStatusColor } from "@/lib/routes";

interface ProjectCardProps {
  project: Project; // Project object with details
  progress: number; // % of tasks completed
  workspaceId: string; // Parent workspace ID for routing
}

// ✅ ProjectCard component: Displays a single project inside a card
export const ProjectCard = ({
  project,
  progress,
  workspaceId,
}: ProjectCardProps) => {
  return (
    // 🔗 Navigate to project details page when clicked
    <Link to={`/workspaces/${workspaceId}/projects/${project._id}`}>
      <Card className="transition-all duration-300 hover:shadow-md hover:translate-y-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            {/* Project Title */}
            <CardTitle>{project.title}</CardTitle>

            {/* Project Status Badge */}
            <span
              className={cn(
                "text-xs rounded-full",
                getTaskStatusColor(project.status) // dynamic color based on status
              )}
            >
              {project.status}
            </span>
          </div>

          {/* Project Description (truncated to 2 lines) */}
          <CardDescription className="line-clamp-2">
            {project.description || "No description"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* 📊 Project Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>

              <Progress value={progress} className="h-2" />
            </div>

            {/* 📌 Tasks count + Due date */}
            <div className="flex items-center justify-between">
              {/* Number of tasks */}
              <div className="flex items-center text-sm gap-2 text-muted-foreground">
                <span>{project.tasks.length}</span>
                <span>Tasks</span>
              </div>

              {/* Due date if available */}
              {project.dueDate && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarDays className="w-4 h-4" />
                  <span>{format(project.dueDate, "MMM d, yyyy")}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
