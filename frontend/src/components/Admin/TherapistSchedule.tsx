import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { FiPhone } from "react-icons/fi"

export default function TherapistSchedule() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    const sessions = Array(8).fill({
        name: "Mareej Bhatinda",
        email: "mamareejhub@gmail.com",
        time: "10:00am - 11:00am",
        mode: "Call",
        crisis: false,
    })

    sessions[1].crisis = true
    sessions[3].crisis = true

    return (
        <div className="min-h-screen w-full overflow-y-auto bg-black text-white p-3 sm:p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
                <h1 className="text-2xl sm:text-3xl font-serif">Therapist Schedule</h1>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-fuchsia-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1 sm:flex-none">
                        <h2 className="font-semibold text-base sm:text-lg truncate">Dr. Manindar Bhatinda</h2>
                        <p className="text-xs sm:text-sm text-gray-400 truncate">maindoctorhub@gmail.com</p>
                    </div>
                </div>
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                {/* Calendar and Crisis Alerts - Stack vertically on mobile, side by side on tablet+ */}
                <div className="xl:col-span-1 space-y-4 sm:space-y-6">
                    {/* Calendar */}
                    <Card className="bg-neutral-900 border-2 border-neutral-800">
                        <CardContent className="">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md text-white w-full"
                            />
                        </CardContent>
                    </Card>

                    {/* Crisis Alerts */}
                    <Card className="bg-gradient-to-t from-pink-900 border-2 border-neutral-800">
                        <CardContent className="p-3 sm:p-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-green-400 text-xs sm:text-sm">-3%<br />Then last week</p>
                                <div className="flex flex-col items-center">
                                    <svg width="24" height="24" className="sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none">
                                        <path d="M16 23.0834C16.4014 23.0834 16.7379 22.9476 17.0094 22.6761C17.2809 22.4045 17.4167 22.0681 17.4167 21.6667C17.4167 21.2653 17.2809 20.9289 17.0094 20.6573C16.7379 20.3858 16.4014 20.25 16 20.25C15.5986 20.25 15.2622 20.3858 14.9907 20.6573C14.7191 20.9289 14.5834 21.2653 14.5834 21.6667C14.5834 22.0681 14.7191 22.4045 14.9907 22.6761C15.2622 22.9476 15.5986 23.0834 16 23.0834ZM14.5834 17.4167H17.4167V8.9167H14.5834V17.4167ZM16 32.0084L11.2542 27.3334H4.6667V20.7459L-0.00830078 16L4.6667 11.2542V4.6667H11.2542L16 -0.00830078L20.7459 4.6667H27.3334V11.2542L32.0084 16L27.3334 20.7459V27.3334H20.7459L16 32.0084Z" fill="#DB2777"/>
                                    </svg>
                                    <span className="text-xs sm:text-sm font-medium text-pink-600 text-center">Crisis Alerts</span>
                                </div>
                            </div>
                            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600">3</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Sessions Table */}
                <div className="xl:col-span-2">
                    <div className="rounded-lg sm:rounded-2xl bg-gradient-to-l from-neutral-800 border-2 border-neutral-800 p-3 sm:p-4">
                        {/* Table Header - Hidden on very small screens */}
                        <div className="hidden md:grid grid-cols-3 text-left text-gray-300 font-semibold border-b border-neutral-800 pb-2 mb-2">
                            <span>Name</span>
                            <span>Time</span>
                            <span>Mode Of Session</span>
                        </div>

                        {/* Sessions List */}
                        <div className="space-y-2 sm:space-y-0">
                            {sessions.map((s, i) => (
                                <div
                                    key={i}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 py-3 sm:py-4 border-b border-gray-800 last:border-none hover:bg-neutral-800/50 rounded-md px-2 sm:px-3"
                                >
                                    {/* Name and Avatar */}
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-fuchsia-600" />
                                            {s.crisis && (
                                                <div className="absolute -top-1 -right-1">
                                                    <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 32 32" fill="none">
                                                        <path d="M16 23.0834C16.4014 23.0834 16.7379 22.9476 17.0094 22.6761C17.2809 22.4045 17.4167 22.0681 17.4167 21.6667C17.4167 21.2653 17.2809 20.9289 17.0094 20.6573C16.7379 20.3858 16.4014 20.25 16 20.25C15.5986 20.25 15.2622 20.3858 14.9907 20.6573C14.7191 20.9289 14.5834 21.2653 14.5834 21.6667C14.5834 22.0681 14.7191 22.4045 14.9907 22.6761C15.2622 22.9476 15.5986 23.0834 16 23.0834ZM14.5834 17.4167H17.4167V8.9167H14.5834V17.4167ZM16 32.0084L11.2542 27.3334H4.6667V20.7459L-0.00830078 16L4.6667 11.2542V4.6667H11.2542L16 -0.00830078L20.7459 4.6667H27.3334V11.2542L32.0084 16L27.3334 20.7459V27.3334H20.7459L16 32.0084Z" fill="#DB2777"/>
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-sm sm:text-base truncate">{s.name}</p>
                                            <p className="text-xs text-gray-400 truncate">{s.email}</p>
                                        </div>
                                    </div>

                                    {/* Time - Show label on mobile */}
                                    <div className="flex items-center md:block">
                                        <span className="md:hidden text-gray-400 text-sm mr-2 min-w-0 flex-shrink-0">Time:</span>
                                        <p className="text-sm sm:text-base">{s.time}</p>
                                    </div>

                                    {/* Mode - Show label on mobile */}
                                    <div className="flex items-center gap-2">
                                        <span className="md:hidden text-gray-400 text-sm min-w-0 flex-shrink-0">Mode:</span>
                                        <div className="flex items-center gap-2">
                                            <FiPhone className="w-4 h-4 flex-shrink-0" />
                                            <span className="text-sm sm:text-base">{s.mode}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}