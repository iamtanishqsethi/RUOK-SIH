import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

interface CrisisAlert {
    id: string
    severity: "low" | "medium" | "high" | "critical"
    timestamp: string
    aiRecommendation: string
    status: "active" | "escalated" | "resolved"
}

export const sampleCrisisAlerts: CrisisAlert[] = [
    { id: "1", severity: "critical", timestamp: "2025-09-17T10:00Z", aiRecommendation: "Immediate intervention needed", status: "active" },
    { id: "2", severity: "high", timestamp: "2025-09-16T14:30Z", aiRecommendation: "Escalate to counsellor", status: "escalated" },
    { id: "3", severity: "medium", timestamp: "2025-09-15T09:00Z", aiRecommendation: "Schedule follow-up", status: "resolved" },
]

export function CrisisAlerts({ alerts }: { alerts: CrisisAlert[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Active Crisis Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {alerts.map(alert => (
                    <Alert key={alert.id} variant={alert.severity === "critical" ? "destructive" : "default"}>
                        <AlertTitle>{alert.severity.toUpperCase()} - {alert.status}</AlertTitle>
                        <AlertDescription>{alert.aiRecommendation}</AlertDescription>
                    </Alert>
                ))}
            </CardContent>
        </Card>
    )
}
