/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { PostCreationParams, PostModel, PostUpdateParams, PostWithAuthor, ValidateErrorJSON } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Posts<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name GetAllPosts
   * @request GET:/posts
   * @secure
   */
  getAllPosts = (params: RequestParams = {}) =>
    this.request<
      | PostModel[]
      | {
          message: string;
        },
      ValidateErrorJSON
    >({
      path: `/posts`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name CreatePost
   * @request POST:/posts
   * @secure
   */
  createPost = (data: PostCreationParams, params: RequestParams = {}) =>
    this.request<
      {
        message?: string;
      },
      ValidateErrorJSON
    >({
      path: `/posts`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name GetPostsByUser
   * @request GET:/posts/user/{userId}/posts
   * @secure
   */
  getPostsByUser = (userId: number, params: RequestParams = {}) =>
    this.request<
      | PostModel[]
      | {
          message: string;
        },
      ValidateErrorJSON
    >({
      path: `/posts/user/${userId}/posts`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name GetPost
   * @request GET:/posts/post/{postId}
   * @secure
   */
  getPost = (postId: number, params: RequestParams = {}) =>
    this.request<PostWithAuthor | null, ValidateErrorJSON>({
      path: `/posts/post/${postId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name UpdatePost
   * @request PUT:/posts/user/{userId}/post/{postId}
   * @secure
   */
  updatePost = (userId: number, postId: number, data: PostUpdateParams, params: RequestParams = {}) =>
    this.request<
      {
        message?: string;
      },
      ValidateErrorJSON
    >({
      path: `/posts/user/${userId}/post/${postId}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name DeletePost
   * @request DELETE:/posts/user/{userId}/post/{postId}
   * @secure
   */
  deletePost = (userId: number, postId: number, params: RequestParams = {}) =>
    this.request<
      {
        message?: string;
      },
      ValidateErrorJSON
    >({
      path: `/posts/user/${userId}/post/${postId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
}
