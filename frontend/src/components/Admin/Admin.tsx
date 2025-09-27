import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TrendingUp, TrendingDown, UserCheck, AlertTriangle, Calendar } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {

    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../../components/ui/chart.tsx"
import type {ChartConfig} from "@/components/ui/chart.tsx"

// Chart data configurations
const totalUsersData = [
    { month: "Jan", users: 80 },
    { month: "Feb", users: 95 },
    { month: "Mar", users: 30 },
    { month: "Apr", users: 105 },
    { month: "May", users: 65 },
    { month: "Jun", users: 125 },
]

const activeUsersData = [
    { month: "Jan", active: 45 },
    { month: "Feb", active: 55 },
    { month: "Mar", active: 78 },
    { month: "Apr", active: 45 },
    { month: "May", active: 135 },
    { month: "Jun", active: 95 },
]

const crisisAlertsData = [
    { month: "Jan", alerts: 68 },
    { month: "Feb", alerts: 62 },
    { month: "Mar", alerts: 78 },
    { month: "Apr", alerts: 30 },
    { month: "May", alerts: 47 },
    { month: "Jun", alerts: 25 },
]

const therapySessionsData = [
    { month: "Jan", sessions: 25 },
    { month: "Feb", sessions: 48 },
    { month: "Mar", sessions: 32 },
    { month: "Apr", sessions: 47 },
    { month: "May", sessions: 20 },
    { month: "Jun", sessions: 89 },
]

const chartConfigs = {
    users: {
        users: {
            label: "Total Users",
            color: "hsl(217, 91%, 60%)",
        },
    },
    active: {
        active: {
            label: "Active Users",
            color: "hsl(142, 76%, 36%)",
        },
    },
    alerts: {
        alerts: {
            label: "Crisis Alerts",
            color: "hsl(346, 87%, 43%)",
        },
    },
    sessions: {
        sessions: {
            label: "Therapy Sessions",
            color: "hsl(45, 93%, 47%)",
        },
    },
} satisfies Record<string, ChartConfig>

// Synchronized ticker component
const SyncedTickerNumber = ({
                                targetValue,
                                data,
                                dataKey,
                                isActive
                            }: {
    targetValue: number
    data: any[]
    dataKey: string
    isActive: boolean
}) => {
    const [count, setCount] = useState(0)


    useEffect(() => {
        if (!isActive) return

        let index = 0
        const totalDuration = 3000 // 3 seconds total animation
        const stepDuration = totalDuration / data.length

        const timer = setInterval(() => {
            if (index < data.length) {
                setCount(data[index][dataKey])

                index++
            } else {
                clearInterval(timer)
            }
        }, stepDuration)

        return () => clearInterval(timer)
    }, [targetValue, data, dataKey, isActive])

    return <span>{count}</span>
}

// Chart component for each stat card
const StatChart = ({
                       data,
                       dataKey,
                       config,
                       color,
                       currentIndex
                   }: {
    data: any[]
    dataKey: string
    config: ChartConfig
    color: string
    currentIndex: number
}) => {
    // Show data progressively based on currentIndex
    const visibleData = data.slice(0, currentIndex + 1)

    return (
        <div className="h-16 sm:h-20 md:h-24">
            <ChartContainer config={config} className="h-full w-full">
                <AreaChart
                    data={visibleData}
                    margin={{ left: 0, right: 0, top: 5, bottom: 5 }}
                >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                        dataKey="month"
                        hide
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Area
                        dataKey={dataKey}
                        type="monotone"
                        fill={color}
                        fillOpacity={0.3}
                        stroke={color}
                        strokeWidth={2}
                    />
                </AreaChart>
            </ChartContainer>
        </div>
    )
}

export default function AdminDashboard() {
    const navigate = useNavigate()
    const [animationStarted, setAnimationStarted] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationStarted(true)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    // Sync the chart animation index
    useEffect(() => {
        if (!animationStarted) return

        let index = 0
        const totalDuration = 3000
        const stepDuration = totalDuration / totalUsersData.length

        const timer = setInterval(() => {
            if (index < totalUsersData.length) {
                setCurrentIndex(index)
                index++
            } else {
                clearInterval(timer)
            }
        }, stepDuration)

        return () => clearInterval(timer)
    }, [animationStarted])

    return (
        <div className="min-h-screen w-full overflow-y-auto bg-black text-white p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
            {/* Header */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center md:text-left">
                Admin Dashboard - Name of the Community
            </h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {/* Total Users */}
                <Card className="bg-gradient-to-t from-blue-900/50 to-transparent border-2 border-neutral-800 shadow-lg">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-sm sm:text-3xl text-blue-400">Total Users</CardTitle>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 text-green-400">
                                    <TrendingUp className="w-3 h-3" />
                                    <span className="text-xs">+3%</span>
                                </div>
                                <CardDescription className="text-xs text-gray-400">vs last week</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                        <StatChart
                            data={totalUsersData}
                            dataKey="users"
                            config={chartConfigs.users}
                            color="hsl(217, 91%, 60%)"
                            currentIndex={currentIndex}
                        />
                    </CardContent>
                    <CardFooter className="pt-2">
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.75004 25.4997C8.16671 24.4163 9.75004 23.5622 11.5 22.9372C13.25 22.3122 15.0834 21.9997 17 21.9997C18.9167 21.9997 20.75 22.3122 22.5 22.9372C24.25 23.5622 25.8334 24.4163 27.25 25.4997C28.2223 24.3608 28.9792 23.0691 29.5209 21.6247C30.0625 20.1802 30.3334 18.6386 30.3334 16.9997C30.3334 13.3052 29.0348 10.1594 26.4375 7.56217C23.8403 4.96495 20.6945 3.66634 17 3.66634C13.3056 3.66634 10.1598 4.96495 7.56254 7.56217C4.96532 10.1594 3.66671 13.3052 3.66671 16.9997C3.66671 18.6386 3.93754 20.1802 4.47921 21.6247C5.02087 23.0691 5.77782 24.3608 6.75004 25.4997ZM17 18.6663C15.3612 18.6663 13.9792 18.1038 12.8542 16.9788C11.7292 15.8538 11.1667 14.4719 11.1667 12.833C11.1667 11.1941 11.7292 9.81217 12.8542 8.68717C13.9792 7.56217 15.3612 6.99967 17 6.99967C18.6389 6.99967 20.0209 7.56217 21.1459 8.68717C22.2709 9.81217 22.8334 11.1941 22.8334 12.833C22.8334 14.4719 22.2709 15.8538 21.1459 16.9788C20.0209 18.1038 18.6389 18.6663 17 18.6663ZM17 33.6663C14.6945 33.6663 12.5278 33.2288 10.5 32.3538C8.47226 31.4788 6.70837 30.2913 5.20837 28.7913C3.70837 27.2913 2.52087 25.5275 1.64587 23.4997C0.770874 21.4719 0.333374 19.3052 0.333374 16.9997C0.333374 14.6941 0.770874 12.5275 1.64587 10.4997C2.52087 8.4719 3.70837 6.70801 5.20837 5.20801C6.70837 3.70801 8.47226 2.52051 10.5 1.64551C12.5278 0.770508 14.6945 0.333008 17 0.333008C19.3056 0.333008 21.4723 0.770508 23.5 1.64551C25.5278 2.52051 27.2917 3.70801 28.7917 5.20801C30.2917 6.70801 31.4792 8.4719 32.3542 10.4997C33.2292 12.5275 33.6667 14.6941 33.6667 16.9997C33.6667 19.3052 33.2292 21.4719 32.3542 23.4997C31.4792 25.5275 30.2917 27.2913 28.7917 28.7913C27.2917 30.2913 25.5278 31.4788 23.5 32.3538C21.4723 33.2288 19.3056 33.6663 17 33.6663ZM17 30.333C18.4723 30.333 19.8612 30.1177 21.1667 29.6872C22.4723 29.2566 23.6667 28.6386 24.75 27.833C23.6667 27.0275 22.4723 26.4094 21.1667 25.9788C19.8612 25.5483 18.4723 25.333 17 25.333C15.5278 25.333 14.1389 25.5483 12.8334 25.9788C11.5278 26.4094 10.3334 27.0275 9.25004 27.833C10.3334 28.6386 11.5278 29.2566 12.8334 29.6872C14.1389 30.1177 15.5278 30.333 17 30.333ZM17 15.333C17.7223 15.333 18.3195 15.0969 18.7917 14.6247C19.2639 14.1525 19.5 13.5552 19.5 12.833C19.5 12.1108 19.2639 11.5136 18.7917 11.0413C18.3195 10.5691 17.7223 10.333 17 10.333C16.2778 10.333 15.6806 10.5691 15.2084 11.0413C14.7362 11.5136 14.5 12.1108 14.5 12.833C14.5 13.5552 14.7362 14.1525 15.2084 14.6247C15.6806 15.0969 16.2778 15.333 17 15.333Z" fill="#00B2FF"/>
                        </svg>

                        <div className="text-right w-full text-xl sm:text-2xl md:text-3xl font-bold text-blue-400">
                            <SyncedTickerNumber
                                targetValue={235}
                                data={totalUsersData}
                                dataKey="users"
                                isActive={animationStarted}
                            />
                        </div>
                    </CardFooter>
                </Card>

                {/* Active Users */}
                <Card className="bg-gradient-to-t from-green-900/50 to-transparent border-2 border-neutral-800 shadow-lg">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">

                                <CardTitle className="text-sm sm:text-3xl text-green-400">Active Users</CardTitle>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 text-green-400">
                                    <TrendingUp className="w-3 h-3" />
                                    <span className="text-xs">+7%</span>
                                </div>
                                <CardDescription className="text-xs text-gray-400">vs last week</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                        <StatChart
                            data={activeUsersData}
                            dataKey="active"
                            config={chartConfigs.active}
                            color="hsl(142, 76%, 36%)"
                            currentIndex={currentIndex}
                        />
                    </CardContent>
                    <CardFooter className="pt-2">
                        <div className="flex justify-between items-center text-right w-full text-xl sm:text-2xl md:text-3xl font-bold text-green-400">
                            <UserCheck className="w-4 h-4 sm:w-7 sm:h-7 text-green-400" />
                            <SyncedTickerNumber
                                targetValue={195}
                                data={activeUsersData}
                                dataKey="active"
                                isActive={animationStarted}
                            />
                        </div>
                    </CardFooter>
                </Card>

                {/* Crisis Alerts */}
                <Card className="bg-gradient-to-t from-pink-900/50 to-transparent border-2 border-neutral-800 shadow-lg">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-sm sm:text-3xl text-pink-400">Crisis Alerts</CardTitle>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-red-400">
                                        <TrendingDown className="w-3 h-3" />
                                        <span className="text-xs">-5%</span>
                                    </div>
                                    <CardDescription className="text-xs text-gray-400">vs last week</CardDescription>
                                </div>
                                <svg
                                    onClick={() => navigate("/main/crisis")}
                                    className="hover:cursor-pointer w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="20" cy="20" r="19.75" fill="#101012" stroke="#5B5B5B" strokeWidth="0.5" />
                                    <path d="M17.0608 30.0952L27.1042 20.0517L17.0608 10.0083L15.2781 11.791L23.5388 20.0517L15.2781 28.3125L17.0608 30.0952Z" fill="#F5F5F5" />
                                </svg>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                        <StatChart
                            data={crisisAlertsData}
                            dataKey="alerts"
                            config={chartConfigs.alerts}
                            color="hsl(346, 87%, 43%)"
                            currentIndex={currentIndex}
                        />
                    </CardContent>
                    <CardFooter className="pt-2">
                        <div className="flex justify-between items-center text-right w-full text-xl sm:text-2xl md:text-3xl font-bold text-pink-400">
                            <AlertTriangle className="w-4 h-4 sm:w-7 sm:h-7 text-pink-400" />

                            <SyncedTickerNumber
                                targetValue={55}
                                data={crisisAlertsData}
                                dataKey="alerts"
                                isActive={animationStarted}
                            />
                        </div>
                    </CardFooter>
                </Card>

                {/* Weekly Therapy Sessions */}
                <Card className="bg-gradient-to-t from-yellow-900/50 to-transparent border-2 border-neutral-800 shadow-lg">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-sm sm:text-2xl text-yellow-400">Weekly Sessions</CardTitle>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 text-green-400">
                                    <TrendingUp className="w-3 h-3" />
                                    <span className="text-xs">+3%</span>
                                </div>
                                <CardDescription className="text-xs text-gray-400">vs last week</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                        <StatChart
                            data={therapySessionsData}
                            dataKey="sessions"
                            config={chartConfigs.sessions}
                            color="hsl(45, 93%, 47%)"
                            currentIndex={currentIndex}
                        />
                    </CardContent>
                    <CardFooter className="pt-2">
                        <div className="flex justify-between items-center text-right w-full text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">
                            <Calendar className="w-4 h-4 sm:w-7 sm:h-7 text-yellow-400" />

                            <SyncedTickerNumber
                                targetValue={94}
                                data={therapySessionsData}
                                dataKey="sessions"
                                isActive={animationStarted}
                            />
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/* Therapists Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 ">
                {/* Therapists List */}
                <Card className="bg-gradient-to-t from-amber-900/30 to-transparent border-2 border-neutral-800 shadow-lg ">
                    <CardHeader>
                        <CardTitle className="text-base sm:text-2xl">Therapists</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between hover:bg-neutral-800/50 p-2 sm:p-3 rounded-lg transition-colors"
                                >
                                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-500 flex-shrink-0"></div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-sm sm:text-base truncate">Dr. Manindar Bhatinda</p>
                                            <p className="text-xs sm:text-sm text-gray-400 truncate">mandadoctorhub@gmail.com</p>
                                        </div>
                                    </div>
                                    <svg
                                        onClick={() => navigate("/main/therapist-schedule")}
                                        className="hover:cursor-pointer w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 ml-2"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle cx="20" cy="20" r="19.75" fill="#4E2E04" stroke="#5B5B5B" strokeWidth="0.5" />
                                        <path d="M17.0608 30.0952L27.1042 20.0517L17.0608 10.0083L15.2781 11.791L23.5388 20.0517L15.2781 28.3125L17.0608 30.0952Z" fill="#F5F5F5" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Therapist Details */}
                <Card className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-2 border-neutral-800 shadow-lg">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border-4 border-purple-700 rounded-full bg-purple-500 flex-shrink-0"></div>
                            <div className="text-center sm:text-left min-w-0 flex-1">
                                <CardTitle className="text-base sm:text-lg truncate">Dr. Selected Therapist</CardTitle>
                                <CardDescription className="text-xs sm:text-sm text-blue-400 truncate">maindactorhub@gmail.com</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm sm:text-base text-gray-300 mb-4">Maharaja Agrasen Institute</p>
                        <div className="space-y-2 text-xs sm:text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Weekly Sessions:</span>
                                <span className="font-medium">23</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Call Duration:</span>
                                <span className="font-medium">2h 45m</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Session Type:</span>
                                <span className="font-medium text-green-400">Video Call</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}