import Link from "next/link";
import React from "react";
import { PostModel } from "../../../schema/data-contracts";

type PostProps = {
  post: PostModel;
};

export const Post = ({ post }: PostProps) => {
  return (
    <Link href={`/posts/${post.id}`} key={post.id}>
      <div className="p-4 border rounded mt-8" key={post.id}>
        <h3 className="text-lg font-bold">{post.title}</h3>
        <p>{post.content}</p>
      </div>
    </Link>
  );
};
