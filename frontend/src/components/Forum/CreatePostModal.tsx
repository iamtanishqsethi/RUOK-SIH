import React, { useState } from 'react';
import { ArrowLeft, User, Image, MapPin, Paperclip } from 'lucide-react';
import { toast } from "sonner";

const CreatePostModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onPost: (title: string, content: string, color: string, tags: string[]) => void
}> = ({ isOpen, onClose, onPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedColor, setSelectedColor] = useState('bg-gradient-to-t from-red-900');
    const [tags, setTags] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const colors = [
        { name: 'Red', value: 'bg-gradient-to-t from-red-900', color: 'bg-red-500' },
        { name: 'Blue', value: 'bg-gradient-to-t from-blue-900', color: 'bg-blue-500' },
        { name: 'Yellow', value: 'bg-gradient-to-t from-yellow-900', color: 'bg-yellow-500' },
        { name: 'Green', value: 'bg-gradient-to-t from-green-900', color: 'bg-green-500' }
    ];

    const handlePost = async () => {
        if (title.trim() && content.trim() && !isSubmitting) {
            setIsSubmitting(true);
            try {
                const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
                await onPost(title, content, selectedColor, tagArray);
                setTitle('');
                setContent('');
                setTags('');
                setSelectedColor('bg-gradient-to-t from-red-900');
                onClose();
            } catch (error: any) {
                toast.warning(error.response?.data?.message || 'Failed to create post');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleDiscard = () => {
        setTitle('');
        setContent('');
        setTags('');
        setSelectedColor('bg-gradient-to-t from-red-900');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="flex items-center justify-center p-4">
            <div className={`${selectedColor} rounded-2xl w-full max-w-6xl h-auto max-h-[90vh] flex flex-col overflow-hidden border-2 border-gray-700`}>
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <button
                        onClick={onClose}
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-xl font-semibold text-white">Create Post</h2>
                    <div></div>
                </div>

                <div className="flex-1 flex flex-col p-6 space-y-4 overflow-y-auto">
                    <div className="p-6 border-b border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Sumit Singh Bisht</h3>
                                    <p className="text-sm text-gray-400">sumitsinghbisht2020@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                {colors.map((colorOption, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedColor(colorOption.value)}
                                        className={`w-8 h-8 rounded-full ${colorOption.color} ${
                                            selectedColor === colorOption.value ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''
                                        } transition-all`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        maxLength={200}
                    />

                    <textarea
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-48 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        maxLength={5000}
                    />

                    <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />

                    <div className="flex items-center space-x-4">
                        <button className="flex items-center justify-center w-10 h-10  hover:bg-gray-700 rounded-lg transition-colors">
                            <Image className="w-5 h-5 text-gray-400" />
                        </button>
                        <button className="flex items-center justify-center w-10 h-10  hover:bg-gray-700 rounded-lg transition-colors">
                            <MapPin className="w-5 h-5 text-gray-400" />
                        </button>
                        <button className="flex items-center justify-center w-10 h-10  hover:bg-gray-700 rounded-lg transition-colors">
                            <Paperclip className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    {title && (
                        <div className="text-sm text-gray-400">
                            Character count: {title.length + content.length}/5200
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
                    <button
                        onClick={handleDiscard}
                        className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors"
                        disabled={isSubmitting}
                    >
                        Discard
                    </button>
                    <button
                        onClick={handlePost}
                        className="px-6 py-2 bg-white hover:bg-gray-100 text-black rounded-full transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!title.trim() || !content.trim() || isSubmitting}
                    >
                        {isSubmitting ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CreatePostModal;