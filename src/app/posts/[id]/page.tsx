import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { PostHandleButtons } from "@/app/components/PostHandleButtons";
import { createPostsInstance } from "@/utils/postsService";
import { CustomError } from "@/types";

type Params = {
  id: number;
};

const PostDetailPage = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;

  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");
  const userId = cookieStore.get("userId")?.value;

  const posts = createPostsInstance();

  let postData;

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

  const authTokenValue = authToken?.value || "";

  return (
    <>
      <h2 className="text-center text-2xl">投稿詳細</h2>
      {postData ? (
        postData.published || postData.author.id === Number(userId) ? ( // 公開されているか、ユーザーが投稿者である場合に表示
          <div className="p-4 border rounded mt-8 w-2/3 m-auto flex flex-col gap-4">
            <h2>タイトル：{postData.title}</h2>
            <p>本文：{postData.content}</p>
            <p>
              Posted by
              <Link
                className="underline ml-1"
                href={`/users/${postData.author.id}`}
              >
                {postData.author.name}
              </Link>
            </p>
            {postData.author.id === Number(userId) && (
              <PostHandleButtons
                post={postData}
                token={authTokenValue}
                userId={Number(userId)}
              />
            )}
          </div>
        ) : (
          <p>この投稿は非公開です。</p>
        )
      ) : (
        <p>投稿が見つかりませんでした。</p>
      )}
    </>
  );
};

export default PostDetailPage;
