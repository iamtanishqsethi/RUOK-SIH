import React from 'react';
import type {JSX} from 'react';
import { CommentSection } from './CommentSection';
import {Bookmark, Eye, Flag, Heart, MessageCircle, Share2, User} from "lucide-react";

import type {Post} from './types';

interface PostListProps {
    posts: Post[];
    handleLike: (postId: string) => void;
    handleBookmark: (postId: string) => void;
    toggleComments: (postId: string) => void;
    expandedComments: Set<string>;
    handleAddComment: (postId: string, content: string, parentId?: string) => void;
    handleLikeComment: (postId: string, commentId: string) => void;
    formatTimestamp: (timestamp: Date) => string;
    getRoleIcon: (role: string) => JSX.Element;
}

const PostList: React.FC<PostListProps> = ({
                                               posts,
                                               handleLike,
                                               handleBookmark,
                                               toggleComments,
                                               expandedComments,
                                               handleAddComment,
                                               handleLikeComment,
                                               formatTimestamp,
                                           }) => {
    return (
        <div className="space-y-4 sm:space-y-6">
            {posts.length === 0 ? (
                <div className="text-center py-6 sm:py-12 bg-gray-800 rounded-xl shadow-md">
                    <p className="text-gray-400 text-base sm:text-lg">No posts found</p>
                    <p className="text-gray-500 text-sm sm:text-base">Try adjusting your search or create a new post!</p>
                </div>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className={`${post.color} rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 shadow-lg border border-gray-700 hover:shadow-xl transition-shadow duration-300`}>
                        {/* Post Header */}
                        <div className="flex items-center justify-between mb-2 sm:mb-4">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-sm">
                                    <User className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-sm sm:text-base md:text-lg">{post.author}</h3>
                                    <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm md:text-base text-gray-300">
                                        <span>{post.email}</span>
                                        <span>•</span>
                                        <span>{formatTimestamp(post.timestamp)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1 sm:space-x-2">
                                <div className="flex items-center space-x-1 text-gray-300">
                                    <Eye className="w-3 sm:w-4 h-3 sm:h-4" />
                                    <span className="text-xs sm:text-sm md:text-base">{post.views}</span>
                                </div>
                                <button
                                    onClick={() => handleBookmark(post.id)}
                                    className="p-1 hover:bg-white/10 rounded transition-colors duration-200"
                                >
                                    <Bookmark className={`w-4 sm:w-5 h-4 sm:h-5 ${post.isBookmarked ? 'fill-yellow-500 text-yellow-500' : 'text-white'}`} />
                                </button>
                            </div>
                        </div>

                        {/* Post Title */}
                        {post.title && (
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">{post.title}</h2>
                        )}

                        {/* Post Content */}
                        <p className="text-white text-sm sm:text-base md:text-lg mb-2 sm:mb-4 leading-relaxed">{post.content}</p>

                        {/* Tags */}
                        {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-4">
                                {post.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-1 sm:px-2 py-0.5 sm:py-1 bg-white/10 rounded-full text-xs sm:text-sm text-gray-300 hover:bg-white/20 transition-colors duration-200"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Post Actions */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 sm:space-x-6">
                                <button
                                    onClick={() => handleLike(post.id)}
                                    className="flex items-center space-x-1 sm:space-x-2 hover:bg-white/10 px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg transition-colors duration-200"
                                >
                                    <Heart className={`w-4 sm:w-5 h-4 sm:h-5 ${post.isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                                    <span className="text-xs sm:text-sm md:text-base">{post.likes}</span>
                                </button>
                                <button
                                    onClick={() => toggleComments(post.id)}
                                    className="flex items-center space-x-1 sm:space-x-2 hover:bg-white/10 px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg transition-colors duration-200"
                                >
                                    <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                                    <span className="text-xs sm:text-sm md:text-base">{post.comments.length}</span>
                                </button>
                                <button className="flex items-center space-x-1 sm:space-x-2 hover:bg-white/10 px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg transition-colors duration-200">
                                    <Share2 className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                                    <span className="text-xs sm:text-sm md:text-base">Share</span>
                                </button>
                            </div>
                            <button className="flex items-center space-x-1 sm:space-x-2 hover:bg-white/10 px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg transition-colors duration-200">
                                <Flag className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                                <span className="text-xs sm:text-sm md:text-base">Report</span>
                            </button>
                        </div>

                        {/* Comments Section */}
                        {expandedComments.has(post.id) && (
                            <CommentSection
                                comments={post.comments}
                                onAddComment={(content, parentId) => handleAddComment(post.id, content, parentId)}
                                onLikeComment={(commentId) => handleLikeComment(post.id, commentId)}
                            />
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default PostList;