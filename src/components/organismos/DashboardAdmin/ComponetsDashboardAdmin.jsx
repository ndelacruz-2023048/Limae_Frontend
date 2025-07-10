import React from 'react'

export const ComponetsDashboardAdmin = () => {
    return (
        <div className="bg-[#f3f3ff] min-h-screen p-6 space-y-6 text-gray-800">
        {/* Header */}
        <div className="flex justify-between items-center">
            <div>
            <h1 className="text-3xl font-semibold">My Classes</h1>
            <p className="text-sm text-gray-500">28 April 2025</p>
            </div>
            <div className="flex items-center space-x-4">
            <button className="bg-yellow-400 text-white px-4 py-2 rounded-full font-medium shadow">
                Upgrade Now
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                {/* Avatar */}
            </div>
            </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
            {/* Class Detail + Welcome */}
            <div className="bg-white rounded-2xl p-6 shadow flex justify-between items-center">
                <div>
                <h2 className="text-xl font-bold mb-2">English for beginners</h2>
                <p className="text-sm text-gray-500">24/30 Lessons</p>
                <div className="flex mt-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-300 border-2 border-white -ml-0"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-white -ml-2"></div>
                    <div className="w-8 h-8 rounded-full bg-pink-400 border-2 border-white -ml-2"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold border-2 border-white -ml-2">
                    +7
                    </div>
                </div>
                </div>
                <div className="text-center">
                <h1 className="text-2xl font-extrabold leading-tight">
                    Welcome to <br />
                    Miss Isabelle's <br />
                    classroom Hub
                </h1>
                <div className="mt-2 bg-yellow-300 inline-block px-3 py-1 text-xs rounded-full font-medium">
                    Grade 6 - Section B
                </div>
                </div>
            </div>

            {/* Continue Classes & Task Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow">
                <h3 className="font-semibold mb-3">Continue Classes</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex justify-between">
                    <span>Introduction to Spanish</span>
                    <span className="text-green-500">Completed</span>
                    </li>
                    <li className="flex justify-between">
                    <span>English for beginners</span>
                    <span className="text-yellow-500">Due in 3 days</span>
                    </li>
                    <li className="flex justify-between">
                    <span>Introduction to Spanish</span>
                    <span className="text-yellow-500">Due in 4 days</span>
                    </li>
                </ul>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow">
                <h3 className="font-semibold mb-3">Task Progress</h3>
                <div className="flex items-center justify-center h-32">
                    {/* Circular progress bar (placeholder) */}
                    <div className="w-24 h-24 rounded-full border-8 border-gray-200 border-t-yellow-400 animate-spin-slow relative">
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">
                        80%
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
            {/* Students Summary */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="font-semibold mb-4">Students Summary</h3>
                <div className="flex items-center justify-center mb-4">
                {/* Placeholder Circle */}
                <div className="w-24 h-24 rounded-full border-8 border-dashed border-yellow-400 flex items-center justify-center font-bold text-xl">
                    350
                </div>
                </div>
                <p className="text-center text-sm text-gray-500">Excellent</p>
                <ul className="mt-4 text-sm space-y-1">
                <li><span className="text-yellow-500">●</span> Spanish 40%</li>
                <li><span className="text-blue-400">●</span> France 30%</li>
                <li><span className="text-pink-400">●</span> Singapore 30%</li>
                </ul>
            </div>

            {/* Course Group Preview (solo base) */}
            <div className="bg-white p-4 rounded-2xl shadow">
                <h3 className="font-semibold mb-2">Online Course Group</h3>
                <p className="text-sm text-gray-500">8 Classmates</p>
                <div className="mt-4 text-sm text-gray-700 space-y-1">
                <p>Hello Jenny! Looking forward to talk to you!</p>
                <p className="text-xs text-gray-400">Friday 2:30pm</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
