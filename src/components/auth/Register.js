"use client";
import { registerUser } from "@/redux/actions/authActions";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import NextButton from "../helper/NextButton";
import { NextInput } from "..";

export default function RegisterComponent({ dispatch, loading, setIsLogin }) {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <div className="flex justify-center items-center gap-2 w-full h-full">
      <div className="flex flex-col gap-2 w-1/2">
        <h2 className="text-xl font-bold">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <NextInput
            type="fullName"
            name="fullName"
            placeholder="Enter Full Name"
            aria-label="Full Name"
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
          <NextInput
            type="text"
            name="username"
            placeholder="Enter username"
            aria-label="Username"
            className="border p-2 w-full"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <div className="relative">
            <NextInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              aria-label="Password"
              className="border p-2 w-full"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <NextButton
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 -translate-x-0"
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </NextButton>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <NextButton
              type="submit"
              className="bg-blue-500 text-white p-2 w-full"
            >
              {loading ? "Registering..." : "Register"}
            </NextButton>
            <div className="flex gap-1 justify-center w-full">
              Already Login?{" "}
              <NextButton
                onClick={() => setIsLogin((prev) => !prev)}
                className="text-blue-500"
              >
                Click Here !
              </NextButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
