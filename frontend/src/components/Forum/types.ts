export interface Post {
    id: string;
    title: string;
    author: string;
    email: string;
    content: string;
    likes: number;
    comments: Comment[];
    isLiked: boolean;
    isBookmarked: boolean;
    color: string;
    timestamp: Date;
    views: number;
    tags: string[];
}

export interface CommunityMember {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar: string;
    isOnline: boolean;
    joinDate: Date;
}

export interface Comment {
    id: string;
    author: string;
    email: string;
    content: string;
    timestamp: Date;
    likes: number;
    isLiked: boolean;
    replies: Comment[];
}