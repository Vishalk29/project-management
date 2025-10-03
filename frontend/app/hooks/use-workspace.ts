import type { WorkspaceForm } from "@/components/workspace/create-workpace";
import { getData, postData } from "@/lib/fetch-utils";
import { useMutation, useQuery } from "@tanstack/react-query";

interface GenerateInviteResponse {
  invitationLink: string;
}
export const useCreateWorkspace = () => {
  return useMutation({
    mutationFn: async (data: WorkspaceForm) => postData("/workspaces", data),
  });
};

export const useGetWorkspacesQuery = () => {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => getData("/workspaces"),
  });
};

export const useGetWorkspaceQuery = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => getData(`/workspaces/${workspaceId}/projects`),
  });
};
export const useGetWorkspaceStatsQuery = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspace", workspaceId, "stats"],
    queryFn: async () => getData(`/workspaces/${workspaceId}/stats`),
  });
};

export const useGetWorkspaceDetailsQuery = (workspaceId: string) => {
  return useQuery({
    queryKey: ["workspace", workspaceId, "details"],
    queryFn: async () => getData(`/workspaces/${workspaceId}`),
  });
};

// Generate workspace invite link mutation hook
export const useGenerateInviteLink = (workspaceId: string) => {
  return useMutation<GenerateInviteResponse, any, string>({
    mutationFn: async (role: string) => {
      return postData(`/workspaces/${workspaceId}/generate-invite-link`, {
        role,
      });
    },
  });
};

export const useAcceptInviteByTokenMutation = () => {
  return useMutation({
    mutationFn: (token: string) =>
      postData(`/workspaces/accept-invite`, { token }), // <-- updated endpoint
  });
};

export const useAcceptGenerateInviteMutation = () => {
  return useMutation({
    mutationFn: (workspaceId: string) =>
      postData(`/workspaces/${workspaceId}/accept-generate-invite`, {}),
  });
};
