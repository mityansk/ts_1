import { UserType } from "../../entities/user/user.types";
export interface UserPropsType {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}