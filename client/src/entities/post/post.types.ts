import { UserType } from "../user/user.types";

export type ResponseType<T> = {
    statusCode: number;
    error: string;
    message?: string;
    data: T;
}

export type PostWithUser<Z> = {
    id: number;
    title: string;
    body: string;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    User: Z;
}

export type Post = {
    id: number;
    title: string;
    body: string;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type ArrayWithPostsWithUsers = Array<PostWithUser<UserType>>

export type ArrayWithPosts = Array<Post>