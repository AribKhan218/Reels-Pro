"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar.jsx";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300">
      <Navbar />
      {status === "loading" ? null : session && session.user ? (
        // Show feed if signed in
        <section className="flex flex-col items-center justify-center text-center py-24 px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Your Feed
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-xl mb-8">
            Here are the latest reels from creators you follow.
          </p>
          {/* TODO: Replace with actual feed component */}
        </section>
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
