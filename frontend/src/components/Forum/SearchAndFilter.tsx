import React from 'react';
import { Search } from 'lucide-react';

interface SearchAndFilterProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    sortBy: 'newest' | 'popular' | 'trending';
    setSortBy: (value: 'newest' | 'popular' | 'trending') => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ searchQuery, setSearchQuery, sortBy, setSortBy }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
        <div className="flex-1 relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
        <input
            type="text"
    placeholder="Search posts, users, tags..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-10 pr-4 py-1 sm:py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 text-sm sm:text-base"
        />
        </div>
        <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular' | 'trending')}
    className="w-full sm:w-auto bg-gray-800 border border-gray-700 rounded-lg px-2 sm:px-4 py-1 sm:py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 text-sm sm:text-base"
    >
    <option value="newest">Newest</option>
        <option value="popular">Most Liked</option>
    <option value="trending">Most Viewed</option>
    </select>
    </div>
);
};

export default SearchAndFilter;