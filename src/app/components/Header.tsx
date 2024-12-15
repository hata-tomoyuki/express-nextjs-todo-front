import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { AuthButtons } from "./AuthButtons";

export const Header = async () => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");
  const userId = cookieStore.get("userId")?.value;

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">
          <Link href="/">My App</Link>
        </h1>
        <div className="flex gap-4">
          <AuthButtons isAuthenticated={!!authToken} userId={userId} />
        </div>
      </div>
    </header>
  );
};
