"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { createUsersInstance } from "@/utils/usersService";
import { CustomError } from "@/types";

// Zodスキーマの定義
const schema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください。" }),
  password: z
    .string()
    .min(6, { message: "パスワードは6文字以上である必要があります。" }),
});

type LoginFormData = z.infer<typeof schema>;

export const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });
  const { login } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    const users = createUsersInstance();
    try {
      const response = await users.loginUser({ ...data });
      if (response && response.token && response.userId !== undefined) {
        login(response.token, response.userId);
        alert("ログインが成功しました！");
        router.push("/");
        router.refresh();
      } else {
        alert("ログインに失敗しました。");
      }
    } catch (error) {
      console.error("ログインに失敗しました:", error);
      const errorMessage = (error as CustomError).error.message;
      alert(`ログインに失敗しました。${errorMessage}`);
    }
  };

  return (
    <form
      className="max-w-md mx-auto mt-8 p-4 border rounded shadow"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="email"
        >
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="password"
        >
          パスワード
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      <button
        className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="submit"
      >
        ログイン
      </button>
    </form>
  );
};
