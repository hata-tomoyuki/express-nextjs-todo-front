import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PostForm } from "@/app/components/PostForm";

const PostCreatePage = async () => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  if (!authToken) {
    redirect("/login");
  }

  return <PostForm authToken={authToken.value} />;
};

export default PostCreatePage;
