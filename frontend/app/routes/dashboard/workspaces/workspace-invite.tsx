// import { useEffect, useState } from "react";

// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { toast } from "sonner";
// import Loader from "@/components/loader";
// import { useNavigate, useParams, useSearchParams } from "react-router";

// const WorkspaceInvite = () => {
//   const navigate = useNavigate();
//   const { workspaceId } = useParams();
//   const [searchParams] = useSearchParams();
//   const [loading, setLoading] = useState(true);

//   const token = searchParams.get("tk");

//   const { mutate } = useMutation({
//     mutationFn: async () => {
//       const { data } = await axios.post(
//         `/api/workspaces/accept-invite?token=${token}`
//       );
//       return data;
//     },
//     onSuccess: (data) => {
//       toast.success("Successfully joined workspace!");
//       navigate(`/workspace/${workspaceId}`);
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data?.message || "Failed to join workspace");
//       navigate("/");
//     },
//   });

//   useEffect(() => {
//     if (token) {
//       mutate();
//     } else {
//       toast.error("Invalid invite link");
//       navigate("/");
//     }
//     setLoading(false);
//   }, [token]);

//   if (loading) return <Loader />;

//   return null;
// };

// export default WorkspaceInvite;

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WorkspaceAvatar from "@/components/workspace/workspace-avatar";
import {
  useAcceptGenerateInviteMutation,
  useAcceptInviteByTokenMutation,
  useGetWorkspaceDetailsQuery,
} from "@/hooks/use-workspace";

import type { Workspace } from "@/types";
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { toast } from "sonner";

const WorkspaceInvite = () => {
  const { workspaceId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("tk");
  const navigate = useNavigate();

  if (!workspaceId) {
    return <div>Workspace not found</div>;
  }

  const { data: workspace, isLoading } = useGetWorkspaceDetailsQuery(
    workspaceId
  ) as { data: Workspace | undefined; isLoading: boolean };

  const {
    mutate: acceptInviteByToken,
    isPending: isAcceptInviteByTokenPending,
  } = useAcceptInviteByTokenMutation();

  const {
    mutate: acceptGenerateInvite,
    isPending: isAcceptGenerateInvitePending,
  } = useAcceptGenerateInviteMutation();

  const handleAcceptInvite = () => {
    if (!workspaceId) return;

    if (token) {
      acceptInviteByToken(token, {
        onSuccess: () => {
          toast.success("Invitation accepted");
          navigate(`/workspaces/${workspaceId}`);
        },
        onError: (err: any) => {
          toast.error(
            err.response?.data?.message || "Failed to accept invitation"
          );
          console.error(err);
        },
      });
    } else {
      acceptGenerateInvite(workspaceId, {
        onSuccess: () => {
          toast.success("Invitation accepted");
          navigate(`/workspaces/${workspaceId}`);
        },
        onError: (err: any) => {
          toast.error(
            err.response?.data?.message || "Failed to accept invitation"
          );
          console.error(err);
        },
      });
    }
  };

  const handleDeclineInvite = () => {
    toast.info("Invitation declined");
    navigate("/workspaces");
  };

  if (isLoading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Invalid Invitation</CardTitle>
            <CardDescription>
              This workspace invitation is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/workspaces")} className="w-full">
              Go to Workspaces
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <WorkspaceAvatar name={workspace.name} color={workspace.color} />
            <CardTitle>{workspace.name}</CardTitle>
          </div>
          <CardDescription>
            You've been invited to join the "<strong>{workspace.name}</strong>"
            workspace.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {workspace.description && (
            <p className="text-sm text-muted-foreground">
              {workspace.description}
            </p>
          )}

          <div className="flex gap-3">
            <Button
              variant="default"
              className="flex-1"
              onClick={handleAcceptInvite}
              disabled={
                isAcceptInviteByTokenPending || isAcceptGenerateInvitePending
              }
            >
              {isAcceptInviteByTokenPending || isAcceptGenerateInvitePending
                ? "Joining..."
                : "Accept Invitation"}
            </Button>

            <Button
              variant="outline"
              className="flex-1"
              onClick={handleDeclineInvite}
              disabled={
                isAcceptInviteByTokenPending || isAcceptGenerateInvitePending
              }
            >
              Decline
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspaceInvite;
