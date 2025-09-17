import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface ForumData {
    topic: string
    posts: number
}

export const sampleForumData: ForumData[] = [
    { topic: "Stress Management", posts: 120 },
    { topic: "Exam Anxiety", posts: 95 },
    { topic: "Relationships", posts: 70 },
    { topic: "Sleep Issues", posts: 60 },
    { topic: "General Support", posts: 150 },
]

export function ForumAnalytics({ data }: { data: ForumData[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Forum Engagement</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={data}>
                        <XAxis dataKey="topic" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="posts" fill="#6366F1" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
