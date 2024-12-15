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

import { LoginParams, User, UserCreationParams, ValidateErrorJSON } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Users<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name GetUser
   * @request GET:/users/{userId}
   */
  getUser = (userId: number, params: RequestParams = {}) =>
    this.request<User | null, ValidateErrorJSON>({
      path: `/users/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name CreateUser
   * @request POST:/users/register
   */
  createUser = (data: UserCreationParams, params: RequestParams = {}) =>
    this.request<
      {
        details?: any;
        message: string;
      },
      ValidateErrorJSON
    >({
      path: `/users/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name LoginUser
   * @request POST:/users/login
   */
  loginUser = (data: LoginParams, params: RequestParams = {}) =>
    this.request<
      {
        message?: string;
        /** @format double */
        userId?: number;
        token?: string;
      } | null,
      ValidateErrorJSON
    >({
      path: `/users/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name LogoutUser
   * @request POST:/users/logout
   */
  logoutUser = (
    data: {
      token: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        message?: string;
      },
      any
    >({
      path: `/users/logout`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
