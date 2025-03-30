"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function HeaderBar() {
  const useAuth = useSelector((state) => state.auth);
  const [username] = useState(
    useAuth?.username || localStorage.getItem("username")
  );
  const pathname = usePathname();
  const hiddenPaths = ["/auth"];

  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  return (
    <div className="h-[60px] flex justify-end items-center bg-blue-600 px-10">
      <h1 className="text-xl w-10 h-10 flex justify-center items-center font-bold bg-white rounded-full">
        {username?.charAt(0).toUpperCase()}
      </h1>
    </div>
  );
}
