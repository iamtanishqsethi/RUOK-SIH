import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#EF4444"]

interface ResourceItem {
    type: string
    usage: number
}

export const sampleResourceData: ResourceItem[] = [
    { type: "Videos", usage: 300 },
    { type: "Guides", usage: 180 },
    { type: "Audio", usage: 120 },
    { type: "Self-Tests", usage: 90 },
]

export function ResourceUsage({ data }: { data: ResourceItem[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Resource Usage</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={data} dataKey="usage" nameKey="type" outerRadius={100} label>
                            {data.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}