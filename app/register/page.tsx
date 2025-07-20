"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: any) => {
    setServerError("");
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      type RegisterResponse = { success?: boolean; error?: string };
      let result: RegisterResponse = {};
      try {
        result = await res.json();
      } catch {
        // If response is not JSON
        result = {};
      }
      if (!res.ok || result.success === false) {
        setServerError(result.error ?? "Registration failed");
        return;
      }
      router.push("/login");
    } catch (error: any) {
      setServerError(error.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-neomorph-dark bg-zinc-900 border border-zinc-800">
        <h1 className="text-3xl font-bold text-center mb-6 text-zinc-100">
          Register
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl shadow-inner-neomorph-dark bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-100 placeholder-zinc-400 border border-zinc-700"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl shadow-inner-neomorph-dark bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-100 placeholder-zinc-400 border border-zinc-700"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message as string}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-xl shadow-inner-neomorph-dark bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-100 placeholder-zinc-400 border border-zinc-700"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword.message as string}
              </p>
            )}
          </div>
          {serverError && (
            <div className="text-red-500 text-center text-sm mb-2">
              {serverError}
            </div>
          )}
          <button
            type="submit"
            className="cursor-pointer w-full py-3 rounded-xl bg-blue-700 text-white font-semibold shadow-neomorph-dark transition hover:bg-blue-800 disabled:opacity-60 flex items-center justify-center border border-blue-900"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-zinc-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <style jsx global>{`
        .shadow-neomorph-dark {
          box-shadow: 8px 8px 24px #23272e, -8px -8px 24px #18181b;
        }
        .shadow-inner-neomorph-dark {
          box-shadow: inset 4px 4px 12px #23272e, inset -4px -4px 12px #18181b;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px #27272a inset !important;
          box-shadow: 0 0 0 1000px #27272a inset !important;
          -webkit-text-fill-color: #f4f4f5 !important;
          caret-color: #f4f4f5 !important;
          color: #f4f4f5 !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}

export default RegisterPage;
