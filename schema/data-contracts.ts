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

export interface DefaultSelectionPrisma36PostPayload {
  /** @format double */
  authorId: number;
  published: boolean;
  content: string;
  title: string;
  /** @format double */
  id: number;
}

/** Model Post */
export type PostModel = DefaultSelectionPrisma36PostPayload;

export interface ValidateErrorJSON {
  details: Record<string, any>;
  message: "Validation failed";
}

/** From T, pick a set of properties whose keys are in the union K */
export interface PickPostModelTitleOrContent {
  title: string;
  content: string;
}

export type PostCreationParams = PickPostModelTitleOrContent;

export interface DefaultSelectionPrisma36UserPayload {
  password: string;
  email: string;
  /** @format double */
  id: number;
  name: string;
}

/** Model User */
export type UserModel = DefaultSelectionPrisma36UserPayload;

export type PostWithAuthor = PostModel & {
  /** Model User */
  author: UserModel;
};

/** From T, pick a set of properties whose keys are in the union K */
export interface PickPostModelTitleOrContentOrPublished {
  title: string;
  content: string;
  published: boolean;
}

export type PostUpdateParams = PickPostModelTitleOrContentOrPublished;

/** Model User */
export type User = DefaultSelectionPrisma36UserPayload;

/** From T, pick a set of properties whose keys are in the union K */
export interface PickUserEmailOrNameOrPassword {
  name: string;
  email: string;
  password: string;
}

export type UserCreationParams = PickUserEmailOrNameOrPassword;

/** From T, pick a set of properties whose keys are in the union K */
export interface PickUserEmailOrPassword {
  email: string;
  password: string;
}

export type LoginParams = PickUserEmailOrPassword;
