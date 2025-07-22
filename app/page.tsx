"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { useSession } from "next-auth/react";
import Feed from "./components/Feed";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300">
      <Navbar />
      {status === "loading" ? (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600"></div>
        </div>
      ) : session && session.user ? (
        // Show feed if signed in
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Feed</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Latest videos from creators you follow
              </p>
            </div>
            <Link href="/upload">
              <button className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Video
              </button>
            </Link>
          </div>
          <Feed />
        </div>
      ) : (
        // Show hero section if not signed in
        <section className="flex flex-col items-center justify-center text-center py-24 px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Welcome to ReelsPro
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-xl mb-8">
            Share, discover, and connect through short-form videos. Your
            moments, your audience, your platform.
          </p>
          <Link href="/register">
            <button className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </section>
      )}
    </main>
  );
}
