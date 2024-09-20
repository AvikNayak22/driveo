"use client";

import { userFolder } from "@/hooks/useFolder";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const FolderModal = () => {
  const { isOpen, onClose } = userFolder();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-x-2"></div>
      </DialogContent>
    </Dialog>
  );
};

export default FolderModal;
