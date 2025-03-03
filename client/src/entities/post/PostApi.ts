import { axiosInstance } from '../../shared/lib/axiosInstance';
import { Post, ResponseType } from './post.types';

type CreateInputsType = {
  title: string;
  body: string;
}

type UpdateInputsType = {
  title: string;
  body: string;
  updatedAt: Date;
}

export default class PostApi {
  static async getAll(): Promise<ResponseType<Post[]>> {
    const { data } = await axiosInstance.get<ResponseType<Post[]>>('/posts');
    return data;
  }

  static async getById(id: number | string): Promise<ResponseType<Post | null>> {
    const { data } = await axiosInstance.get<ResponseType<Post | null>>(`/posts/${id}`);
    return data;
  }

  static async create(inputs: CreateInputsType): Promise<ResponseType<Post>> {
    const { data } = await axiosInstance.post<ResponseType<Post>>('/posts', inputs);
    return data;
  }

  static async update(id: number, inputs: UpdateInputsType): Promise<ResponseType<[number, Post[]] | null>> {
    const { data } = await axiosInstance.put<ResponseType<[number, Post[]] | null>>(`/posts/${id}`, inputs);
    return data;
  }

  static async delete(id: number) {
    const { data } = await axiosInstance.delete<ResponseType<null>>(`/posts/${id}`);
    return data;
  }
}
