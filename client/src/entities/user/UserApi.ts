import { axiosInstance } from '../../shared/lib/axiosInstance';
import { LogRegDataType, ResponseType, UserWithTokenType } from './user.types';

export default class UserApi {
  static async signIn(userData: LogRegDataType): Promise<ResponseType<UserWithTokenType>> {
    const { data } = await axiosInstance.post<ResponseType<UserWithTokenType>>('/auth/signIn', userData);
    return data;
  }

  static async signUp(userData: LogRegDataType): Promise<ResponseType<UserWithTokenType>> {
    const { data } = await axiosInstance.post<ResponseType<UserWithTokenType>>('/auth/signUp', userData);
    return data;
  }

  static async signOut(): Promise<ResponseType<null>> {
    const { data } = await axiosInstance.get<ResponseType<null>>('/auth/signOut');
    return data;
  }

  static async refreshTokens(): Promise<ResponseType<UserWithTokenType>> {
    const response = await axiosInstance.get<ResponseType<UserWithTokenType>>('/auth/refreshTokens');
    return response.data;
  }
}
