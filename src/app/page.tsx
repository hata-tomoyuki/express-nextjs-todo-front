import { cookies } from "next/headers";
import { PostModel } from "../../schema/data-contracts";
import { PostList } from "./components/PostList";
import { createPostsInstance } from "@/utils/postsService";
import { CustomError } from "@/types";

export default async function Top() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  const posts = createPostsInstance();

  let postsData: PostModel[] = [];

  try {
    if (!authToken) {
      throw new Error("認証トークンがありません");
    }

    const response = await posts.getAllPosts({
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });

    if (Array.isArray(response)) {
      postsData = response;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error("投稿の取得に失敗しました:", error);
    const errorMessage = (error as CustomError).error.message;
    alert(`投稿の取得に失敗しました。${errorMessage}`);
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">投稿一覧</h2>
      <PostList isAuthenticated={!!authToken} posts={postsData} />
    </>
  );
}
