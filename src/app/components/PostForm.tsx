"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { createPostsInstance } from "@/utils/postsService";
import { CustomError } from "@/types";

// Zodスキーマの定義
const postSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  content: z.string().min(1, "コンテンツは必須です"),
});

type PostFormData = z.infer<typeof postSchema>;

type PostFormProps = {
  authToken: string;
};

export const PostForm = ({ authToken }: PostFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostFormData) => {
    const posts = createPostsInstance();

    try {
      await posts.createPost(data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      alert("投稿が成功しました！");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("投稿に失敗しました:", error);
      const errorMessage = (error as CustomError).error.message;
      alert(`投稿に失敗しました。${errorMessage}`);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">投稿作成</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="title"
          >
            タイトル
          </label>
          <input
            id="title"
            {...register("title")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="content"
          >
            コンテンツ
          </label>
          <textarea
            id="content"
            {...register("content")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.content && (
            <p className="mt-2 text-sm text-red-600">
              {errors.content.message}
            </p>
          )}
        </div>
        <button
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
        >
          投稿
        </button>
      </form>
    </>
  );
};
