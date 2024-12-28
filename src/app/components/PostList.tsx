import React from "react";
import { PostModel } from "../../../schema/data-contracts";
import { Post } from "./Post";

type PostListProps = {
  posts: PostModel[];
  isAuthenticated?: boolean;
};

export const PostList = ({ posts, isAuthenticated }: PostListProps) => {
  const visiblePosts = isAuthenticated
    ? posts // 認証されている場合はすべての投稿を表示
    : posts.filter((post) => post.published); // 認証されていない場合は公開された投稿のみ

  return (
    <>
      {visiblePosts.length === 0 && <p>公開中の投稿はありません</p>}
      {visiblePosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};
