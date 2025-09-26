import { useEffect, useState } from "react"

// Ticker number animation
const TickerNumber = ({ value }: { value: number }) => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        let start = 0
        const end = value
        if (start === end) return
        let totalMilSecDur = 1500
        let incrementTime = (totalMilSecDur / end) * 2
        let timer = setInterval(() => {
            start += 1
            setCount(start)
            if (start === end) clearInterval(timer)
        }, incrementTime)
    }, [value])

    return <span>{count}</span>
}

export default function CrisisManagement() {
    return (
        <div className="min-h-screen w-full overflow-y-auto bg-black text-white p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl font-semibold">Crisis Management</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Crisis Alerts Summary and Details */}
                <div className="lg:col-span-1 space-y-4 sm:space-y-6">
                    {/* Crisis Alerts Summary */}
                    <div className="bg-gradient-to-t from-[#7E0038] border-2 border-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                        <div className="flex justify-between items-start sm:items-center mb-3 sm:mb-4">
                            <span className="text-green-400 text-sm sm:text-xl leading-tight">-3%<br/>Then last week</span>
                            <div className="flex flex-col items-center justify-end">
                                <svg width="28" height="28" className="sm:w-9 sm:h-9" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 27.3332C19.4722 27.3332 19.868 27.1735 20.1875 26.854C20.5069 26.5346 20.6666 26.1387 20.6666 25.6665C20.6666 25.1943 20.5069 24.7985 20.1875 24.479C19.868 24.1596 19.4722 23.9998 19 23.9998C18.5277 23.9998 18.1319 24.1596 17.8125 24.479C17.493 24.7985 17.3333 25.1943 17.3333 25.6665C17.3333 26.1387 17.493 26.5346 17.8125 26.854C18.1319 27.1735 18.5277 27.3332 19 27.3332ZM17.3333 20.6665H20.6666V10.6665H17.3333V20.6665ZM19 37.8332L13.4166 32.3332H5.66663V24.5832L0.166626 18.9998L5.66663 13.4165V5.6665H13.4166L19 0.166504L24.5833 5.6665H32.3333V13.4165L37.8333 18.9998L32.3333 24.5832V32.3332H24.5833L19 37.8332ZM19 33.1665L23.1666 28.9998H29V23.1665L33.1666 18.9998L29 14.8332V8.99984H23.1666L19 4.83317L14.8333 8.99984H8.99996V14.8332L4.83329 18.9998L8.99996 23.1665V28.9998H14.8333L19 33.1665Z" fill="#FF0072"/>
                                </svg>
                                <span className="text-base sm:text-xl text-pink-600 text-center mt-1">Crisis Alerts</span>
                            </div>
                        </div>
                        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-pink-600">
                            <TickerNumber value={18} />
                        </div>
                    </div>

                    {/* Crisis Details */}
                    <div className="bg-gradient-to-l from-neutral-800 border-2 border-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg space-y-3 sm:space-y-4">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                            <div className="relative flex-shrink-0">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-purple-500"></div>
                                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2">
                                    <svg width="24" height="24" className="sm:w-8 sm:h-8" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.5 32.2914C23.0549 32.2914 23.52 32.1038 23.8953 31.7284C24.2707 31.3531 24.4584 30.888 24.4584 30.3331C24.4584 29.7782 24.2707 29.3131 23.8953 28.9378C23.52 28.5624 23.0549 28.3748 22.5 28.3748C21.9452 28.3748 21.4801 28.5624 21.1047 28.9378C20.7294 29.3131 20.5417 29.7782 20.5417 30.3331C20.5417 30.888 20.7294 31.3531 21.1047 31.7284C21.4801 32.1038 21.9452 32.2914 22.5 32.2914ZM20.5417 24.4581H24.4584V12.7081H20.5417V24.4581ZM22.5 44.6289L15.9396 38.1664H6.83335V29.0602L0.37085 22.4998L6.83335 15.9394V6.83311H15.9396L22.5 0.370605L29.0604 6.83311H38.1667V15.9394L44.6292 22.4998L38.1667 29.0602V38.1664H29.0604L22.5 44.6289Z" fill="#FF0072"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="text-base sm:text-lg font-medium truncate">Mareej Bhatinda</h3>
                                <span className="text-xs sm:text-sm text-gray-400 truncate block">maindactorhub@gmail.com</span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-300">Maharaja Agrasen Inst.</p>

                        <div className="text-xs sm:text-sm space-y-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                                <div>
                                    <p className="text-gray-400">Crisis Alert On:</p>
                                    <p className="text-white">15.08.2025 - 09:25 PM</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Risk Score:</p>
                                    <p className="text-red-400 font-medium">62%</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                                <div>
                                    <p className="text-gray-400">Reason:</p>
                                    <p className="text-white">-</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Last Active:</p>
                                    <p className="text-white">-</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-gray-400">Assigned To:</p>
                                <p className="text-purple-400 font-medium">Dr. Manindar Bhatinda</p>
                                <p className="text-xs text-gray-400 truncate">mandadoctorhub@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Crisis Table */}
                <div className="lg:col-span-2 bg-gradient-to-l from-neutral-800 border-2 border-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
                    {/* Table Header - Hidden on mobile */}
                    <div className="hidden md:grid grid-cols-3 text-sm font-semibold border-b border-gray-700 pb-2 mb-4">
                        <div>Name</div>
                        <div>Community</div>
                        <div>Therapist</div>
                    </div>

                    {/* Mobile/Tablet Header */}
                    <h2 className="md:hidden text-lg font-medium mb-4">Crisis Cases</h2>

                    <div>
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 rounded-lg p-1 sm:p-3 hover:bg-neutral-800/50 hover:cursor-pointer border border-transparent hover:border-gray-700 transition-all">

                                {/* Name Section */}
                                <div className="flex items-center space-x-3 min-w-0">
                                    <div className="md:hidden text-gray-400 text-sm font-medium min-w-0 w-16 flex-shrink-0">Patient:</div>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-500 flex-shrink-0"></div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium text-sm sm:text-base truncate">Mareej Bhatinda</p>
                                        <p className="text-xs text-gray-400 truncate">maimareejhub@gmail.com</p>
                                    </div>
                                </div>

                                {/* Community Section */}
                                <div className="flex items-center md:block min-w-0">
                                    <div className="md:hidden text-gray-400 text-sm font-medium min-w-0 w-20 flex-shrink-0">Community:</div>
                                    <p className="text-sm sm:text-base text-gray-300 truncate">Maharaja Agrasen Inst.</p>
                                </div>

                                {/* Therapist Section */}
                                <div className="flex items-center space-x-3 min-w-0">
                                    <div className="md:hidden text-gray-400 text-sm font-medium min-w-0 w-16 flex-shrink-0">Therapist:</div>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-500 flex-shrink-0"></div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium text-sm sm:text-base truncate">Dr. Manindar Bhatinda</p>
                                        <p className="text-xs text-gray-400 truncate">mandadoctorhub@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}