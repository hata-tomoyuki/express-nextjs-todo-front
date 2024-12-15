"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { createUsersInstance } from "@/utils/usersService";
import { CustomError } from "@/types";

// Zodスキーマの定義
const schema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください。" }),
  name: z.string().min(1, { message: "名前を入力してください。" }),
  password: z
    .string()
    .min(6, { message: "パスワードは6文字以上である必要があります。" }),
});

type UseFormProps = z.infer<typeof schema>;

export const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UseFormProps>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: UseFormProps) => {
    const users = createUsersInstance();
    try {
      await users.createUser({ ...data });
      alert("登録が成功しました！");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("登録に失敗しました:", error);
      const errorMessage = (error as CustomError).error.message;
      alert(`登録に失敗しました。${errorMessage}`);
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
          htmlFor="name"
        >
          名前
        </label>
        <input
          id="name"
          {...register("name")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
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
        登録
      </button>
    </form>
  );
};
