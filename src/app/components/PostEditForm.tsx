"use client";

import React from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { PostModel } from "../../../schema/data-contracts";
import { createPostsInstance } from "@/utils/postsService";
import { CustomError } from "@/types";

type PostEditFormProps = {
  post: PostModel;
  token: string;
};

const postSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  content: z.string().min(1, "本文は必須です"),
  published: z.boolean(),
});

type PostFormData = z.infer<typeof postSchema>;

export const PostEditForm = ({ post, token }: PostEditFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      published: post?.published || false,
    },
  });

  const posts = createPostsInstance();

  const onSubmit = async (data: PostFormData) => {
    try {
      await posts.updatePost(post.authorId, post.id, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("投稿が更新されました");
      router.push(`/posts/${post.id}`);
      router.refresh();
    } catch (error) {
      console.error("投稿の更新に失敗しました:", error);
      const errorMessage = (error as CustomError).error.message;
      alert(`投稿の更新に失敗しました。${errorMessage}`);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">投稿の編集</h2>
      <form
        className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            タイトル
          </label>
          <input
            {...register("title")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            本文
          </label>
          <textarea
            {...register("content")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          />
          {errors.content && (
            <p className="text-red-500 text-xs italic">
              {errors.content.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            公開
          </label>
          <input
            type="checkbox"
            {...register("published")}
            className="mr-2 leading-tight"
          />
          <span className="text-gray-700">この投稿を公開する</span>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            更新
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href={`/posts/${post.id}`}
          >
            戻る
          </Link>
        </div>
      </form>
    </>
  );
};
