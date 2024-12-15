"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

type AuthButtonsProps = {
  isAuthenticated: boolean;
  userId: string | undefined;
};

export const AuthButtons = ({ isAuthenticated, userId }: AuthButtonsProps) => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
    router.refresh();
  };

  return (
    <nav>
      <ul className="flex space-x-4">
        {isAuthenticated ? (
          <>
            <li>
              <Link className="text-white" href="/posts/create">
                投稿作成
              </Link>
            </li>
            <li>
              <Link className="text-white" href={`/users/${userId}`}>
                マイページ
              </Link>
            </li>
            <li>
              <button
                className="text-white hover:text-gray-300"
                onClick={handleLogout}
              >
                ログアウト
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="text-white hover:text-gray-300" href="/login">
                ログイン
              </Link>
            </li>
            <li>
              <Link className="text-white hover:text-gray-300" href="/register">
                新規登録
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
