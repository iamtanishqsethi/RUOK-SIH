import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Heart, MessageCircle, Flag, Users, User, Crown, Shield, Star, Search, Eye, Share2, Bookmark } from 'lucide-react';
import axios from 'axios';
import CreatePostModal from './CreatePostModal';
import CommentSection from './CommentSection';
import type { CommunityMember, Post } from './types.ts';

const BASE_URL = 'http://localhost:8000/api';

const RedditClone: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'trending'>('newest');
    const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
    const [posts, setPosts] = useState<Post[]>([]);
    const [communityMembers, setCommunityMembers] = useState<CommunityMember[]>([]);
    const [stats, setStats] = useState({ totalMembers: 0, onlineNow: 0, totalPosts: 0, postsToday: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);

    const fetchPosts = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/forum/posts`, {
                params: { search: searchQuery, sort: sortBy, page, limit: 10 },
                withCredentials: true,
            });
            setPosts(prev => page === 1 ? response.data.posts : [...prev, ...response.data.posts]);
            setHasMore(response.data.hasMore);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery, sortBy, page]);

    const fetchCommunityMembers = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/forum/community-members`, { withCredentials: true });
            setCommunityMembers(response.data);
        } catch (error) {
            console.error('Error fetching community members:', error);
        }
    }, []);

    const fetchStats = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/forum/stats`, { withCredentials: true });
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    }, []);

    useEffect(() => {
        setPage(1);
    }, [searchQuery, sortBy]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        fetchCommunityMembers();
        fetchStats();
    }, [fetchCommunityMembers, fetchStats]);

    const handleCreatePost = useCallback(
        async (title: string, content: string, color: string, tags: string[]) => {
            try {
                await axios.post(`${BASE_URL}/forum/posts`, { title, content, color, tags }, { withCredentials: true });
                setPage(1);
                fetchPosts();
                fetchStats();
            } catch (error) {
                console.error('Error creating post:', error);
                throw error;
            }
        },
        [fetchPosts, fetchStats]
    );

    const handleLike = useCallback(
        async (postId: string, isLiked: boolean) => {
            try {
                await axios.post(`${BASE_URL}/forum/posts/${postId}/like`, { like: !isLiked }, { withCredentials: true });
                fetchPosts();
            } catch (error) {
                console.error('Error liking post:', error);
            }
        },
        [fetchPosts]
    );

    const handleBookmark = useCallback(
        async (postId: string, isBookmarked: boolean) => {
            try {
                await axios.post(`${BASE_URL}/forum/posts/${postId}/bookmark`, { bookmark: !isBookmarked }, { withCredentials: true });
                fetchPosts();
            } catch (error) {
                console.error('Error bookmarking post:', error);
            }
        },
        [fetchPosts]
    );

    const handleAddComment = useCallback(
        async (postId: string, content: string, parentId?: string) => {
            try {
                await axios.post(`${BASE_URL}/forum/comments`, { postId, content, parentId }, { withCredentials: true });
                fetchPosts();
            } catch (error) {
                console.error('Error adding comment:', error);
                throw error;
            }
        },
        [fetchPosts]
    );

    const handleLikeComment = useCallback(
        async (commentId: string, isLiked: boolean) => {
            try {
                await axios.post(`${BASE_URL}/forum/comments/${commentId}/like`, { like: !isLiked }, { withCredentials: true });
                fetchPosts();
            } catch (error) {
                console.error('Error liking comment:', error);
            }
        },
        [fetchPosts]
    );

    const handleView = useCallback(
        async (postId: string) => {
            try {
                await axios.put(`${BASE_URL}/forum/posts/${postId}/view`, {}, { withCredentials: true });
                fetchPosts();
            } catch (error) {
                console.error('Error incrementing views:', error);
            }
        },
        [fetchPosts]
    );

    const toggleComments = useCallback(
        (postId: string) => {
            setExpandedComments(prev => {
                const newSet = new Set(prev);
                if (newSet.has(postId)) {
                    newSet.delete(postId);
                } else {
                    newSet.add(postId);
                    handleView(postId);
                }
                return newSet;
            });
        },
        [handleView]
    );

    const lastPostRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoading || !hasMore) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    setPage(prev => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    const formatTimestamp = (timestamp: Date | string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
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

    return (
        <div className="min-h-screen w-full flex justify-between p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="flex-1 max-w-4xl mx-auto p-6">
                {!isModalOpen && (
                    <>
                        {/* Header */}
                        <div className="relative mb-16">
                            <div className="h-48 bg-gradient-to-b from-purple-900 to-transparent rounded-t-2xl"></div>
                            <div className="absolute bottom-0 left-6 transform translate-y-1/2">
                                <div className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center border-4 border-black">
                                    <User className="w-16 h-16 text-gray-300" />
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-6 mb-4">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full text-sm font-medium transition-colors"
                                >
                                    Create Post
                                </button>
                            </div>
                        </div>
                        <div className="px-6 pb-6">
                            <h1 className="text-2xl font-bold">Sumit Singh Bisht</h1>
                            <p className="text-gray-400">Community Member</p>
                        </div>

                        {/* Search and Filter */}
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search posts, users, tags..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular' | 'trending')}
                                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="newest">Newest</option>
                                <option value="popular">Most Liked</option>
                                <option value="trending">Most Viewed</option>
                            </select>
                        </div>

                        {/* Posts */}
                        <div className="space-y-6">
                            {isLoading && posts.length === 0 && <div className="text-center py-12">Loading...</div>}
                            {!isLoading && posts.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-400 text-lg">No posts found</p>
                                    <p className="text-gray-500">Try adjusting your search or create a new post!</p>
                                </div>
                            ) : (
                                posts.map((post, index) => (
                                    <div
                                        key={post.id}
                                        ref={index === posts.length - 1 ? lastPostRef : null}
                                        className={`${post.color} rounded-3xl p-6 shadow-lg border-1 border-gray-700`}
                                    >
                                        {/* Post Header */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                                                    <User className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-white">{post.author}</h3>
                                                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                                                        <span>{post.email}</span>
                                                        <span>•</span>
                                                        <span>{formatTimestamp(post.timestamp)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="flex items-center space-x-1 text-gray-300">
                                                    <Eye className="w-4 h-4" />
                                                    <span className="text-sm">{post.views}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleBookmark(post.id, post.isBookmarked)}
                                                    className="p-1 hover:bg-white/10 rounded transition-colors"
                                                >
                                                    <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-yellow-500 text-yellow-500' : 'text-white'}`} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Post Title */}
                                        {post.title && (
                                            <h2 className="text-xl font-bold text-white mb-3">{post.title}</h2>
                                        )}

                                        {/* Post Content */}
                                        <p className="text-white mb-4 leading-relaxed">{post.content}</p>

                                        {/* Tags */}
                                        {post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                                                    >
                            #{tag}
                          </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Post Actions */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-6">
                                                <button
                                                    onClick={() => handleLike(post.id, post.isLiked)}
                                                    className="flex items-center space-x-2 hover:bg-white/10 px-3 py-1 rounded-lg transition-colors"
                                                >
                                                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                                                    <span className="text-sm">{post.likes}</span>
                                                </button>
                                                <button
                                                    onClick={() => toggleComments(post.id)}
                                                    className="flex items-center space-x-2 hover:bg-white/10 px-3 py-1 rounded-lg transition-colors"
                                                >
                                                    <MessageCircle className="w-5 h-5 text-white" />
                                                    <span className="text-sm">{post.comments.length}</span>
                                                </button>
                                                <button className="flex items-center space-x-2 hover:bg-white/10 px-3 py-1 rounded-lg transition-colors">
                                                    <Share2 className="w-5 h-5 text-white" />
                                                    <span className="text-sm">Share</span>
                                                </button>
                                            </div>
                                            <button className="flex items-center space-x-2 hover:bg-white/10 px-3 py-1 rounded-lg transition-colors">
                                                <Flag className="w-5 h-5 text-white" />
                                                <span className="text-sm">Report</span>
                                            </button>
                                        </div>

                                        {/* Comments Section */}
                                        {expandedComments.has(post.id) && (
                                            <CommentSection
                                                comments={post.comments}
                                                onAddComment={(content, parentId) => handleAddComment(post.id, content, parentId)}
                                                onLikeComment={(commentId, isLiked) => handleLikeComment(commentId, isLiked)}
                                            />
                                        )}
                                    </div>
                                ))
                            )}
                            {isLoading && posts.length > 0 && <div className="text-center py-4">Loading more...</div>}
                        </div>
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

            {/* Right Sidebar */}
            <div className="w-100 min-h-screen sticky top-0">
                {/* Community Stats */}
                <div className="bg-gray-800 p-6 space-y-6 m-6 rounded-3xl">
                    <div className="flex items-center space-x-2 mb-3">
                        <Users className="w-5 h-5 text-purple-400" />
                        <span className="text-white font-medium">Community Stats</span>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Total Members</span>
                            <span className="text-white">{stats.totalMembers}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Online Now</span>
                            <span className="text-green-400">{stats.onlineNow}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Total Posts</span>
                            <span className="text-white">{stats.totalPosts}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Posts Today</span>
                            <span className="text-white">{stats.postsToday}</span>
                        </div>
                    </div>
                </div>

                {/* Active Members */}
                <div className="bg-gray-900 p-6 space-y-6 m-6 rounded-3xl">
                    <h2 className="text-lg font-semibold mb-4 text-white">Active Members</h2>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        {communityMembers.map((member) => (
                            <div key={member.id} className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                                        <span className="text-lg">{member.avatar}</span>
                                    </div>
                                    {member.isOnline && (
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-white text-sm font-medium">{member.name}</p>
                                    <p className="text-gray-400 text-xs">{member.role}</p>
                                </div>
                                {getRoleIcon(member.role)}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Therapist */}
                <div className="bg-gray-900 p-6 space-y-6 m-6 rounded-3xl">
                    <h2 className="text-lg font-semibold mb-4 text-white">Therapist</h2>
                    {communityMembers.filter(m => m.role.toLowerCase() === 'therapist').slice(0, 1).map((member) => (
                        <div key={member.id} className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-lg">👩‍⚕️</span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                            </div>
                            <div className="flex-1">
                                <p className="text-white text-sm font-medium">{member.name}</p>
                                <p className="text-gray-400 text-xs">Licensed Therapist</p>
                            </div>
                            <User className="w-4 h-4 text-green-400" />
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-900 p-6 space-y-6 m-6 rounded-3xl">
                    <h2 className="text-lg font-semibold mb-4 text-white">Recent Activity</h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-gray-300">New member joined</span>
                            <span className="text-gray-500">2m ago</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-gray-300">Post liked by Dr. Sarah</span>
                            <span className="text-gray-500">5m ago</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span className="text-gray-300">New comment added</span>
                            <span className="text-gray-500">8m ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RedditClone;