import { Posts } from "../../schema/Posts";
import { API_CONFIG } from "@/config/apiConfig";

export const createPostsInstance = () => {
  return new Posts({
    baseUrl: API_CONFIG.baseUrl,
  });
};
