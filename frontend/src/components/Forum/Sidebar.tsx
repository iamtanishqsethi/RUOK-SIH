import React from 'react';
import { Users, User } from 'lucide-react';
import type {JSX} from 'react';
import type {Post, CommunityMember} from './types';


interface SidebarProps {
    communityMembers: CommunityMember[];
    posts: Post[];
    getRoleIcon: (role: string) => JSX.Element;
}

const Sidebar: React.FC<SidebarProps> = ({ communityMembers, posts, getRoleIcon }) => {
    return (
        <div className="w-full md:w-80 lg:w-100 md:h-screen overflow-y-auto md:sticky md:top-0 bg-black p-2 sm:p-4">
            {/* Community Stats */}
            <div className="bg-gray-800 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 m-2 sm:m-4 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2 md:mb-3">
                    <Users className="w-4 sm:w-5 h-4 sm:h-5 text-purple-400" />
                    <span className="text-white font-medium text-sm sm:text-base">Community Stats</span>
                </div>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Total Members</span>
                        <span className="text-white">{communityMembers.length + 1000}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Online Now</span>
                        <span className="text-green-400">{communityMembers.filter(m => m.isOnline).length + 87}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Total Posts</span>
                        <span className="text-white">{posts.length}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Posts Today</span>
                        <span className="text-white">{posts.filter(p => p.timestamp.toDateString() === new Date().toDateString()).length}</span>
                    </div>
                </div>
            </div>

            {/* Active Members */}
            <div className="bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 m-2 sm:m-4 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 md:mb-4 text-white">Active Members</h2>
                <div className="space-y-2 sm:space-y-3 max-h-40 sm:max-h-52 md:max-h-64 overflow-y-auto">
                    {communityMembers.map((member) => (
                        <div key={member.id} className="flex items-center space-x-1 sm:space-x-2 hover:bg-gray-800/50 p-1 sm:p-2 rounded-lg transition-colors duration-200">
                            <div className="relative">
                                <div className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-sm">
                                    <span className="text-base sm:text-lg">{member.avatar}</span>
                                </div>
                                {member.isOnline && (
                                    <div className="absolute -bottom-0.5 sm:-bottom-1 -right-0.5 sm:-right-1 w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-white text-xs sm:text-sm font-medium">{member.name}</p>
                                <p className="text-gray-400 text-xs">{member.role}</p>
                            </div>
                            {getRoleIcon(member.role)}
                        </div>
                    ))}
                </div>
            </div>

            {/* Therapist */}
            <div className="bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 m-2 sm:m-4 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 md:mb-4 text-white">Therapist</h2>
                <div className="flex items-center space-x-1 sm:space-x-2 hover:bg-gray-800/50 p-1 sm:p-2 rounded-lg transition-colors duration-200">
                    <div className="relative">
                        <div className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-base sm:text-lg">👩‍⚕️</span>
                        </div>
                        <div className="absolute -bottom-0.5 sm:-bottom-1 -right-0.5 sm:-right-1 w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                    </div>
                    <div className="flex-1">
                        <p className="text-white text-xs sm:text-sm font-medium">Dr Maninder Sharmita</p>
                        <p className="text-gray-400 text-xs">Licensed Therapist</p>
                    </div>
                    <User className="w-3 sm:w-4 h-3 sm:h-4 text-green-400" />
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 m-2 sm:m-4 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 md:mb-4 text-white">Recent Activity</h2>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center space-x-1 sm:space-x-2 hover:bg-gray-800/50 p-1 sm:p-2 rounded-lg transition-colors duration-200">
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">New member joined</span>
                        <span className="text-gray-500">2m ago</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 hover:bg-gray-800/50 p-1 sm:p-2 rounded-lg transition-colors duration-200">
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">Post liked by Dr. Sarah</span>
                        <span className="text-gray-500">5m ago</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 hover:bg-gray-800/50 p-1 sm:p-2 rounded-lg transition-colors duration-200">
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-gray-300">New comment added</span>
                        <span className="text-gray-500">8m ago</span>
                    </div>
                </div>
            </div>

            {/* Student Volunteers */}
            <div className="bg-gray-900 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 m-2 sm:m-4 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 md:mb-4 text-white">Student Volunteers</h2>
                <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-base sm:text-lg">👨‍🎓</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-white text-xs sm:text-sm font-medium">Ravi Sharma</p>
                            <p className="text-gray-400 text-xs">Joined: Jan 2024</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-base sm:text-lg">👩‍🎓</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-white text-xs sm:text-sm font-medium">Priya Patel</p>
                            <p className="text-gray-400 text-xs">Joined: Feb 2024</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-base sm:text-lg">👨‍🎓</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-white text-xs sm:text-sm font-medium">Amit Kumar</p>
                            <p className="text-gray-400 text-xs">Joined: Mar 2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;