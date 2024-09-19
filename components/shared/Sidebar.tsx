import React from "react";
import { Button } from "../ui/button";
import { Clock5, Cloud, Plus, Star, Tablet, Trash } from "lucide-react";
import Link from "next/link";
import Item from "./Item";
import { Progress } from "../ui/progress";

const Sidebar = () => {
  return (
    <div className="h-[90vh] border-r w-72 fixed top-[10vh] left-0 z-30 bg-slate-100 dark:bg-slate-700">
      <div className="flex flex-col p-3">
        <Button className="w-fit h-12 rounded-2xl px-6">
          <Plus />
          <span>New</span>
        </Button>
        <div className="flex flex-col space-y-6 mt-8">
          {sidebarLinks.map((link) => (
            <Link href={link.path} key={link.label}>
              <Item icon={link.icon} label={link.label} />
            </Link>
          ))}
          <div className="flex flex-col space-y-2 mx-4">
            <Progress className="h-2" value={30} />
            <span className="dark:text-white">20 MB of 1.5 GB used</span>
            <Button
              className="rounded-full dark:text-white dark:border-white dark:hover:bg-slate-400 dark:hover:border-none hover:bg-slate-200"
              variant="outline"
            >
              Get more storage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const sidebarLinks = [
  {
    label: "My drive",
    icon: Tablet,
    path: "/",
  },
  {
    label: "Starred",
    icon: Star,
    path: "/starred",
  },
  {
    label: "Recent",
    icon: Clock5,
    path: "/recent",
  },
  {
    label: "Trash",
    icon: Trash,
    path: "/trash",
  },
  {
    label: "Storage",
    icon: Cloud,
    path: "/cloud",
  },
];
