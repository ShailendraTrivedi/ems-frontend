"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginComponent, RegisterComponent } from "@/components";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Head from "next/head";

export default function Auth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const useAuth = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    document.title = isLogin
      ? "Login | Event Management"
      : "Register | Event Management";
  }, [isLogin]);

  useEffect(() => {
    if (useAuth?.token) {
      router.push("/events");
    } else if (useAuth?.error) {
      toast.error(useAuth?.error);
    }
  }, [useAuth, router]);

  return (
    <>
      <Head>
        <title>
          {isLogin ? "Login | Event Management" : "Register | Event Management"}
        </title>
        <meta
          name="description"
          content="Securely log in or register to manage your events effortlessly."
        />
        <meta
          property="og:title"
          content={
            isLogin
              ? "Login to Event Management System"
              : "Register for Event Management System"
          }
        />
        <meta
          property="og:description"
          content="Join our platform to organize and manage events seamlessly."
        />
        <meta property="og:type" content="website" />
      </Head>
      <main className="grid grid-cols-2 w-full h-full">
        <div
          className={`absolute top-0 left-0 transform ${
            isLogin ? "translate-x-[100%]" : "translate-x-[0%]"
          } w-1/2 h-full flex justify-center items-center bg-blue-500 text-white text-3xl z-10 transition-all duration-500 ease-in-out`}
        >
          Event Management System
        </div>
        <LoginComponent
          dispatch={dispatch}
          loading={useAuth.loading}
          setIsLogin={setIsLogin}
        />
        <RegisterComponent
          dispatch={dispatch}
          loading={useAuth.loading}
          setIsLogin={setIsLogin}
        />
      </main>
    </>
  );
}
