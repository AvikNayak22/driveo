import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { HelpCircle, Settings } from "lucide-react";
import UserBox from "./UserBox";
import { Avatar, AvatarFallback } from "../ui/avatar";

const Navbar = () => {
  const { userId } = auth();

  return (
    <div className="h-[10vh] fixed left-0 top-0 right-0 z-30 bg-slate-100 dark:bg-slate-700">
      <div className="flex items-center justify-between my-4 mx-6">
        <Link href="/">
          <h3 className="flex items-center text-2xl font-bold dark:text-white">
            Driveo
          </h3>
        </Link>

        <div className="flex items-center space-x-2">
          <ModeToggle />
          <div
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-full transition"
            role="button"
          >
            <HelpCircle className="w-5 h-5 dark:text-white" />
          </div>
          <div
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-full transition"
            role="button"
          >
            <Settings className="w-5 h-5 dark:text-white" />
          </div>
          {userId ? (
            <UserBox />
          ) : (
            <Avatar className="cursor-pointer">
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
