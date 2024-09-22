import { IFolderAndFile } from "@/types";
import { Paperclip } from "lucide-react";
import React from "react";

interface SuggestCardProps {
  item: IFolderAndFile;
}

const SuggestCard = ({ item }: SuggestCardProps) => {
  return (
    <div className="max-w-[300px] max-h-[400px] h-[210px] flex flex-col rounded-md shadow-md p-4 bg-slate-100 dark:text-white dark:bg-slate-600 group">
      <div className="flex items-center space-x-2" role="button">
        <Paperclip className="w-4 h-4 text-blue-500" />
        <span className="text-sm opacity-70">{item.name}</span>
      </div>
      <div className="relative h-[70%] w-full bg-white dark:bg-black mt-2 rounded-md"></div>
    </div>
  );
};

export default SuggestCard;
