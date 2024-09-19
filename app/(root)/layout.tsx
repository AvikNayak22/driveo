import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className="w-full min-h-[90vh] relative top-[10vh] pl-72 p-4 bg-slate-100 dark:bg-slate-700">
        <div className="h-[90vh] p-8 rounded-md bg-white ml-4">{children}</div>
      </main>
    </div>
  );
};

export default RootLayout;
