export type LogRegDataType = {
    username?: string;
    email: string;
    password: string;
    repeatPassword?: string;
}

export type UserType = {
    id: number,
    username: string,
    email: string,
    password?: string,
    repeatPassword?: string,
    createdAt: string,
    updatedAt: string,
  }

export type UserWithTokenType = {
    user: UserType;
    accessToken: string;
}

export type ResponseType<T> = {
    statusCode: number;
    error: string;
    message?: string;
    data: T;
}

export type ValidateResponseType = {
    isValid: boolean;
    error: string | null;
}
