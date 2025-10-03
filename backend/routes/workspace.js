import express from "express";
import {
  acceptInviteByToken,
  createWorkspace,
  generateWorkspaceInviteLink,
  getWorkspaceDetails,
  getWorkspaceProjects,
  getWorkspaces,
  getWorkspaceStats,
} from "../controllers/workspace-controller.js";
import { workspaceSchema } from "../libs/validation-schema.js";
import authMiddleware from "../middleware/auth-middleware.js";
import { validateRequest } from "zod-express-middleware";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validateRequest({ body: workspaceSchema }),
  createWorkspace
);

// Accept invite
router.post("/accept-invite", authMiddleware, acceptInviteByToken);

// Generate invite link
router.post(
  "/:workspaceId/generate-invite-link",
  authMiddleware,
  generateWorkspaceInviteLink
);
router.get("/", authMiddleware, getWorkspaces);
router.get("/:workspaceId", authMiddleware, getWorkspaceDetails);
router.get("/:workspaceId/projects", authMiddleware, getWorkspaceProjects);
router.get("/:workspaceId/stats", authMiddleware, getWorkspaceStats);
export default router;
