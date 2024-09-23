"use client";

import React, { ElementRef, useRef, useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { IFolderAndFile } from "@/types";
import { File, Folder, Minus } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";
import { byteConverter } from "@/lib/utils";
import ListAction from "./ListAction";
import { useRouter } from "next/navigation";

interface ListItemProps {
  item: IFolderAndFile;
}

const ListItem = ({ item }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setvalue] = useState("");
  const inputRef = useRef<ElementRef<"input">>(null);
  const router = useRouter();
  const { user } = useUser();

  const onStartEditing = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    setIsEditing(true);
  };

  return (
    <TableRow className="group cursor-pointer">
      <TableCell className="font-medium">
        {!isEditing ? (
          <div
            className="flex items-center space-x-1"
            role="button"
            onDoubleClick={onStartEditing}
          >
            {item.size ? (
              <File className="w-4 h-4 text-blue-500" />
            ) : (
              <Folder className="w-4 h-4 text-gray-500 fill-gray-500 " />
            )}
            <span>{item.name}</span>
          </div>
        ) : (
          <></>
        )}
      </TableCell>
      <TableCell className="flex items-center space-x-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.imageUrl} />
        </Avatar>
        <span className="opacity-75">me</span>
      </TableCell>
      <TableCell>
        {format(new Date(item.timestamp.seconds * 1000), "MMM dd, yyyy")}
      </TableCell>
      <TableCell>{item.size ? byteConverter(item.size) : <Minus />}</TableCell>
      <TableCell className="flex justify-end group items-center space-x-2">
        <ListAction item={item} />
      </TableCell>
    </TableRow>
  );
};

export default ListItem;
