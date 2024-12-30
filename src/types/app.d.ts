export interface IThread {
   id?: string;
   content?: string;
   images?: IThreadImage[];
   author: IAuthor;
   createdAt:string,
   threadId:null
   like:Ilike[],
   reply:IReply[]
}

export interface IReply{
   threadId?:string
   id?: string;
   content?: string;
   images?: IThreadImage[];
   author: IAuthor;
   createdAt:string,
   like:Ilike[],
   reply:IReply[]
}

export interface IThreadImage {
   id?: number;
   imageUrl?: string;
}

export interface IAuthor {
   id?: string;
   fullname?: string;
   profile?: IProfile;
   follower:ifollower[];
   following:Ifollowing[]
}

interface IProfile {
   bio?: string;
   username?: string;
   photoProfile?: string;
   cover?: string;
}

interface Ilike{
   userId :string
   threadId :string
   user :IAuthor;
   thread :IThread
   isLike :boolean
}

interface Ifollower{
   followerId :string,
   followingId :string,
   isFollow:boolean,
   following:IAuthor
}

interface Ifollowing{
   followerId :string,
   followingId :string,
   isFollow:boolean,
   follower:IAuthor
}