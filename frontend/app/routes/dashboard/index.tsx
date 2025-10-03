import React from "react";
import { useSearchParams } from "react-router";

import { RecentProjects } from "@/components/dashboard/recent-projects";
import { StatisticsCharts } from "@/components/dashboard/statistics-charts";
import { StatsCard } from "@/components/dashboard/stats-card";
import Loader from "@/components/loader";
import { UpcomingTasks } from "@/components/upcoming-tasks";

import { useGetWorkspaceStatsQuery } from "@/hooks/use-workspace";

import type {
  Project,
  ProjectStatusData,
  StatsCardProps,
  Task,
  TaskPriorityData,
  TaskTrendsData,
  WorkspaceProductivityData,
} from "@/types";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");

  // If no workspace selected, don't run the query
  const { data, isPending } = useGetWorkspaceStatsQuery(workspaceId!) as {
    data:
      | {
          stats: StatsCardProps;
          taskTrendsData: TaskTrendsData[];
          projectStatusData: ProjectStatusData[];
          taskPriorityData: TaskPriorityData[];
          workspaceProductivityData: WorkspaceProductivityData[];
          upcomingTasks: Task[];
          recentProjects: Project[];
        }
      | undefined;
    isPending: boolean;
  };

  // No workspace selected
  if (!workspaceId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Please select a workspace to view the dashboard.
      </div>
    );
  }

  // Query is loading
  if (isPending || !data) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8 2xl:space-y-12">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Stats Overview */}
      <StatsCard data={data.stats} />

      {/* Charts Section */}
      <StatisticsCharts
        stats={data.stats}
        taskTrendsData={data.taskTrendsData}
        projectStatusData={data.projectStatusData}
        taskPriorityData={data.taskPriorityData}
        workspaceProductivityData={data.workspaceProductivityData}
      />

      {/* Projects & Upcoming Tasks */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentProjects data={data.recentProjects} />
        <UpcomingTasks data={data.upcomingTasks} />
      </div>
    </div>
  );
};

export default Dashboard;
