import { cookies } from "next/headers";
import { PostModel } from "../../schema/data-contracts";
import { PostList } from "./components/PostList";
import { createPostsInstance } from "@/utils/postsService";

export default async function Top() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  const posts = createPostsInstance();

  let postsData: PostModel[] = [];

  try {
    if (!authToken) {
      throw new Error("認証トークンがありません");
    }

    postsData = await posts.getAllPosts({
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });
  } catch (error) {
    console.error("投稿の取得に失敗しました:", error);
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">投稿一覧</h2>
      <PostList isAuthenticated={!!authToken} posts={postsData} />
    </>
  );
}
