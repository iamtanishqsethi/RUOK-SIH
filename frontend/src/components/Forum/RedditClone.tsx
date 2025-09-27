import React, { useState, useEffect } from 'react';
import {User, Crown, Shield, Star } from 'lucide-react';
import Header from './Header';
import SearchAndFilter from './SearchAndFilter';
import PostList from './PostList';
import CreatePostModal from './CreatePostModal';
import Sidebar from './Sidebar';
import type {Post,Comment, CommunityMember} from './types';

const RedditClone: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'trending'>('newest');
    const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

    const [posts, setPosts] = useState<Post[]>([
        {
            id: '1',
            title: 'Overwhelmed by Exam Stress',
            author: 'Sumit Singh Bisht',
            email: 'sumitsinghbisht2020@gmail.com',
            content: 'Man, this exam makes me feel nauseous and stressed out! My heart’s racing, and I can’t focus.',
            likes: 12,
            comments: [
                {
                    id: 'c1',
                    author: 'Dr. Sarah Johnson',
                    email: 'sarah.johnson@gmail.com',
                    content: 'I feel you! That anxiety can be tough. Try some deep breathing.',
                    timestamp: new Date(Date.now() - 3600000),
                    likes: 5,
                    isLiked: false,
                    replies: [
                        {
                            id: 'c1r1',
                            author: 'Alex Chen',
                            email: 'alex.chen@gmail.com',
                            content: 'Yeah, it’s overwhelming. Breathing helps a bit, thanks!',
                            timestamp: new Date(Date.now() - 1800000),
                            likes: 2,
                            isLiked: false,
                            replies: []
                        }
                    ]
                }
            ],
            isLiked: false,
            isBookmarked: false,
            color: 'bg-gradient-to-t from-red-700 ',
            timestamp: new Date(Date.now() - 7200000),
            views: 156,
            tags: ['stress', 'exam', 'anxiety']
        },
        {
            id: '2',
            title: 'Feeling Down After a Long Day',
            author: 'Dr. Maria Garcia',
            email: 'maria.garcia@gmail.com',
            content: 'Today was exhausting, and I feel so drained and low. Just want to curl up and forget everything.',
            likes: 8,
            comments: [
                {
                    id: 'c2',
                    author: 'Alex Chen',
                    email: 'alex.chen@gmail.com',
                    content: 'I get that. It’s like the energy just fades away.',
                    timestamp: new Date(Date.now() - 1800000),
                    likes: 3,
                    isLiked: true,
                    replies: [
                        {
                            id: 'c2r1',
                            author: 'Dr. Sarah Johnson',
                            email: 'sarah.johnson@gmail.com',
                            content: 'Same here. Maybe a warm tea could lift us a little.',
                            timestamp: new Date(Date.now() - 900000),
                            likes: 1,
                            isLiked: false,
                            replies: []
                        }
                    ]
                }
            ],
            isLiked: true,
            isBookmarked: true,
            color: 'bg-gradient-to-t from-blue-700',
            timestamp: new Date(Date.now() - 10800000),
            views: 89,
            tags: ['exhausted', 'low', 'drained']
        },
        {
            id: '3',
            title: 'Peaceful After Meditation',
            author: 'Dr. Maninder Sharmita',
            email: 'maninder@email.com',
            content: 'Just finished a quiet meditation session, and I feel so calm and content. Loving this peaceful vibe.',
            likes: 15,
            comments: [
                {
                    id: 'c3',
                    author: 'Dr. James Wilson',
                    email: 'james.wilson@gmail.com',
                    content: 'That sounds wonderful! I feel relaxed just reading it.',
                    timestamp: new Date(Date.now() - 5400000),
                    likes: 4,
                    isLiked: false,
                    replies: []
                }
            ],
            isLiked: false,
            isBookmarked: false,
            color: 'bg-gradient-to-t from-green-500 ',
            timestamp: new Date(Date.now() - 14400000),
            views: 120,
            tags: ['calm', 'meditation', 'peace']
        },
        {
            id: '4',
            title: 'Excited About the Party Tonight',
            author: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@gmail.com',
            content: 'Can’t wait for the party tonight! Feeling so pumped and happy to see friends!',
            likes: 10,
            comments: [
                {
                    id: 'c4',
                    author: 'Alex Chen',
                    email: 'alex.chen@gmail.com',
                    content: 'Same here! The energy is contagious!',
                    timestamp: new Date(Date.now() - 7200000),
                    likes: 3,
                    isLiked: true,
                    replies: [
                        {
                            id: 'c4r1',
                            author: 'Dr. Maria Garcia',
                            email: 'maria.garcia@gmail.com',
                            content: 'Enjoy! That excitement is awesome.',
                            timestamp: new Date(Date.now() - 3600000),
                            likes: 2,
                            isLiked: false,
                            replies: []
                        }
                    ]
                }
            ],
            isLiked: false,
            isBookmarked: true,
            color: 'bg-gradient-to-t from-yellow-600 ',
            timestamp: new Date(Date.now() - 18000000),
            views: 95,
            tags: ['excited', 'party', 'happy']
        },
        {
            id: '5',
            title: 'Relaxed After a Nap',
            author: 'Dr. Maninder Sharmita',
            email: 'maninder@email.com',
            content: 'Took a short nap, and now I feel so relaxed and at ease. Such a nice break.',
            likes: 7,
            comments: [
                {
                    id: 'c5',
                    author: 'Dr. James Wilson',
                    email: 'james.wilson@gmail.com',
                    content: 'Naps are the best! I feel so chill after one too.',
                    timestamp: new Date(Date.now() - 10800000),
                    likes: 2,
                    isLiked: false,
                    replies: [
                        {
                            id: 'c5r1',
                            author: 'Alex Chen',
                            email: 'alex.chen@gmail.com',
                            content: 'Totally agree! Let’s make napping a trend.',
                            timestamp: new Date(Date.now() - 5400000),
                            likes: 1,
                            isLiked: false,
                            replies: []
                        }
                    ]
                }
            ],
            isLiked: true,
            isBookmarked: false,
            color: 'bg-gradient-to-t from-green-700 ',
            timestamp: new Date(Date.now() - 21600000),
            views: 70,
            tags: ['relaxed', 'nap', 'ease']
        }
    ]);

    const [communityMembers] = useState<CommunityMember[]>([
        {
            id: '1',
            name: 'Dr Maninder Sharmita',
            email: 'maninder@email.com',
            role: 'Therapist',
            avatar: '👩‍⚕️',
            isOnline: true,
            joinDate: new Date(2023, 0, 15)
        },
        {
            id: '2',
            name: 'Dr Sarah Johnson',
            email: 'sarah@email.com',
            role: 'Admin',
            avatar: '👨‍💼',
            isOnline: true,
            joinDate: new Date(2023, 1, 20)
        },
        {
            id: '3',
            name: 'Alex Chen',
            email: 'alex@email.com',
            role: 'Moderator',
            avatar: '👨‍💻',
            isOnline: false,
            joinDate: new Date(2023, 2, 10)
        }
    ]);

    const handleCreatePost = (title: string, content: string, color: string, tags: string[]) => {
        const newPost: Post = {
            id: Date.now().toString(),
            title,
            author: 'Sumit Singh Bisht',
            email: 'sumitsinghbisht2020@gmail.com',
            content,
            likes: 0,
            comments: [],
            isLiked: false,
            isBookmarked: false,
            color,
            timestamp: new Date(),
            views: 0,
            tags
        };
        setPosts([newPost, ...posts]);
    };

    const handleLike = (postId: string) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
                : post
        ));
    };

    const handleBookmark = (postId: string) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, isBookmarked: !post.isBookmarked }
                : post
        ));
    };

    const handleAddComment = (postId: string, content: string, parentId?: string) => {
        const newComment: Comment = {
            id: Date.now().toString(),
            author: 'Sumit Singh Bisht',
            email: 'sumitsinghbisht2020@gmail.com',
            content,
            timestamp: new Date(),
            likes: 0,
            isLiked: false,
            replies: []
        };

        setPosts(posts.map(post => {
            if (post.id === postId) {
                if (parentId) {
                    const updatedComments = post.comments.map(comment =>
                        comment.id === parentId
                            ? { ...comment, replies: [...comment.replies, newComment] }
                            : comment
                    );
                    return { ...post, comments: updatedComments };
                } else {
                    return { ...post, comments: [...post.comments, newComment] };
                }
            }
            return post;
        }));
    };

    const handleLikeComment = (postId: string, commentId: string) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                const updatedComments = post.comments.map(comment =>
                    comment.id === commentId
                        ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
                        : comment
                );
                return { ...post, comments: updatedComments };
            }
            return post;
        }));
    };

    const toggleComments = (postId: string) => {
        setExpandedComments(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const sortedPosts = [...filteredPosts].sort((a, b) => {
        switch (sortBy) {
            case 'popular':
                return b.likes - a.likes;
            case 'trending':
                return b.views - a.views;
            case 'newest':
            default:
                return b.timestamp.getTime() - a.timestamp.getTime();
        }
    });

    const formatTimestamp = (timestamp: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - timestamp.getTime();
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    };

    const getRoleIcon = (role: string) => {
        switch (role.toLowerCase()) {
            case 'super admin': return <Crown className="w-4 h-4 text-yellow-400" />;
            case 'admin': return <Shield className="w-4 h-4 text-red-400" />;
            case 'moderator': return <Star className="w-4 h-4 text-blue-400" />;
            case 'therapist': return <User className="w-4 h-4 text-green-400" />;
            default: return <User className="w-4 h-4 text-gray-400" />;
        }
    };

    useEffect(() => {
        const viewTimers: NodeJS.Timeout[] = [];

        posts.forEach(post => {
            const timer = setTimeout(() => {
                setPosts(prevPosts =>
                    prevPosts.map(p =>
                        p.id === post.id ? { ...p, views: p.views + Math.floor(Math.random() * 3) + 1 } : p
                    )
                );
            }, Math.random() * 10000);
            viewTimers.push(timer);
        });

        return () => {
            viewTimers.forEach(timer => clearTimeout(timer));
        };
    }, [posts.length]);

    return (
        <div className="min-h-screen overflow-y-auto w-full bg-black text-white flex flex-col md:flex-row gap-3 md:gap-5">
            <div className="flex-1 p-1 sm:p-2 md:p-4 max-w-4xl w-full mx-auto">
                {!isModalOpen && (
                    <>
                        <Header isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                        <SearchAndFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} sortBy={sortBy} setSortBy={setSortBy} />
                        <PostList
                            posts={sortedPosts}
                            handleLike={handleLike}
                            handleBookmark={handleBookmark}
                            toggleComments={toggleComments}
                            expandedComments={expandedComments}
                            handleAddComment={handleAddComment}
                            handleLikeComment={handleLikeComment}
                            formatTimestamp={formatTimestamp}
                            getRoleIcon={getRoleIcon}
                        />
                    </>
                )}
                {isModalOpen && (
                    <CreatePostModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onPost={handleCreatePost}
                    />
                )}
            </div>
            <Sidebar
                communityMembers={communityMembers}
                posts={posts}
                getRoleIcon={getRoleIcon}
            />
        </div>
    );
};

export default RedditClone;