import { FileUp, Folder, FolderUp } from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";

const PopoverActions = () => {
  return (
    <>
      <div
        className="flex items-center hover:bg-slate-100 dark:hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
        role="button"
      >
        <Folder className="w-4 h-4" />
        <span>New Folder</span>
      </div>
      <Separator />
      <div
        className="flex items-center hover:bg-slate-100 dark:hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
        role="button"
      >
        <FileUp className="w-4 h-4" />
        <span>File Upload</span>
      </div>

      <div
        className="flex items-center hover:bg-slate-100 dark:hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
        role="button"
      >
        <FolderUp className="w-4 h-4" />
        <span>Folder Upload</span>
      </div>
    </>
  );
};

export default PopoverActions;
