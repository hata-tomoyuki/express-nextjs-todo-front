import React from "react";
import { cookies } from "next/headers";
import { PostModel } from "../../../../schema/data-contracts";
import { createUsersInstance } from "@/utils/usersService";
import { createPostsInstance } from "@/utils/postsService";
import { PostList } from "@/app/components/PostList";
import { CustomError } from "@/types";

type Params = {
  id: number;
};

const UserDetailPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  const users = createUsersInstance();
  const posts = createPostsInstance();

  let userData;
  let postsData: PostModel[] = [];

  try {
    if (!authToken) {
      throw new Error("認証トークンがありません");
    }

    userData = await users.getUser(id);
    postsData = await posts.getPostsByUser(id, {
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });
  } catch (error) {
    console.error("ユーザーの取得に失敗しました:", error);
    const errorMessage = (error as CustomError).error.message;
    alert(`ユーザーの取得に失敗しました。${errorMessage}`);
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">ユーザー詳細</h2>
      {userData ? (
        <div className="p-4 mt-8 w-2/3 m-auto flex flex-col gap-4">
          <h2>名前：{userData.name}</h2>
          <PostList isAuthenticated={!!authToken} posts={postsData} />
        </div>
      ) : (
        <p>ユーザーが見つかりませんでした。</p>
      )}
    </>
  );
};

export default UserDetailPage;
