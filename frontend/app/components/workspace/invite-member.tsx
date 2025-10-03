import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, Link2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useGenerateInviteLink } from "@/hooks/use-workspace";

interface InviteMemberDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: string;
}

export const InviteMemberDialog = ({
  isOpen,
  onOpenChange,
  workspaceId,
}: InviteMemberDialogProps) => {
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);

  const { mutate, isPending } = useGenerateInviteLink(workspaceId);

  const handleGenerate = () => {
    mutate("member", {
      onSuccess: (data) => setInviteLink(data.invitationLink),
      onError: (err: any) =>
        toast.error(err.response?.data?.message || "Failed to generate link"),
    });
  };

  const handleCopy = () => {
    if (!inviteLink) return;
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite to Workspace</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <Button
            onClick={handleGenerate}
            disabled={isPending}
            variant="secondary"
          >
            <Link2 className="w-4 h-4 mr-2" />
            {isPending ? "Generating..." : "Generate Invite Link"}
          </Button>

          {inviteLink && (
            <div className="flex items-center space-x-2">
              <Input readOnly value={inviteLink} />
              <Button onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
