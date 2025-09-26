import React, { useState } from 'react';
import { User, Heart, MoreHorizontal, Reply, Send } from 'lucide-react';
import { toast } from 'sonner';

interface Comment {
    id: string;
    author: string;
    email: string;
    content: string;
    timestamp: Date;
    likes: number;
    isLiked: boolean;
    replies: Comment[];
}

const CommentSection: React.FC<{
    comments: Comment[];
    onAddComment: (content: string, parentId?: string) => void;
    onLikeComment: (commentId: string, isLiked: boolean) => void;
}> = ({ comments, onAddComment, onLikeComment }) => {
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitComment = async () => {
        if (newComment.trim() && !isSubmitting) {
            setIsSubmitting(true);
            try {
                await onAddComment(newComment);
                setNewComment('');
            } catch (error: any) {
                toast.warning(error.response?.data?.message || 'Failed to add comment');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleSubmitReply = async (parentId: string) => {
        if (replyContent.trim() && !isSubmitting) {
            setIsSubmitting(true);
            try {
                await onAddComment(replyContent, parentId);
                setReplyContent('');
                setReplyingTo(null);
            } catch (error: any) {
                toast.warning(error.response?.data?.message || 'Failed to add reply');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const formatTimestamp = (timestamp: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - timestamp.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    };

    return (
        <div className="mt-6 space-y-4">
            <div className="flex space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 flex space-x-2">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                    />
                    <button
                        onClick={handleSubmitComment}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
                        disabled={!newComment.trim() || isSubmitting}
                    >
                        <Send className="w-4 h-4 text-white" />
                    </button>
                </div>
            </div>

            {comments.map((comment) => (
                <div key={comment.id} className="space-y-3">
                    <div className="flex space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="bg-gray-800 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <span className="text-white text-sm font-medium">{comment.author}</span>
                                        <span className="text-gray-400 text-xs ml-2">{formatTimestamp(comment.timestamp)}</span>
                                    </div>
                                    <button className="text-gray-400 hover:text-white">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-gray-300 text-sm">{comment.content}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                    <button
                                        onClick={() => onLikeComment(comment.id, comment.isLiked)}
                                        className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors"
                                    >
                                        <Heart className={`w-4 h-4 ${comment.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                                        <span className="text-xs">{comment.likes}</span>
                                    </button>
                                    <button
                                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                        className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors"
                                    >
                                        <Reply className="w-4 h-4" />
                                        <span className="text-xs">Reply</span>
                                    </button>
                                </div>
                            </div>

                            {replyingTo === comment.id && (
                                <div className="flex space-x-2 mt-2 ml-4">
                                    <input
                                        type="text"
                                        placeholder="Write a reply..."
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                                        onKeyPress={(e) => e.key === 'Enter' && handleSubmitReply(comment.id)}
                                    />
                                    <button
                                        onClick={() => handleSubmitReply(comment.id)}
                                        className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg transition-colors"
                                        disabled={!replyContent.trim() || isSubmitting}
                                    >
                                        <Send className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            )}

                            {comment.replies && comment.replies.length > 0 && (
                                <div className="ml-6 mt-3 space-y-2">
                                    {comment.replies.map((reply) => (
                                        <div key={reply.id} className="flex space-x-2">
                                            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                                                <User className="w-3 h-3 text-white" />
                                            </div>
                                            <div className="flex-1 bg-gray-800 rounded-lg p-2">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="text-white text-xs font-medium">{reply.author}</span>
                                                    <span className="text-gray-400 text-xs">{formatTimestamp(reply.timestamp)}</span>
                                                </div>
                                                <p className="text-gray-300 text-xs">{reply.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default CommentSection;