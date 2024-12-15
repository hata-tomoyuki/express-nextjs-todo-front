"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PostModel } from "../../../schema/data-contracts";
import { createPostsInstance } from "@/utils/postsService";
import { CustomError } from "@/types";

type PostHandleButtonsProps = {
  post: PostModel;
  token: string;
  userId: number;
};

export const PostHandleButtons = ({
  post,
  token,
  userId,
}: PostHandleButtonsProps) => {
  const router = useRouter();

  const posts = createPostsInstance();

  const deletePost = async (postId: number) => {
    try {
      await posts.deletePost(userId, postId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("投稿が削除されました");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("投稿の削除に失敗しました:", error);
      const errorMessage = (error as CustomError).error.message;
      alert(`投稿の削除に失敗しました。${errorMessage}`);
    }
  };

  return (
    <div className="flex gap-4">
      <Link href={`/posts/${post.id}/edit`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          編集
        </button>
      </Link>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => deletePost(post.id)}
      >
        削除
      </button>
    </div>
  );
};
