import { CirclePlus, LayoutGrid } from "lucide-react"; // Icons
import { Button } from "./ui/button";

// ----------------------------------------------------
// 🔹 Props interface
// - title: Main heading text
// - description: Small explanatory text
// - buttonText: Label for action button
// - buttonAction: Function to call when button clicked
// ----------------------------------------------------
interface NoDataFoundProps {
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
}

// ----------------------------------------------------
// 🚫 NoDataFound Component
// - Shown when no data is available (empty state)
// - Displays an icon, message, and CTA button
// ----------------------------------------------------
export const NoDataFound = ({
  title,
  description,
  buttonText,
  buttonAction,
}: NoDataFoundProps) => {
  return (
    <div className="col-span-full text-center py-12 2xl:py-24 bg-muted/40 rounded-lg">
      {/* 📌 Empty state icon */}
      <LayoutGrid className="size-12 mx-auto text-muted-foreground" />

      {/* 📌 Main title */}
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>

      {/* 📌 Supporting description */}
      <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
        {description}
      </p>

      {/* 📌 Action button (calls passed handler) */}
      <Button onClick={buttonAction} className="mt-4">
        <CirclePlus className="size-4 mr-2" /> {/* Small plus icon */}
        {buttonText}
      </Button>
    </div>
  );
};
