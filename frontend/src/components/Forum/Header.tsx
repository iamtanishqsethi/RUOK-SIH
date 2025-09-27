import React from 'react';
import { User } from 'lucide-react';

interface HeaderProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setIsModalOpen }) => {
    return (
        <div>
            <div className="bg-gradient-to-b from-neutral-400 rounded-t-2xl w-full min-h-[30vh] sm:min-h-[35vh] md:min-h-[40vh]"></div>
            <div className="flex flex-col sm:flex-row relative -top-16 sm:-top-20 md:-top-24 items-center justify-between mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4 md:px-0">
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gray-600 rounded-full flex items-center justify-center shadow-md">
                        <User className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 text-gray-300" />
                    </div>
                    <div>
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Sumit Singh Bisht</h1>
                        <p className="text-gray-400 text-sm sm:text-base">Community Member</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium transition-colors duration-200 mt-2 sm:mt-0"
                >
                    Create Post
                </button>
            </div>
        </div>
    );
};

export default Header;