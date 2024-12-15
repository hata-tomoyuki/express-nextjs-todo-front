import React from "react";
import { cookies } from "next/headers";
import { PostEditForm } from "@/app/components/PostEditForm";
import { createPostsInstance } from "@/utils/postsService";
import { CustomError } from "@/types";

type Params = {
  id: number;
};

const PostEditPage = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;

  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  const posts = createPostsInstance();

  let postData = null;

  try {
    if (!authToken) {
      throw new Error("認証トークンがありません");
    }

    postData = await posts.getPost(id, {
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });
  } catch (error) {
    console.error("投稿の取得に失敗しました:", error);
    const errorMessage = (error as CustomError).error.message;
    alert(`投稿の取得に失敗しました。${errorMessage}`);
  }

  if (!authToken) {
    return <div>認証トークンがありません</div>;
  }

  if (!postData) {
    return <div>投稿が見つかりませんでした。</div>;
  }

  return <PostEditForm post={postData} token={authToken.value} />;
};

export default PostEditPage;
