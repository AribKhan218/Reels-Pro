import React from "react";
import Link from "next/link";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  // Always enable dark mode
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div>
      <nav className="flex items-center justify-between p-4 shadow-md dark:shadow-zinc-800">
        <div className="text-2xl font-bold">
          <Link href="/">ReelsPro</Link>
        </div>

        <div className="flex items-center gap-4">
          {status === "loading" ? null : session && session.user ? (
            <>
              <Link href="/upload">
                <button className="cursor-pointer px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2">
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
                  Upload
                </button>
              </Link>
              <Link href="/profile">
                <button className="cursor-pointer px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition">
                  Profile
                </button>
              </Link>
              <button
                onClick={() => signOut()}
                className="cursor-pointer px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/register">
                <button className="cursor-pointer px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                  Register
                </button>
              </Link>
              <Link href="/login">
                <button className="cursor-pointer px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-zinc-800 transition">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
