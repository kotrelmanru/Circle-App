import { IAuthor, IProfile } from "../../types/app";

export type IauthorState = {
    isLogin:boolean,
    token :string,
    profile:IAuthor
}