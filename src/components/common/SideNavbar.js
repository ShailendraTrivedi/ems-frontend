"use client";
import { logout } from "@/redux/slices/authSlice";
import Cookies from "js-cookie";
import { Hotel, House, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function SideNavbar() {
  const dispatch = useDispatch();
  const isToken = Cookies.get("token");
  const router = useRouter();
  const pathname = usePathname();
  const hiddenPaths = ["/auth"];

  useEffect(() => {
    if (!isToken) {
      router.push("/auth");
    }
  }, [isToken, router]);

  const navigateToURL = (url) => {
    router.push(url ?? "/");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/auth");
    dispatch(logout());
  };

  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  return (
    <div className="flex flex-col w-[20rem] bg-blue-100">
      <div className="bg-blue-600 p-2 py-4 text-white text-xl text-center font-bold">
        Event Management System
      </div>
      <div className="flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-2">
          <li
            onClick={() => navigateToURL("/")}
            className="flex gap-2 items-center px-2 p-3 hover:bg-blue-400 hover:text-white"
          >
            <House />
            Home
          </li>
          <li
            onClick={() => navigateToURL("/events")}
            className="flex gap-2 items-center px-2 p-3 hover:bg-blue-400 hover:text-white"
          >
            <Hotel />
            Events
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="flex gap-2 items-center px-2 p-3 hover:bg-blue-400 hover:text-white"
        >
          <LogOut />
          Logout
        </button>
      </div>
    </div>
  );
}
