import { Button } from "@/components/ui/button";
import { useAuth } from "@/provider/auth-context";
import React from "react";

const DashBoardLayout = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default DashBoardLayout;
