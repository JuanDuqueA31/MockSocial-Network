export interface Post {
    id: number;
    userId: number;
    userName?: string;
    content: string;
    createdAt: Date;
    likes: number;
}