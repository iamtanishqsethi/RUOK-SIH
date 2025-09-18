import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface EmotionTrend {
    date: string
    positive: number
    negative: number
    neutral: number
}

export const sampleEmotionData: EmotionTrend[] = [
    { date: "Mon", positive: 120, negative: 45, neutral: 80 },
    { date: "Tue", positive: 150, negative: 60, neutral: 90 },
    { date: "Wed", positive: 100, negative: 75, neutral: 70 },
    { date: "Thu", positive: 180, negative: 40, neutral: 95 },
    { date: "Fri", positive: 200, negative: 50, neutral: 85 },
]

export function MentalHealthMetrics({ data }: { data: EmotionTrend[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Emotion Trends</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="positive" stroke="#10B981" />
                        <Line type="monotone" dataKey="negative" stroke="#EF4444" />
                        <Line type="monotone" dataKey="neutral" stroke="#6366F1" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
